const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { URL } = require("url");

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const HOST = "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 8);
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

const rateLimitStore = new Map();
let writeQueue = Promise.resolve();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip) || [];
  const freshHits = bucket.filter((value) => now - value < RATE_LIMIT_WINDOW_MS);
  freshHits.push(now);
  rateLimitStore.set(ip, freshHits);
  return freshHits.length > RATE_LIMIT_MAX_REQUESTS;
}

function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function validateLead(input) {
  const lead = {
    name: sanitizeText(input.name, 120),
    contact: sanitizeText(input.contact, 200),
    message: sanitizeText(input.message, 2000),
    page: sanitizeText(input.page, 120),
    source: sanitizeText(input.source, 500),
    timestamp: new Date().toISOString()
  };

  if (!lead.message || lead.message.length < 5) {
    return { ok: false, errorCode: "validation_message_required" };
  }
  if (!lead.contact || lead.contact.length < 4) {
    return { ok: false, errorCode: "validation_contact_required" };
  }
  if (!/[@+\dA-Za-z]/.test(lead.contact)) {
    return { ok: false, errorCode: "validation_contact_invalid" };
  }
  if (!lead.page) {
    lead.page = "unknown";
  }
  return { ok: true, lead };
}

async function ensureDataFile() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  try {
    await fsp.access(LEADS_FILE, fs.constants.F_OK);
  } catch {
    await fsp.writeFile(LEADS_FILE, "[]", "utf8");
  }
}

async function appendLeadToJsonFile(lead) {
  await ensureDataFile();
  writeQueue = writeQueue.then(async () => {
    const raw = await fsp.readFile(LEADS_FILE, "utf8");
    const current = raw.trim() ? JSON.parse(raw) : [];
    current.push(lead);
    await fsp.writeFile(LEADS_FILE, JSON.stringify(current, null, 2), "utf8");
  });
  return writeQueue;
}

async function forwardLeadToGoogleSheets(lead, ip) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    return;
  }

  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...lead,
      ip
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Sheets webhook failed: ${response.status} ${text}`);
  }
}

function buildTelegramMessage(lead) {
  return [
    "<b>\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430</b>",
    `<b>\u0418\u0434\u0435\u044f:</b> ${escapeTelegram(lead.message)}`,
    `<b>\u0418\u043c\u044f:</b> ${escapeTelegram(lead.name || "\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e")}`,
    `<b>\u041a\u043e\u043d\u0442\u0430\u043a\u0442:</b> ${escapeTelegram(lead.contact)}`,
    `<b>\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430:</b> ${escapeTelegram(lead.source || lead.page || "unknown")}`
  ].join("\n");
}

function escapeTelegram(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendLeadToTelegram(lead, ip) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram is not configured on the server.");
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: buildTelegramMessage(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram request failed: ${response.status} ${text}`);
  }
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

async function handleLeadRequest(req, res) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return json(res, 429, {
      ok: false,
      errorCode: "rate_limited"
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    return json(res, 400, { ok: false, errorCode: "request_failed" });
  }

  if (body && typeof body.website === "string" && body.website.trim()) {
    return json(res, 200, { ok: true, message: "Accepted." });
  }

  const validation = validateLead(body || {});
  if (!validation.ok) {
    return json(res, 400, { ok: false, errorCode: validation.errorCode || "request_failed" });
  }

  try {
    await Promise.all([
      sendLeadToTelegram(validation.lead, ip),
      appendLeadToJsonFile(validation.lead),
      forwardLeadToGoogleSheets(validation.lead, ip)
    ]);
  } catch (error) {
    console.error("Lead delivery error:", error);
    return json(res, 502, {
      ok: false,
      errorCode: "delivery_failed"
    });
  }

  return json(res, 200, {
    ok: true,
    message: "Lead submitted successfully."
  });
}

async function serveStatic(req, res, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = path
    .normalize(requestedPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]+/, "");
  const filePath = path.resolve(ROOT_DIR, normalizedPath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const stats = await fsp.stat(filePath);
    if (stats.isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600"
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "POST" && url.pathname === "/api/lead") {
    await handleLeadRequest(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    await serveStatic(req, res, url.pathname);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`AiElement server running on http://${HOST}:${PORT}`);
});
