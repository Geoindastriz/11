(function () {
  var STORAGE_KEY = "aielement-locale";
  var DESKTOP_BREAKPOINT = 1024;
  var DEFAULT_CONFIG = {
    contact: {
      telegramUrl: "https://t.me/Ai_Element_Bot",
      whatsappUrl: "https://wa.me/79990000000",
      phone: "+79990000000",
      email: "hello@example.com"
    },
    leadForm: {
      endpoint: "/api/lead",
      debounceMs: 1200,
      timeoutMs: 10000,
      minFillMs: 1500,
      minMessageLength: 5
    },
    integrations: {
      analytics: {
        provider: "auto"
      }
    }
  };
  var MENU_LABELS = {
    ru: { open: "Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР ВµР Р…РЎР‹", close: "Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР ВµР Р…РЎР‹" },
    en: { open: "Open menu", close: "Close menu" }
  };
  var FORM_COPY = {
    ru: {
      requiredMessage: "Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р С‘Р Т‘Р ВµРЎР‹ Р С‘Р В»Р С‘ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“.",
      messageTooShort: "Р вЂќР С•Р В±Р В°Р Р†РЎРЉРЎвЂљР Вµ РЎвЂЎРЎС“РЎвЂљРЎРЉ Р В±Р С•Р В»РЎРЉРЎв‚¬Р Вµ Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„–, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р СРЎвЂ№ Р С—Р С•Р Р…РЎРЏР В»Р С‘ Р В·Р В°Р С—РЎР‚Р С•РЎРѓ.",
      requiredContact: "Р вЂќР С•Р В±Р В°Р Р†РЎРЉРЎвЂљР Вµ Р С”Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљ Р Т‘Р В»РЎРЏ РЎРѓР Р†РЎРЏР В·Р С‘.",
      invalidContact: "Р С™Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљ Р Р†РЎвЂ№Р С–Р В»РЎРЏР Т‘Р С‘РЎвЂљ РЎРѓР В»Р С‘РЎв‚¬Р С”Р С•Р С Р С”Р С•РЎР‚Р С•РЎвЂљР С”Р С‘Р С. Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ РЎвЂљР ВµР В»Р ВµРЎвЂћР С•Р Р…, Telegram Р С‘Р В»Р С‘ WhatsApp.",
      validationError: "Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЉРЎвЂљР Вµ Р С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ Р С—Р С•Р В»РЎРЏ РЎвЂћР С•РЎР‚Р СРЎвЂ№.",
      submitIdle: "Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р В·Р В°РЎРЏР Р†Р С”РЎС“",
      submitLoading: "Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р В»РЎРЏР ВµР С...",
      success: "Р РЋР С—Р В°РЎРѓР С‘Р В±Р С•. Р СљРЎвЂ№ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘Р В»Р С‘ Р В·Р В°РЎРЏР Р†Р С”РЎС“ Р С‘ РЎС“Р В¶Р Вµ Р С—Р ВµРЎР‚Р ВµР Т‘Р В°Р В»Р С‘ Р ВµРЎвЂ Р Р† Telegram Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№.",
      error: "Р СњР Вµ РЎС“Р Т‘Р В°Р В»Р С•РЎРѓРЎРЉ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р В·Р В°РЎРЏР Р†Р С”РЎС“. Р СџР С•Р С—РЎР‚Р С•Р В±РЎС“Р в„–РЎвЂљР Вµ Р ВµРЎвЂ°РЎвЂ РЎР‚Р В°Р В· Р С‘Р В»Р С‘ Р Р…Р В°Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р…Р В°Р С Р Р…Р В°Р С—РЎР‚РЎРЏР СРЎС“РЎР‹ Р Р† Telegram.",
      configError: "Р В¤Р С•РЎР‚Р СР В° Р С—Р С•Р С”Р В° Р Р…Р Вµ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р ВµР Р…Р В° Р Р…Р В° РЎРѓР ВµРЎР‚Р Р†Р ВµРЎР‚Р Вµ. Р СњР В°Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р…Р В°Р С Р Р…Р В°Р С—РЎР‚РЎРЏР СРЎС“РЎР‹ Р Р† Telegram.",
      quickSubmit: "Р СџР С•РЎвЂ¦Р С•Р В¶Р Вµ Р Р…Р В° РЎРѓР В»Р С‘РЎв‚¬Р С”Р С•Р С Р В±РЎвЂ№РЎРѓРЎвЂљРЎР‚РЎС“РЎР‹ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р С”РЎС“. Р СџР С•Р С—РЎР‚Р С•Р В±РЎС“Р в„–РЎвЂљР Вµ Р ВµРЎвЂ°РЎвЂ РЎР‚Р В°Р В· РЎвЂЎР ВµРЎР‚Р ВµР В· РЎРѓР ВµР С”РЎС“Р Р…Р Т‘РЎС“.",
      rate_limited: "Р РЋР В»Р С‘РЎв‚¬Р С”Р С•Р С Р СР Р…Р С•Р С–Р С• Р С—Р С•Р С—РЎвЂ№РЎвЂљР С•Р С”. Р СџР С•Р Т‘Р С•Р В¶Р Т‘Р С‘РЎвЂљР Вµ Р С—Р В°РЎР‚РЎС“ Р СР С‘Р Р…РЎС“РЎвЂљ Р С‘ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†РЎРЉРЎвЂљР Вµ Р В·Р В°РЎРЏР Р†Р С”РЎС“ Р ВµРЎвЂ°РЎвЂ РЎР‚Р В°Р В·.",
      validation_message_required: "Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р С‘Р Т‘Р ВµРЎР‹ Р С‘Р В»Р С‘ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“.",
      validation_contact_required: "Р вЂќР С•Р В±Р В°Р Р†РЎРЉРЎвЂљР Вµ Р С”Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљ Р Т‘Р В»РЎРЏ РЎРѓР Р†РЎРЏР В·Р С‘.",
      validation_contact_invalid: "Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЉРЎвЂљР Вµ Р С”Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљ: РЎвЂљР ВµР В»Р ВµРЎвЂћР С•Р Р…, Telegram Р С‘Р В»Р С‘ WhatsApp.",
      delivery_failed: "Р СњР Вµ РЎС“Р Т‘Р В°Р В»Р С•РЎРѓРЎРЉ Р Т‘Р С•РЎРѓРЎвЂљР В°Р Р†Р С‘РЎвЂљРЎРЉ Р В·Р В°РЎРЏР Р†Р С”РЎС“. Р СџР С•Р С—РЎР‚Р С•Р В±РЎС“Р в„–РЎвЂљР Вµ Р ВµРЎвЂ°РЎвЂ РЎР‚Р В°Р В· Р С‘Р В»Р С‘ Р Р…Р В°Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р† Telegram.",
      request_failed: "Р СњР Вµ РЎС“Р Т‘Р В°Р В»Р С•РЎРѓРЎРЉ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р В·Р В°РЎРЏР Р†Р С”РЎС“. Р СџР С•Р С—РЎР‚Р С•Р В±РЎС“Р в„–РЎвЂљР Вµ Р ВµРЎвЂ°РЎвЂ РЎР‚Р В°Р В· Р С—Р С•Р В·Р В¶Р Вµ."
    },
    en: {
      requiredMessage: "Please describe your idea or task.",
      messageTooShort: "Add a bit more detail so we can understand the request.",
      requiredContact: "Please add a contact method.",
      invalidContact: "This contact looks too short. Please share a phone number, Telegram, or WhatsApp.",
      validationError: "Please review the required form fields.",
      submitIdle: "Send request",
      submitLoading: "Sending...",
      success: "Thank you. We received your request and forwarded it to the team Telegram.",
      error: "We could not send the form right now. Please message us directly on Telegram.",
      configError: "The form is not configured on the server yet. Please contact us directly on Telegram.",
      quickSubmit: "That was too fast. Please try again in a moment.",
      rate_limited: "Too many attempts. Please wait a few minutes and try again.",
      validation_message_required: "Please describe your idea or task.",
      validation_contact_required: "Please add a contact method.",
      validation_contact_invalid: "Please check your contact details.",
      delivery_failed: "We could not deliver the request right now. Please try again or use Telegram.",
      request_failed: "We could not send the form right now. Please try again later."
    }
  };
  var CONTACT_MODAL_COPY = {
    ru: {
      floatingCta: "Р С›Р В±РЎРѓРЎС“Р Т‘Р С‘РЎвЂљРЎРЉ Р С‘Р Т‘Р ВµРЎР‹",
      title: "Р С›Р В±РЎРѓРЎС“Р Т‘Р С‘Р С Р Р†Р В°РЎв‚¬РЎС“ Р С‘Р Т‘Р ВµРЎР‹",
      description: "Р С›РЎРѓРЎвЂљР В°Р Р†РЎРЉРЎвЂљР Вµ Р С”Р С•РЎР‚Р С•РЎвЂљР С”Р С•Р Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С‘ Р С”Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљ. Р вЂ”Р В°РЎРЏР Р†Р С”Р В° РЎРѓРЎР‚Р В°Р В·РЎС“ РЎС“Р в„–Р Т‘РЎвЂРЎвЂљ Р Р† Telegram Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№.",
      messageLabel: "Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р†Р В°РЎв‚¬РЎС“ Р С‘Р Т‘Р ВµРЎР‹",
      messagePlaceholder: "Р СњР В°Р С—РЎР‚Р С‘Р СР ВµРЎР‚: Р Р…РЎС“Р В¶Р ВµР Р… РЎРѓР В°Р в„–РЎвЂљ РЎРѓ AI-Р В±Р С•РЎвЂљР С•Р С, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ РЎРѓР С•Р В±Р С‘РЎР‚Р В°РЎвЂљРЎРЉ Р В·Р В°РЎРЏР Р†Р С”Р С‘ Р С‘ РЎРѓРЎР‚Р В°Р В·РЎС“ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»РЎРЏРЎвЂљРЎРЉ Р С‘РЎвЂ¦ Р Р† Telegram.",
      nameLabel: "Р ВР СРЎРЏ",
      namePlaceholder: "Р С™Р В°Р С” Р С” Р Р†Р В°Р С Р С•Р В±РЎР‚Р В°РЎвЂ°Р В°РЎвЂљРЎРЉРЎРѓРЎРЏ",
      contactLabel: "Р С™Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљ",
      contactPlaceholder: "Telegram, РЎвЂљР ВµР В»Р ВµРЎвЂћР С•Р Р… Р С‘Р В»Р С‘ WhatsApp",
      telegram: "Р СњР В°Р С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ Р Р† Telegram",
      close: "Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р С•Р С”Р Р…Р С•"
    },
    en: {
      floatingCta: "Discuss an idea",
      title: "LetРІР‚в„ўs discuss your idea",
      description: "Share a short description and your contact details. The request goes straight to the team Telegram.",
      messageLabel: "Describe your idea",
      messagePlaceholder: "For example: I need a website with an AI bot that captures leads and sends them to Telegram.",
      nameLabel: "Name",
      namePlaceholder: "How should we address you",
      contactLabel: "Contact",
      contactPlaceholder: "Telegram, phone, or WhatsApp",
      telegram: "Message on Telegram",
      close: "Close dialog"
    }
  };
  MENU_LABELS.ru = { open: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e", close: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e" };
  FORM_COPY.ru = {
    requiredMessage: "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0438\u0434\u0435\u044e \u0438\u043b\u0438 \u0437\u0430\u0434\u0430\u0447\u0443.",
    messageTooShort: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0447\u0443\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u0434\u0435\u0442\u0430\u043b\u0435\u0439, \u0447\u0442\u043e\u0431\u044b \u043c\u044b \u043f\u043e\u043d\u044f\u043b\u0438 \u0437\u0430\u043f\u0440\u043e\u0441.",
    requiredContact: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442 \u0434\u043b\u044f \u0441\u0432\u044f\u0437\u0438.",
    invalidContact: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442 \u0432\u044b\u0433\u043b\u044f\u0434\u0438\u0442 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u043c. \u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0442\u0435\u043b\u0435\u0444\u043e\u043d, Telegram \u0438\u043b\u0438 WhatsApp.",
    validationError: "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043b\u044f \u0444\u043e\u0440\u043c\u044b.",
    submitIdle: "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443",
    submitLoading: "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c...",
    success: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e. \u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0437\u0430\u044f\u0432\u043a\u0443 \u0438 \u0443\u0436\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043b\u0438 \u0435\u0451 \u0432 Telegram \u043a\u043e\u043c\u0430\u043d\u0434\u044b.",
    error: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0438\u043b\u0438 \u043d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e \u0432 Telegram.",
    configError: "\u0424\u043e\u0440\u043c\u0430 \u043f\u043e\u043a\u0430 \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0430 \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435. \u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e \u0432 Telegram.",
    quickSubmit: "\u041f\u043e\u0445\u043e\u0436\u0435 \u043d\u0430 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u044b\u0441\u0442\u0440\u0443\u044e \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u0441\u0435\u043a\u0443\u043d\u0434\u0443.",
    rate_limited: "\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u043f\u043e\u043f\u044b\u0442\u043e\u043a. \u041f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u0443 \u043c\u0438\u043d\u0443\u0442 \u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0443 \u0435\u0449\u0451 \u0440\u0430\u0437.",
    validation_message_required: "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0438\u0434\u0435\u044e \u0438\u043b\u0438 \u0437\u0430\u0434\u0430\u0447\u0443.",
    validation_contact_required: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442 \u0434\u043b\u044f \u0441\u0432\u044f\u0437\u0438.",
    validation_contact_invalid: "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442: \u0442\u0435\u043b\u0435\u0444\u043e\u043d, Telegram \u0438\u043b\u0438 WhatsApp.",
    delivery_failed: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0434\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0438\u043b\u0438 \u043d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0432 Telegram.",
    request_failed: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u043f\u043e\u0437\u0436\u0435."
  };
  CONTACT_MODAL_COPY.ru = {
    floatingCta: "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u0438\u0434\u0435\u044e",
    title: "\u041e\u0431\u0441\u0443\u0434\u0438\u043c \u0432\u0430\u0448\u0443 \u0438\u0434\u0435\u044e",
    description: "\u041e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442. \u0417\u0430\u044f\u0432\u043a\u0430 \u0441\u0440\u0430\u0437\u0443 \u0443\u0439\u0434\u0451\u0442 \u0432 Telegram \u043a\u043e\u043c\u0430\u043d\u0434\u044b.",
    messageLabel: "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0443 \u0438\u0434\u0435\u044e",
    messagePlaceholder: "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: \u043d\u0443\u0436\u0435\u043d \u0441\u0430\u0439\u0442 \u0441 AI-\u0431\u043e\u0442\u043e\u043c, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0431\u0438\u0440\u0430\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0438 \u0438 \u0441\u0440\u0430\u0437\u0443 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u0438\u0445 \u0432 Telegram.",
    nameLabel: "\u0418\u043c\u044f",
    namePlaceholder: "\u041a\u0430\u043a \u043a \u0432\u0430\u043c \u043e\u0431\u0440\u0430\u0449\u0430\u0442\u044c\u0441\u044f",
    contactLabel: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442",
    contactPlaceholder: "Telegram, \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u0438\u043b\u0438 WhatsApp",
    telegram: "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 Telegram",
    close: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043e\u043a\u043d\u043e"
  };
  var RUNTIME_RU_PAGE_FIXES = {
    contact: {
      title: "AiElement | \u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
      description: "\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441 \u043a\u043e\u043c\u0430\u043d\u0434\u043e\u0439 AiElement: \u0437\u0430\u044f\u0432\u043a\u0430, Telegram \u0438 \u0431\u044b\u0441\u0442\u0440\u044b\u0439 \u043f\u0443\u0442\u044c \u043a \u043e\u0431\u0441\u0443\u0436\u0434\u0435\u043d\u0438\u044e AI-\u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430.",
      text: {
        "nav.tagline": "\u0418\u0418-\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430",
        "nav.home": "\u0413\u043b\u0430\u0432\u043d\u0430\u044f",
        "nav.services": "\u0423\u0441\u043b\u0443\u0433\u0438",
        "nav.demo": "\u0414\u0435\u043c\u043e",
        "nav.how": "\u041a\u0430\u043a \u043c\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u043c",
        "nav.cases": "\u041a\u0435\u0439\u0441\u044b",
        "nav.pricing": "\u0426\u0435\u043d\u044b",
        "nav.contact": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
        "nav.launchDemo": "\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0434\u0435\u043c\u043e",
        "hero.eyebrow": "\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441 \u043a\u043e\u043c\u0430\u043d\u0434\u043e\u0439",
        "hero.title": "\u0420\u0430\u0441\u0441\u043a\u0430\u0436\u0438\u0442\u0435 \u043e\u0431 \u0438\u0434\u0435\u0435, \u0438 \u043c\u044b \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0438\u043c \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u0440\u043e\u0441\u0442\u0430 \u043f\u043e\u0434 \u0432\u0430\u0448 \u0431\u0438\u0437\u043d\u0435\u0441",
        "hero.description": "\u041c\u043e\u0436\u043d\u043e \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0438\u0434\u0435\u044e \u0432 \u0444\u043e\u0440\u043c\u0435 \u0438\u043b\u0438 \u0441\u0440\u0430\u0437\u0443 \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 Telegram. \u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u0431\u044b\u0441\u0442\u0440\u043e \u043f\u043e\u0434\u0441\u043a\u0430\u0436\u0435\u0442, \u043a\u0430\u043a\u043e\u0439 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0439 \u0434\u0430\u0441\u0442 \u0431\u043e\u043b\u044c\u0448\u0435 \u043f\u0440\u044f\u043c\u044b\u0445 \u0437\u0430\u044f\u0432\u043e\u043a, \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0439 \u0438 \u0432\u044b\u0440\u0443\u0447\u043a\u0438.",
        "contactOptions.label": "\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u043a\u0430\u043d\u0430\u043b\u044b \u0441\u0432\u044f\u0437\u0438",
        "contactOptions.title": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0434\u043e\u0431\u043d\u044b\u0439 \u043a\u0430\u043d\u0430\u043b \u0438\u043b\u0438 \u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0443",
        "contactOptions.description": "\u0424\u043e\u0440\u043c\u0430 \u043d\u0438\u0436\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u0437\u0430\u044f\u0432\u043a\u0443 \u0441\u0440\u0430\u0437\u0443 \u0432 Telegram. \u0415\u0441\u043b\u0438 \u0443\u0434\u043e\u0431\u043d\u0435\u0435 \u043d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u043e\u0434\u0438\u043d \u0438\u0437 \u043a\u0430\u043d\u0430\u043b\u043e\u0432 \u043d\u0438\u0436\u0435.",
        "contactOptions.telegramTitle": "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 Telegram",
        "contactOptions.whatsappTitle": "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0447\u0430\u0442 WhatsApp",
        "contactOptions.phoneLabel": "\u0422\u0435\u043b\u0435\u0444\u043e\u043d",
        "contactOptions.phoneTitle": "\u041f\u043e\u0437\u0432\u043e\u043d\u0438\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u0435",
        "contactOptions.emailTitle": "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u0438\u0441\u044c\u043c\u043e",
        "telegram.secondary": "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0434\u0435\u043c\u043e",
        "contactOptions.note": "\u0415\u0441\u043b\u0438 \u043f\u043e\u0437\u0436\u0435 \u043f\u043e\u043d\u0430\u0434\u043e\u0431\u0438\u0442\u0441\u044f CRM-\u043b\u043e\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435, \u0442\u0443 \u0436\u0435 \u0444\u043e\u0440\u043c\u0443 \u043c\u043e\u0436\u043d\u043e \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u043a Google Apps Script, Firebase \u0438\u043b\u0438 \u0434\u0440\u0443\u0433\u043e\u0439 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0431\u0435\u0437 \u043f\u0435\u0440\u0435\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0434\u0438\u0437\u0430\u0439\u043d\u0430.",
        "form.label": "\u0424\u043e\u0440\u043c\u0430 \u0437\u0430\u044f\u0432\u043a\u0438",
        "form.title": "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0438\u0434\u0435\u044e, \u0438 \u043c\u044b \u0431\u044b\u0441\u0442\u0440\u043e \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f",
        "form.description": "\u0413\u043b\u0430\u0432\u043d\u043e\u0435 \u043f\u043e\u043b\u0435 \u043d\u0438\u0436\u0435 \u0443\u0445\u043e\u0434\u0438\u0442 \u0432 Telegram \u0441\u0440\u0430\u0437\u0443 \u043f\u043e\u0441\u043b\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438. \u0418\u043c\u044f \u043c\u043e\u0436\u043d\u043e \u043d\u0435 \u0437\u0430\u043f\u043e\u043b\u043d\u044f\u0442\u044c, \u0435\u0441\u043b\u0438 \u0445\u043e\u0442\u0438\u0442\u0435 \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0438\u0434\u0435\u044e \u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442.",
        "form.messageLabel": "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0443 \u0438\u0434\u0435\u044e",
        "form.nameLabel": "\u0418\u043c\u044f",
        "form.contactLabel": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442 \u0434\u043b\u044f \u0441\u0432\u044f\u0437\u0438",
        "form.submit": "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443",
        "form.success": "\u0421\u043f\u0430\u0441\u0438\u0431\u043e. \u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0437\u0430\u044f\u0432\u043a\u0443 \u0438 \u0443\u0436\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043b\u0438 \u0435\u0451 \u0432 Telegram \u043a\u043e\u043c\u0430\u043d\u0434\u044b.",
        "footer.description": "\u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u0441\u043e\u0437\u0434\u0430\u0451\u0442 AI-\u0441\u0438\u0441\u0442\u0435\u043c\u044b \u043f\u0440\u043e\u0434\u0430\u0436 \u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430: \u0441\u0430\u0439\u0442\u044b, \u0431\u043e\u0442\u044b, \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044e \u0437\u0430\u044f\u0432\u043e\u043a \u0438 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u0440\u043e\u0441\u0442\u0430 \u0432\u044b\u0440\u0443\u0447\u043a\u0438.",
        "footer.link1": "\u0423\u0441\u043b\u0443\u0433\u0438",
        "footer.link2": "\u041a\u0435\u0439\u0441\u044b",
        "footer.link3": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
        "footer.copy": "AiElement. \u041a\u043e\u043c\u0430\u043d\u0434\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432 \u0418\u0418-\u0440\u0435\u0448\u0435\u043d\u0438\u0439 \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430."
      },
      placeholders: {
        "form.message": "\u041a\u043e\u0440\u043e\u0442\u043a\u043e \u043e\u043f\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443, \u0446\u0435\u043b\u044c \u0438\u043b\u0438 \u0438\u0434\u0435\u044e",
        "form.name": "\u041a\u0430\u043a \u043a \u0432\u0430\u043c \u043e\u0431\u0440\u0430\u0449\u0430\u0442\u044c\u0441\u044f",
        "form.contact": "Telegram, \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u0438\u043b\u0438 WhatsApp"
      }
    }
  };
  function applyRuPageFixes(cache, locale) {
    if (locale !== "ru") return;
    var page = document.body ? document.body.dataset.page : "";
    var fixes = RUNTIME_RU_PAGE_FIXES[page];
    if (!fixes) return;
    if (fixes.title) document.title = fixes.title;
    if (cache.metaDescription && fixes.description) cache.metaDescription.setAttribute("content", fixes.description);
    Object.keys(fixes.text || {}).forEach(function (key) {
      var nodes = document.querySelectorAll('[data-i18n="' + key + '"]');
      nodes.forEach(function (node) { node.textContent = fixes.text[key]; });
    });
    Object.keys(fixes.placeholders || {}).forEach(function (key) {
      var nodes = document.querySelectorAll('[data-i18n-placeholder="' + key + '"]');
      nodes.forEach(function (node) { node.setAttribute("placeholder", fixes.placeholders[key]); });
    });
  }
  function mergeConfig(base, override) {
    var result = Array.isArray(base) ? base.slice() : {};
    var source = override || {};
    Object.keys(base).forEach(function (key) {
      var baseValue = base[key];
      var overrideValue = source[key];
      if (baseValue && typeof baseValue === "object" && !Array.isArray(baseValue)) {
        result[key] = mergeConfig(baseValue, overrideValue && typeof overrideValue === "object" ? overrideValue : {});
      } else if (overrideValue !== undefined) {
        result[key] = overrideValue;
      } else {
        result[key] = baseValue;
      }
    });
    Object.keys(source).forEach(function (key) {
      if (result[key] === undefined) {
        result[key] = source[key];
      }
    });
    return result;
  }
  var APP_CONFIG = mergeConfig(DEFAULT_CONFIG, window.AiElementConfig || {});
  var scrollLocks = new Set();
  function getPageTranslations() {
    var page = document.body ? document.body.dataset.page : "";
    if (!page || !window.aielementTranslations) return null;
    return window.aielementTranslations[page] || null;
  }
  function getValue(object, path) {
    return path.split(".").reduce(function (acc, key) {
      if (acc && Object.prototype.hasOwnProperty.call(acc, key)) return acc[key];
      return null;
    }, object);
  }
  function trimValue(value) { return (value || "").replace(/\s+/g, " ").trim(); }
  function sanitizePhone(value) { return (value || "").replace(/[^\d+]/g, ""); }
  function captureDefaults(cache) {
    cache.text.forEach(function (node) { if (node.dataset.defaultText === undefined) node.dataset.defaultText = node.textContent; });
    cache.html.forEach(function (node) { if (node.dataset.defaultHtml === undefined) node.dataset.defaultHtml = node.innerHTML; });
    cache.placeholder.forEach(function (node) { if (node.dataset.defaultPlaceholder === undefined) node.dataset.defaultPlaceholder = node.getAttribute("placeholder") || ""; });
    cache.title.forEach(function (node) { if (node.dataset.defaultTitleAttr === undefined) node.dataset.defaultTitleAttr = node.getAttribute("title") || ""; });
    if (document.documentElement.dataset.defaultTitle === undefined) document.documentElement.dataset.defaultTitle = document.title;
    if (cache.metaDescription && cache.metaDescription.dataset.defaultDescription === undefined) cache.metaDescription.dataset.defaultDescription = cache.metaDescription.getAttribute("content") || "";
  }
  function restoreDefaults(cache) {
    cache.text.forEach(function (node) { if (node.dataset.defaultText !== undefined) node.textContent = node.dataset.defaultText; });
    cache.html.forEach(function (node) { if (node.dataset.defaultHtml !== undefined) node.innerHTML = node.dataset.defaultHtml; });
    cache.placeholder.forEach(function (node) { if (node.dataset.defaultPlaceholder !== undefined) node.setAttribute("placeholder", node.dataset.defaultPlaceholder); });
    cache.title.forEach(function (node) { if (node.dataset.defaultTitleAttr !== undefined) node.setAttribute("title", node.dataset.defaultTitleAttr); });
    if (document.documentElement.dataset.defaultTitle) document.title = document.documentElement.dataset.defaultTitle;
    if (cache.metaDescription && cache.metaDescription.dataset.defaultDescription !== undefined) cache.metaDescription.setAttribute("content", cache.metaDescription.dataset.defaultDescription);
  }
  function applyTranslations(locale, cache) {
    captureDefaults(cache);
    if (locale === "ru") {
      document.documentElement.lang = "ru";
      restoreDefaults(cache);
      return null;
    }
    var translations = getPageTranslations();
    if (!translations) {
      document.documentElement.lang = locale;
      return null;
    }
    var dictionary = translations[locale] || translations.en || translations || {};
    document.documentElement.lang = locale;
    cache.text.forEach(function (node) { var value = getValue(dictionary, node.dataset.i18n); if (value !== null) node.textContent = value; });
    cache.html.forEach(function (node) { var value = getValue(dictionary, node.dataset.i18nHtml); if (value !== null) node.innerHTML = value; });
    cache.placeholder.forEach(function (node) { var value = getValue(dictionary, node.dataset.i18nPlaceholder); if (value !== null) node.setAttribute("placeholder", value); });
    cache.title.forEach(function (node) { var value = getValue(dictionary, node.dataset.i18nTitle); if (value !== null) node.setAttribute("title", value); });
    var title = getValue(dictionary, "meta.title");
    if (title) document.title = title;
    var description = getValue(dictionary, "meta.description");
    if (description && cache.metaDescription) cache.metaDescription.setAttribute("content", description);
    return dictionary;
  }
  function updateBodyScrollLock() {
    var body = document.body;
    if (!body) return;
    if (scrollLocks.size > 0) {
      if (body.dataset.scrollLockY === undefined) {
        var scrollY = window.scrollY || window.pageYOffset || 0;
        body.dataset.scrollLockY = String(scrollY);
        body.style.top = "-" + scrollY + "px";
        body.style.position = "fixed";
        body.style.width = "100%";
      }
      body.classList.add("is-scroll-locked");
    } else if (body.dataset.scrollLockY !== undefined) {
      var savedScrollY = parseInt(body.dataset.scrollLockY || "0", 10) || 0;
      delete body.dataset.scrollLockY;
      body.style.top = "";
      body.style.position = "";
      body.style.width = "";
      body.classList.remove("is-scroll-locked");
      window.scrollTo(0, savedScrollY);
    }
  }
  function lockBodyScroll(key) { scrollLocks.add(key); updateBodyScrollLock(); }
  function unlockBodyScroll(key) { scrollLocks.delete(key); updateBodyScrollLock(); }
  function trackEvent(name, payload) {
    var data = payload || {};
    if (typeof window.gtag === "function") window.gtag("event", name, data);
    if (typeof window.plausible === "function") window.plausible(name, Object.keys(data).length ? { props: data } : undefined);
  }
  function fetchWithTimeout(url, options, timeoutMs) {
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timerId = null;
    var requestOptions = options || {};
    if (controller) {
      requestOptions.signal = controller.signal;
      timerId = window.setTimeout(function () { controller.abort(); }, timeoutMs);
    }
    return fetch(url, requestOptions).then(function (response) {
      if (timerId) window.clearTimeout(timerId);
      return response;
    }, function (error) {
      if (timerId) window.clearTimeout(timerId);
      throw error;
    });
  }
  function postJson(url, payload, authToken) {
    var headers = { "Content-Type": "application/json" };
    if (authToken) headers["X-Api-Key"] = authToken;
    return fetchWithTimeout(url, { method: "POST", headers: headers, body: JSON.stringify(payload) }, APP_CONFIG.leadForm.timeoutMs).then(function (response) {
      return response.text().then(function (text) {
        var data = {};
        if (text) {
          try { data = JSON.parse(text); } catch (error) { data = { errorCode: "request_failed", error: text }; }
        }
        if (!response.ok) throw new Error(data.errorCode || data.error || "request_failed");
        return data;
      });
    });
  }
  function buildLeadPayload(formState, locale) {
    return {
      name: trimValue(formState.fields.name ? formState.fields.name.value : ""),
      contact: trimValue(formState.fields.contact ? formState.fields.contact.value : ""),
      message: trimValue(formState.fields.message ? formState.fields.message.value : ""),
      page: document.body ? document.body.dataset.page || "unknown" : "unknown",
      locale: locale,
      source: window.location.href,
      website: formState.honeypot ? trimValue(formState.honeypot.value) : ""
    };
  }
  function createLeadFormState(form) {
    return {
      form: form,
      fields: { name: form.querySelector('[name="name"]'), contact: form.querySelector('[name="contact"]'), message: form.querySelector('[name="message"]') },
      honeypot: form.querySelector("[data-lead-honeypot]"),
      feedback: form.querySelector("[data-form-feedback]"),
      success: form.parentNode ? form.parentNode.querySelector("[data-form-success]") : null,
      submitButton: form.querySelector("[data-submit-button]"),
      submitLabel: form.querySelector("[data-submit-label]"),
      fieldErrors: { message: form.querySelector('[data-field-error="message"]'), contact: form.querySelector('[data-field-error="contact"]') },
      lastSubmittedAt: 0,
      readyAt: Date.now(),
      submitting: false,
      variant: form.dataset.leadVariant || "page"
    };
  }  function ensureContactModal() {
    var existing = document.querySelector("[data-contact-modal]");
    if (existing) {
      return {
        root: existing,
        backdrop: document.querySelector("[data-contact-modal-backdrop]"),
        panel: document.querySelector("[data-contact-modal-panel]"),
        form: existing.querySelector("[data-lead-form]"),
        message: existing.querySelector('[name="message"]'),
        telegramLink: existing.querySelector("[data-modal-telegram-link]"),
        floatingButtons: Array.prototype.slice.call(document.querySelectorAll(".floating-cta"))
      };
    }
    var wrapper = document.createElement("div");
    wrapper.dataset.contactModal = "true";
    wrapper.innerHTML = [
      '<div class="contact-modal-backdrop" data-contact-modal-backdrop hidden></div>',
      '<div class="contact-modal-shell" data-contact-modal-panel hidden>',
      '  <div class="contact-modal-card glass-card">',
      '    <button type="button" class="contact-modal-close" data-contact-modal-close aria-label="Close dialog"><span aria-hidden="true">&times;</span></button>',
      '    <div class="contact-modal-copy">',
      '      <div class="contact-modal-eyebrow">AiElement</div>',
      '      <h2 class="contact-modal-title" data-modal-title></h2>',
      '      <p class="contact-modal-description text-slate-300" data-modal-description></p>',
      '    </div>',
      '    <form class="mt-6 space-y-4" data-lead-form data-lead-variant="modal" novalidate>',
      '      <div class="space-y-2">',
      '        <label class="block text-sm font-semibold text-slate-100" for="modal-lead-message" data-modal-message-label></label>',
      '        <textarea id="modal-lead-message" name="message" rows="5" required class="form-input w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-accent/40" data-modal-message-placeholder></textarea>',
      '        <p class="form-field-error text-sm text-[#ff8f8f]" data-field-error="message" hidden></p>',
      '      </div>',
      '      <div class="space-y-2">',
      '        <label class="block text-sm font-semibold text-slate-100" for="modal-lead-name" data-modal-name-label></label>',
      '        <input id="modal-lead-name" name="name" type="text" autocomplete="name" class="form-input w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-accent/40" data-modal-name-placeholder>',
      '      </div>',
      '      <div class="space-y-2">',
      '        <label class="block text-sm font-semibold text-slate-100" for="modal-lead-contact" data-modal-contact-label></label>',
      '        <input id="modal-lead-contact" name="contact" type="text" autocomplete="tel" required class="form-input w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-accent/40" data-modal-contact-placeholder>',
      '        <p class="form-field-error text-sm text-[#ff8f8f]" data-field-error="contact" hidden></p>',
      '      </div>',
      '      <input type="text" name="company" class="sr-only" tabindex="-1" autocomplete="off" data-lead-honeypot>',
      '      <div class="form-feedback text-sm" data-form-feedback role="status" aria-live="polite" hidden></div>',
      '      <button type="submit" class="btn-growth w-full rounded-full px-6 py-4 text-sm font-semibold transition" data-submit-button><span data-submit-label></span></button>',
      '    </form>',
      '    <div class="mt-4 rounded-3xl border border-growth/20 bg-growth/10 p-4 text-slate-100" data-form-success hidden></div>',
      '    <a href="#" class="contact-modal-telegram btn-secondary mt-4 block rounded-full px-6 py-4 text-center text-sm font-semibold transition" target="_blank" rel="noreferrer" data-modal-telegram-link data-contact-channel="telegram-direct"></a>',
      '  </div>',
      '</div>'
    ].join("");
    document.body.appendChild(wrapper);
    return {
      root: wrapper,
      backdrop: wrapper.querySelector("[data-contact-modal-backdrop]"),
      panel: wrapper.querySelector("[data-contact-modal-panel]"),
      form: wrapper.querySelector("[data-lead-form]"),
      message: wrapper.querySelector('[name="message"]'),
      telegramLink: wrapper.querySelector("[data-modal-telegram-link]"),
      floatingButtons: Array.prototype.slice.call(document.querySelectorAll(".floating-cta"))
    };
  }
  function createApp() {
    var modal = ensureContactModal();
    var cache = {
      text: Array.prototype.slice.call(document.querySelectorAll("[data-i18n]")),
      html: Array.prototype.slice.call(document.querySelectorAll("[data-i18n-html]")),
      placeholder: Array.prototype.slice.call(document.querySelectorAll("[data-i18n-placeholder]")),
      title: Array.prototype.slice.call(document.querySelectorAll("[data-i18n-title]")),
      metaDescription: document.querySelector('meta[name="description"]'),
      year: Array.prototype.slice.call(document.querySelectorAll("[data-year]")),
      menuToggles: Array.prototype.slice.call(document.querySelectorAll("[data-menu-toggle]")),
      menuCloseButtons: Array.prototype.slice.call(document.querySelectorAll("[data-menu-close]")),
      backdrop: document.querySelector("[data-menu-backdrop]"),
      panel: document.querySelector("[data-mobile-menu]"),
      languageButtons: Array.prototype.slice.call(document.querySelectorAll("[data-language-switch] [data-lang]")),
      leadForms: Array.prototype.slice.call(document.querySelectorAll("[data-lead-form]")).map(createLeadFormState),
      contactLinks: Array.prototype.slice.call(document.querySelectorAll("[data-contact-link]")),
      contactValues: Array.prototype.slice.call(document.querySelectorAll("[data-contact-value]")),
      floatingButtons: modal.floatingButtons,
      modalRoot: modal.root,
      modalBackdrop: modal.backdrop,
      modalPanel: modal.panel,
      modalMessage: modal.message,
      modalTelegramLink: modal.telegramLink,
      modalTitle: modal.root.querySelector("[data-modal-title]"),
      modalDescription: modal.root.querySelector("[data-modal-description]"),
      modalMessageLabel: modal.root.querySelector("[data-modal-message-label]"),
      modalNameLabel: modal.root.querySelector("[data-modal-name-label]"),
      modalContactLabel: modal.root.querySelector("[data-modal-contact-label]"),
      modalMessagePlaceholder: modal.root.querySelector("[data-modal-message-placeholder]"),
      modalNamePlaceholder: modal.root.querySelector("[data-modal-name-placeholder]"),
      modalContactPlaceholder: modal.root.querySelector("[data-modal-contact-placeholder]"),
      modalCloseButton: modal.root.querySelector("[data-contact-modal-close]")
    };
    var state = { locale: "ru", mobileOpen: false, modalOpen: false, currentDictionary: null, lastModalTrigger: null };
    function getCopy(key) {
      var dictionary = FORM_COPY[state.locale] || FORM_COPY.ru;
      return dictionary[key] || FORM_COPY.ru[key] || "";
    }
    function getModalCopy() { return CONTACT_MODAL_COPY[state.locale] || CONTACT_MODAL_COPY.ru; }
    function resolveErrorMessage(error) {
      if (!error || !error.message) return getCopy("error");
      return getCopy(error.message) || getCopy("error");
    }
    function updateYear() {
      var year = String(new Date().getFullYear());
      cache.year.forEach(function (node) { node.textContent = year; });
    }
    function syncLanguageControls() {
      cache.languageButtons.forEach(function (button) {
        var isActive = button.dataset.lang === state.locale;
        button.classList.toggle("is-active", isActive);
        button.classList.toggle("text-slate-400", !isActive);
        button.classList.toggle("text-black", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }
    function syncMenuLabels() {
      var labels = MENU_LABELS[state.locale] || MENU_LABELS.ru;
      cache.menuToggles.forEach(function (button) { button.setAttribute("aria-label", labels.open); });
      cache.menuCloseButtons.forEach(function (button) { button.setAttribute("aria-label", labels.close); });
    }
    function syncMenu() {
      var isOpen = state.mobileOpen;
      cache.menuToggles.forEach(function (button) { button.setAttribute("aria-expanded", isOpen ? "true" : "false"); });
      if (cache.backdrop) {
        cache.backdrop.hidden = !isOpen;
        cache.backdrop.classList.toggle("is-open", isOpen);
      }
      if (cache.panel) {
        cache.panel.hidden = !isOpen;
        cache.panel.classList.toggle("is-open", isOpen);
        cache.panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
      }
      if (isOpen) lockBodyScroll("menu"); else unlockBodyScroll("menu");
    }
    function buildContactMap() {
      var phone = trimValue(APP_CONFIG.contact.phone);
      var whatsappUrl = trimValue(APP_CONFIG.contact.whatsappUrl);
      var phoneHref = phone ? "tel:" + sanitizePhone(phone) : "";
      return {
        telegram: { href: trimValue(APP_CONFIG.contact.telegramUrl), text: "@Ai_Element_Bot" },
        whatsapp: { href: whatsappUrl, text: whatsappUrl ? phone : "" },
        phone: { href: phoneHref, text: phone },
        email: { href: APP_CONFIG.contact.email ? "mailto:" + APP_CONFIG.contact.email : "", text: trimValue(APP_CONFIG.contact.email) }
      };
    }
    function populateContactLinks() {
      var contactMap = buildContactMap();
      cache.contactLinks.forEach(function (link) {
        var type = link.dataset.contactLink;
        var config = contactMap[type];
        if (!config || !config.href) {
          link.hidden = true;
          return;
        }
        link.hidden = false;
        link.setAttribute("href", config.href);
        if (type === "telegram" || type === "whatsapp") {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noreferrer");
        } else {
          link.removeAttribute("target");
          link.removeAttribute("rel");
        }
      });
      cache.contactValues.forEach(function (node) {
        var config = contactMap[node.dataset.contactValue];
        if (config && config.text) node.textContent = config.text;
      });
      if (cache.modalTelegramLink && contactMap.telegram && contactMap.telegram.href) cache.modalTelegramLink.href = contactMap.telegram.href;
    }
    function syncFloatingButtons() {
      var modalCopy = getModalCopy();
      cache.floatingButtons.forEach(function (button) {
        button.textContent = modalCopy.floatingCta;
        button.setAttribute("href", "#contact-modal");
        button.setAttribute("role", "button");
        button.dataset.openContactModal = "true";
        button.removeAttribute("target");
        button.removeAttribute("rel");
        button.removeAttribute("data-i18n");
      });
    }
    function syncModalCopy() {
      var modalCopy = getModalCopy();
      if (cache.modalTitle) cache.modalTitle.textContent = modalCopy.title;
      if (cache.modalDescription) cache.modalDescription.textContent = modalCopy.description;
      if (cache.modalMessageLabel) cache.modalMessageLabel.textContent = modalCopy.messageLabel;
      if (cache.modalNameLabel) cache.modalNameLabel.textContent = modalCopy.nameLabel;
      if (cache.modalContactLabel) cache.modalContactLabel.textContent = modalCopy.contactLabel;
      if (cache.modalMessagePlaceholder) cache.modalMessagePlaceholder.setAttribute("placeholder", modalCopy.messagePlaceholder);
      if (cache.modalNamePlaceholder) cache.modalNamePlaceholder.setAttribute("placeholder", modalCopy.namePlaceholder);
      if (cache.modalContactPlaceholder) cache.modalContactPlaceholder.setAttribute("placeholder", modalCopy.contactPlaceholder);
      if (cache.modalTelegramLink) cache.modalTelegramLink.textContent = modalCopy.telegram;
      if (cache.modalCloseButton) cache.modalCloseButton.setAttribute("aria-label", modalCopy.close);
      syncFloatingButtons();
    }    function setLanguage(locale) {
      state.locale = locale === "en" ? "en" : "ru";
      localStorage.setItem(STORAGE_KEY, state.locale);
      state.currentDictionary = applyTranslations(state.locale, cache);
      syncLanguageControls();
      syncMenuLabels();
      syncModalCopy();
      syncLeadForms();
      applyRuPageFixes(cache, state.locale);
    }
    function closeMenu() { if (!state.mobileOpen) return; state.mobileOpen = false; syncMenu(); }
    function openMenu() { if (state.mobileOpen) return; state.mobileOpen = true; syncMenu(); }
    function toggleMenu() { if (state.mobileOpen) closeMenu(); else openMenu(); }
    function openModal(trigger) {
      if (!cache.modalRoot || !cache.modalBackdrop || !cache.modalPanel) return;
      state.modalOpen = true;
      state.lastModalTrigger = trigger || null;
      cache.modalBackdrop.hidden = false;
      cache.modalPanel.hidden = false;
      cache.modalBackdrop.classList.add("is-open");
      cache.modalPanel.classList.add("is-open");
      lockBodyScroll("contact-modal");
      var formState = cache.leadForms.find(function (item) { return item.variant === "modal"; });
      if (formState) formState.readyAt = Date.now();
      window.setTimeout(function () { if (cache.modalMessage) cache.modalMessage.focus(); }, 40);
      trackEvent("contact_modal_open", { page: document.body ? document.body.dataset.page || "unknown" : "unknown" });
    }
    function closeModal() {
      if (!state.modalOpen || !cache.modalBackdrop || !cache.modalPanel) return;
      state.modalOpen = false;
      cache.modalBackdrop.classList.remove("is-open");
      cache.modalPanel.classList.remove("is-open");
      cache.modalBackdrop.hidden = true;
      cache.modalPanel.hidden = true;
      unlockBodyScroll("contact-modal");
      if (state.lastModalTrigger && typeof state.lastModalTrigger.focus === "function") state.lastModalTrigger.focus();
      state.lastModalTrigger = null;
    }
    function clearFieldError(formState, fieldName) {
      var field = formState.fields[fieldName];
      var error = formState.fieldErrors[fieldName];
      if (field) field.classList.remove("is-invalid");
      if (error) { error.hidden = true; error.textContent = ""; }
    }
    function clearFormErrors(formState) { clearFieldError(formState, "message"); clearFieldError(formState, "contact"); }
    function hideLeadSuccess(formState) { if (formState.success) formState.success.hidden = true; }
    function showFieldError(formState, fieldName, message) {
      var field = formState.fields[fieldName];
      var error = formState.fieldErrors[fieldName];
      if (field) field.classList.add("is-invalid");
      if (error) { error.hidden = false; error.textContent = message; }
    }
    function renderFeedback(formState, type, message) {
      if (!formState.feedback) return;
      if (!message) {
        formState.feedback.hidden = true;
        formState.feedback.textContent = "";
        formState.feedback.classList.remove("is-success");
        formState.feedback.classList.remove("is-error");
        return;
      }
      formState.feedback.hidden = false;
      formState.feedback.textContent = message;
      formState.feedback.classList.toggle("is-success", type === "success");
      formState.feedback.classList.toggle("is-error", type === "error");
    }
    function setSubmitting(formState, isSubmitting) {
      formState.submitting = isSubmitting;
      if (formState.submitButton) {
        formState.submitButton.disabled = isSubmitting;
        formState.submitButton.classList.toggle("is-loading", isSubmitting);
      }
      if (formState.submitLabel) formState.submitLabel.textContent = isSubmitting ? getCopy("submitLoading") : getCopy("submitIdle");
    }
    function syncLeadForms() {
      cache.leadForms.forEach(function (formState) { setSubmitting(formState, false); });
      syncModalCopy();
    }
    function validateLead(formState) {
      var message = trimValue(formState.fields.message ? formState.fields.message.value : "");
      var contact = trimValue(formState.fields.contact ? formState.fields.contact.value : "");
      var valid = true;
      clearFormErrors(formState);
      renderFeedback(formState, "", "");
      if (!message) {
        showFieldError(formState, "message", getCopy("requiredMessage"));
        valid = false;
      } else if (message.length < APP_CONFIG.leadForm.minMessageLength) {
        showFieldError(formState, "message", getCopy("messageTooShort"));
        valid = false;
      }
      if (!contact) {
        showFieldError(formState, "contact", getCopy("requiredContact"));
        valid = false;
      } else if (contact.length < 4) {
        showFieldError(formState, "contact", getCopy("invalidContact"));
        valid = false;
      }
      return valid;
    }
    function sendLead(payload) {
      if (!APP_CONFIG.leadForm.endpoint) return Promise.reject(new Error("configError"));
      return postJson(APP_CONFIG.leadForm.endpoint, payload);
    }
    function submitLead(formState) {
      var now = Date.now();
      if (formState.submitting || now - formState.lastSubmittedAt < APP_CONFIG.leadForm.debounceMs) return;
      formState.lastSubmittedAt = now;
      if (formState.honeypot && trimValue(formState.honeypot.value)) return;
      if (now - formState.readyAt < APP_CONFIG.leadForm.minFillMs) {
        renderFeedback(formState, "error", getCopy("quickSubmit"));
        return;
      }
      hideLeadSuccess(formState);
      if (!validateLead(formState)) {
        renderFeedback(formState, "error", getCopy("validationError"));
        return;
      }
      var payload = buildLeadPayload(formState, state.locale);
      setSubmitting(formState, true);
      sendLead(payload).then(function () {
        formState.form.reset();
        formState.readyAt = Date.now();
        clearFormErrors(formState);
        renderFeedback(formState, "success", getCopy("success"));
        if (formState.success) {
          formState.success.hidden = false;
          formState.success.textContent = getCopy("success");
        }
        trackEvent("form_submit_success", { page: payload.page, locale: payload.locale, variant: formState.variant });
        if (formState.variant === "modal") window.setTimeout(closeModal, 1400);
      }).catch(function (error) {
        console.error("AiElement lead form error:", error);
        renderFeedback(formState, "error", resolveErrorMessage(error));
      }).finally(function () {
        setSubmitting(formState, false);
      });
    }
    function handleFormSubmit(event) {
      var form = event.target.closest("[data-lead-form]");
      if (!form) return;
      event.preventDefault();
      var formState = cache.leadForms.find(function (item) { return item.form === form; });
      if (formState) submitLead(formState);
    }
    function handleFormInput(event) {
      var form = event.target.closest("[data-lead-form]");
      if (!form) return;
      var formState = cache.leadForms.find(function (item) { return item.form === form; });
      if (!formState) return;
      hideLeadSuccess(formState);
      if (event.target.name === "message" || event.target.name === "contact") clearFieldError(formState, event.target.name);
      renderFeedback(formState, "", "");
    }
    function handleClick(event) {
      var contactLink = event.target.closest("[data-contact-channel]");
      if (contactLink) {
        trackEvent("contact_click", { channel: contactLink.dataset.contactChannel, page: document.body ? document.body.dataset.page || "unknown" : "unknown" });
      }
      var languageButton = event.target.closest("[data-language-switch] [data-lang]");
      if (languageButton) {
        setLanguage(languageButton.dataset.lang);
        return;
      }
      if (event.target.closest("[data-menu-toggle]")) {
        toggleMenu();
        return;
      }
      if (event.target.closest("[data-menu-close]") || event.target.closest("[data-menu-backdrop]") || event.target.closest("[data-mobile-menu] a[href]")) closeMenu();
      var modalTrigger = event.target.closest("[data-open-contact-modal]");
      if (modalTrigger) {
        event.preventDefault();
        openModal(modalTrigger);
        return;
      }
      if (event.target.closest("[data-contact-modal-close]") || event.target.closest("[data-contact-modal-backdrop]")) {
        event.preventDefault();
        closeModal();
      }
    }
    function handleKeydown(event) {
      if (event.key === "Escape") {
        if (state.modalOpen) {
          closeModal();
          return;
        }
        closeMenu();
      }
    }
    function handleResize() { if (window.innerWidth >= DESKTOP_BREAKPOINT) closeMenu(); }
    function init() {
      updateYear();
      populateContactLinks();
      state.locale = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ru";
      state.currentDictionary = applyTranslations(state.locale, cache);
      syncLanguageControls();
      syncMenuLabels();
      syncMenu();
      syncLeadForms();
      applyRuPageFixes(cache, state.locale);
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("submit", handleFormSubmit);
      document.addEventListener("input", handleFormInput);
      window.addEventListener("resize", handleResize);
    }
    return { init: init };
  }
  function start() { createApp().init(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();