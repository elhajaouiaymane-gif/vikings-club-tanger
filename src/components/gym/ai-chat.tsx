'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

function detectLang(text: string): 'ar' | 'fr' | 'es' | 'en' {
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/\b(bonjour|merci|combien|prix|heure|adresse|coach|salle|abonnement|inscription|programme|horaires|contact|bonsoir|salut)\b/i.test(text)) return 'fr';
  if (/\b(hola|gracias|precio|horario|dirección|entrenador|gimnasio|inscripción|ubicación|contacto|adiós|buenos)\b/i.test(text)) return 'es';
  return 'en';
}

const KB = {
  pricing: {
    en: "💰 **Vikings Club Pricing:**\n\n🥉 1 Month — 250 MAD\n🥈 3 Months — 650 MAD (save 100!)\n🥇 6 Months — 1,100 MAD (save 400!)\n🏆 1 Year — 1,800 MAD (save 1,200!)\n\n✅ All plans include: full gym access, locker room & showers\n🔥 First session FREE for new warriors!",
    fr: "💰 **Tarifs Vikings Club :**\n\n🥉 1 Mois — 250 MAD\n🥈 3 Mois — 650 MAD (économisez 100!)\n🥇 6 Mois — 1 100 MAD (économisez 400!)\n🏆 1 An — 1 800 MAD (économisez 1 200!)\n\n✅ Tous les plans incluent : accès complet, vestiaires & douches\n🔥 Première séance GRATUITE pour les nouveaux Vikings !",
    es: "💰 **Precios Vikings Club:**\n\n🥉 1 Mes — 250 MAD\n🥈 3 Meses — 650 MAD (¡ahorra 100!)\n🥇 6 Meses — 1 100 MAD (¡ahorra 400!)\n🏆 1 Año — 1 800 MAD (¡ahorra 1 200!)\n\n✅ Todos los planes incluyen: acceso completo, vestuarios y duchas\n🔥 ¡Primera sesión GRATIS para nuevos guerreros!",
    ar: "💰 **أسعار نادي الفايكنغز:**\n\n🥉 شهر واحد — 250 درهم\n🥈 3 أشهر — 650 درهم (وفر 100!)\n🥇 6 أشهر — 1 100 درهم (وفر 400!)\n🏆 سنة واحدة — 1 800 درهم (وفر 1 200!)\n\n✅ جميع الباقات تشمل: الوصول الكامل، غرف تبديل الملابس والاستحمام\n🔥 أول جلسة مجانية للمقاتلين الجدد!",
  },
  hours: {
    en: "🕐 **Opening Hours:**\n\nOpen 7 days a week!\n⏰ Monday – Sunday: 6:00 AM – 9:00 PM\n\n⚡ Come early morning for the best equipment availability!\n💪 Weekend group classes are popular — arrive early!",
    fr: "🕐 **Horaires d'Ouverture :**\n\nOuvert 7 jours sur 7 !\n⏰ Lundi – Dimanche : 06:00 – 21:00\n\n⚡ Venez tôt le matin pour une meilleure disponibilité !\n💪 Les cours collectifs du week-end sont très demandés !",
    es: "🕐 **Horario de Apertura:**\n\n¡Abierto 7 días a la semana!\n⏰ Lunes – Domingo: 6:00 AM – 9:00 PM\n\n⚡ ¡Ven temprano por la mañana para mejor disponibilidad!\n💪 ¡Las clases grupales del fin de semana son populares!",
    ar: "🕐 **أوقات الفتح:**\n\nمفتوح 7 أيام في الأسبوع!\n⏰ الإثنين – الأحد: 6:00 صباحاً – 9:00 مساءً\n\n⚡ تعال مبكراً صباحاً لأفضل توفر للأجهزة!\n💪 حصص المجموعات نهاية الأسبوع مطلوبة جداً!",
  },
  location: {
    en: "📍 **Our Locations in Tangier:**\n\n🏛️ **Branch 1** — City Center\n🏙️ **Branch 2** — Marshan\n\nBoth branches are fully equipped with:\n• Premium machines & free weights\n• Cardio zones & CrossFit areas\n• Locker rooms & showers\n\n🗺️ Visit us at either location!",
    fr: "📍 **Nos Emplacements à Tanger :**\n\n🏛️ **Branche 1** — Centre-ville\n🏙️ **Branche 2** — Marshan\n\nLes deux branches sont entièrement équipées :\n• Machines premium & poids libres\n• Zones cardio & CrossFit\n• Vestiaires & douches\n\n🗺️ Visitez-nous dans l'une ou l'autre localisation !",
    es: "📍 **Nuestras Ubicaciones en Tánger:**\n\n🏛️ **Sucursal 1** — Centro de la Ciudad\n🏙️ **Sucursal 2** — Marshan\n\nAmbas sucursales están completamente equipadas:\n• Máquinas premium y pesas libres\n• Zonas de cardio y CrossFit\n• Vestuarios y duchas\n\n🗺️ ¡Visítanos en cualquier ubicación!",
    ar: "📍 **فروعنا في طنجة:**\n\n🏛️ **الفرع الأول** — وسط المدينة\n🏙️ **الفرع الثاني** — مرشان\n\nكلا الفرعين مجهزان بالكامل:\n• أجهزة متطورة وأوزان حرة\n• مناطق كارديو وكروسفيت\n• غرف تبديل ملابس واستحمام\n\n🗺️ زورونا في أي من الفرعين!",
  },
  trainer: {
    en: "💪 **Our Expert Coaches:**\n\nWe have professional coaches specializing in:\n🏋️ Musculation & Bodybuilding\n🔥 CrossFit & Functional Training\n🥊 Boxing & Combat Sports\n🏃 Cardio & HIIT\n🎯 Personal Training (1-on-1)\n👥 Group Training\n\nBook a personal session through WhatsApp! 📲",
    fr: "💪 **Nos Coachs Experts :**\n\nDes coachs professionnels spécialisés dans :\n🏋️ Musculation & Bodybuilding\n🔥 CrossFit & Entraînement Fonctionnel\n🥊 Boxe & Sports de Combat\n🏃 Cardio & HIIT\n🎯 Entraînement Personnel (1-à-1)\n👥 Entraînement Collectif\n\nRéservez une séance personnelle via WhatsApp ! 📲",
    es: "💪 **Nuestros Entrenadores Expertos:**\n\nEntrenadores profesionales especializados en:\n🏋️ Musculación y Culturismo\n🔥 CrossFit y Entrenamiento Funcional\n🥊 Boxeo y Deportes de Combate\n🏃 Cardio y HIIT\n🎯 Entrenamiento Personal (1-a-1)\n👥 Entrenamiento Grupal\n\n¡Reserva una sesión personal por WhatsApp! 📲",
    ar: "💪 **مدربونا المحترفون:**\n\nمدربون محترفون متخصصون في:\n🏋️ كمال الأجسام وبناء الجسم\n🔥 كروسفيت والتدريب الوظيفي\n🥊 الملاكمة والرياضات القتالية\n🏃 الكارديو وتمارين HIIT\n🎯 تدريب شخصي (فردي)\n👥 تدريب جماعي\n\nاحجز جلسة شخصية عبر واتساب! 📲",
  },
  classes: {
    en: "📅 **Daily Classes & Programs:**\n\n🔥 CrossFit — High intensity group sessions\n🏋️ Musculation — Strength & hypertrophy training\n🏃 Cardio — Endurance & fat burning\n🥊 Boxing — Technique & conditioning\n💪 HIIT — Maximum calorie burn\n👥 Group Training — Motivating team sessions\n\nCheck our full schedule on the website!",
    fr: "📅 **Cours & Programmes Quotidiens :**\n\n🔥 CrossFit — Séances collectives haute intensité\n🏋️ Musculation — Force & hypertrophie\n🏃 Cardio — Endurance & brûlage de graisses\n🥊 Boxe — Technique & conditionnement\n💪 HIIT — Brûlage calorique maximum\n👥 Entraînement Collectif — Séances motivantes en équipe\n\nConsultez notre programme complet sur le site !",
    es: "📅 **Clases y Programas Diarios:**\n\n🔥 CrossFit — Sesiones grupales de alta intensidad\n🏋️ Musculación — Fuerza e hipertrofia\n🏃 Cardio — Resistencia y quema de grasa\n🥊 Boxeo — Técnica y acondicionamiento\n💪 HIIT — Quema calórica máxima\n👥 Entrenamiento Grupal — Sesiones motivadoras en equipo\n\n¡Consulta nuestro horario completo en el sitio web!",
    ar: "📅 **الحصص والبرامج اليومية:**\n\n🔥 كروسفيت — حصص مكثفة جماعية\n🏋️ كمال الأجسام — تقوية وبناء العضلات\n🏃 كارديو — تحمل وحرق الدهون\n🥊 ملاكمة — تقنيات ولياقة بدنية\n💪 تمارين HIIT — حرق أقصى للسعرات\n👥 تدريب جماعي — حصص محفزة جماعية\n\nتحقق من جدولنا الكامل على الموقع!",
  },
  contact: {
    en: "📞 **Contact Us:**\n\n📱 WhatsApp: +212 611-087382\n📞 Phone: +212 611-087382\n📍 Branch 1: City Center, Tangier\n📍 Branch 2: Marshan, Tangier\n\n💬 Or click the green WhatsApp button below!\n✉️ We typically reply within minutes!",
    fr: "📞 **Contactez-nous :**\n\n📱 WhatsApp : +212 611-087382\n📞 Téléphone : +212 611-087382\n📍 Branche 1 : Centre-ville, Tanger\n📍 Branche 2 : Marshan, Tanger\n\n💬 Ou cliquez sur le bouton vert WhatsApp ci-dessous !\n✉️ Nous répondons généralement en quelques minutes !",
    es: "📞 **Contáctenos:**\n\n📱 WhatsApp: +212 611-087382\n📞 Teléfono: +212 611-087382\n📍 Sucursal 1: Centro de la Ciudad, Tánger\n📍 Sucursal 2: Marshan, Tánger\n\n💬 ¡O haz clic en el botón verde de WhatsApp abajo!\n✉️ ¡Normalmente respondemos en minutos!",
    ar: "📞 **تواصل معنا:**\n\n📱 واتساب: +212 611-087382\n📞 هاتف: +212 611-087382\n📍 الفرع الأول: وسط المدينة، طنجة\n📍 الفرع الثاني: مرشان، طنجة\n\n💬 أو اضغط على زر واتساب الأخضر أدناه!\n✉️ نرد عادةً خلال دقائق!",
  },
  hello: {
    en: "⚔️ **Valhalla awaits, warrior!** Welcome to **Vikings Club Tanger**!\n\nI'm your AI gym assistant. I can help you with:\n💰 Pricing & membership plans\n🕐 Opening hours\n📍 Branch locations\n💪 Trainer & coach info\n📅 Class schedules\n📞 Contact details\n\nWhat would you like to know?",
    fr: "⚔️ **Le Valhalla t'attend, guerrier !** Bienvenue au **Vikings Club Tanger** !\n\nJe suis votre assistant IA. Je peux vous aider avec :\n💰 Tarifs & abonnements\n🕐 Horaires d'ouverture\n📍 Emplacements des branches\n💪 Infos sur les coachs\n📅 Emploi du temps des cours\n📞 Coordonnées\n\nQue souhaitez-vous savoir ?",
    es: "⚔️ ¡**Valhalla te espera, guerrero!** Bienvenido a **Vikings Club Tánger**!\n\nSoy tu asistente IA del gimnasio. Puedo ayudarte con:\n💰 Precios y planes de membresía\n🕐 Horarios de apertura\n📍 Ubicaciones\n💪 Información de entrenadores\n📅 Horarios de clases\n📞 Información de contacto\n\n¿Qué te gustaría saber?",
    ar: "⚔️ **الفالهالا تنتظرك يا محارب!** مرحباً بك في **نادي الفايكنغز طنجة**!\n\nأنا مساعدك الذكي. يمكنني مساعدتك في:\n💰 الأسعار وباقات الاشتراك\n🕐 أوقات الفتح\n📍 مواقع الفروع\n💪 معلومات المدربين\n📅 جدول الحصص\n📞 معلومات الاتصال\n\nماذا تريد أن تعرف؟",
  },
  thanks: {
    en: "You're welcome, warrior! 💪🔥\n\nAnything else about Vikings Club? I'm here 24/7!",
    fr: "De rien, guerrier ! 💪🔥\n\nAutre chose sur Vikings Club ? Je suis là 24h/24 !",
    es: "¡De nada, guerrero! 💪🔥\n\n¿Algo más sobre Vikings Club? ¡Estoy aquí 24/7!",
    ar: "على الرحب والسعة يا محارب! 💪🔥\n\nهل هناك شيء آخر عن نادي الفايكنغز؟ أنا هنا على مدار الساعة!",
  },
  join: {
    en: "⚔️ **Join the Vikings!**\n\n3 easy ways to sign up:\n\n1️⃣ Click any \"Join Now\" button on this page\n2️⃣ Message us directly on WhatsApp: +212 611-087382\n3️⃣ Visit either branch in person\n\n🎁 **Bonus:** First session is FREE for new members!\n🔥 Start your warrior journey today!",
    fr: "⚔️ **Rejoins les Vikings !**\n\n3 façons simples de s'inscrire :\n\n1️⃣ Clique sur n'importe quel bouton \"Rejoindre\"\n2️⃣ Envoie-nous un message WhatsApp : +212 611-087382\n3️⃣ Visite l'une de nos branches\n\n🎁 **Bonus :** Première séance GRATUITE pour les nouveaux !\n🔥 Commence ton parcours de guerrier aujourd'hui !",
    es: "⚔️ ¡**Únete a los Vikingos!**\n\n3 formas fáciles de inscribirse:\n\n1️⃣ Haz clic en cualquier botón \"Únete\"\n2️⃣ Envíanos un mensaje por WhatsApp: +212 611-087382\n3️⃣ Visita cualquiera de nuestras sucursales\n\n🎁 **Bonus:** ¡Primera sesión GRATIS para nuevos miembros!\n🔥 ¡Comienza tu viaje guerrero hoy!",
    ar: "⚔️ **انضم إلى الفايكنغز!**\n\n3 طرق سهلة للتسجيل:\n\n1️⃣ اضغط على أي زر \"انضم الآن\" في هذه الصفحة\n2️⃣ أرسل لنا رسالة واتساب: +212 611-087382\n3️⃣ قم بزيارة أي فرع شخصياً\n\n🎁 **مكافأة:** أول جلسة مجانية للأعضاء الجدد!\n🔥 ابدأ رحلتك كمحارب اليوم!",
  },
  nutrition: {
    en: "🥗 **Nutrition at Vikings Club:**\n\nOur coaches can help you with:\n• Personalized meal plans\n• Pre & post workout nutrition\n• Supplement guidance\n• Weight loss / muscle gain diets\n\nAsk our coaches during your next session! 💪",
    fr: "🥗 **Nutrition au Vikings Club :**\n\nNos coachs peuvent vous aider avec :\n• Plans alimentaires personnalisés\n• Nutrition avant & après l'entraînement\n• Conseils en compléments\n• Régimes perte de poids / prise de masse\n\nDemandez à nos coachs lors de votre prochaine séance ! 💪",
    es: "🥗 **Nutrición en Vikings Club:**\n\nNuestros entrenadores pueden ayudarte con:\n• Planes de comidas personalizados\n• Nutrición pre y post entrenamiento\n• Guía de suplementos\n• Dietas de pérdida de peso / ganancia muscular\n\n¡Pregunta a nuestros entrenadores en tu próxima sesión! 💪",
    ar: "🥗 **التغذية في نادي الفايكنغز:**\n\nمدربونا يمكنهم مساعدتك في:\n• خطط وجبات مخصصة\n• تغذية قبل وبعد التمرين\n• إرشادات المكملات الغذائية\n• حميات فقدان الوزن / بناء العضلات\n\nاسأل مدربونا في جلستك القادمة! 💪",
  },
  parking: {
    en: "🅿️ **Parking:**\n\nBoth branches have parking available nearby!\n\n📍 Branch 1 (City Center) — Street parking available\n📍 Branch 2 (Marshan) — Dedicated parking area\n\nCome train without worry! 🚗",
    fr: "🅿️ **Parking :**\n\nLes deux branches ont du parking à proximité !\n\n📍 Branche 1 (Centre-ville) — Stationnement disponible\n📍 Branche 2 (Marshan) — Zone de parking dédiée\n\nVenez vous entraîner l'esprit tranquille ! 🚗",
    es: "🅿️ **Estacionamiento:**\n\n¡Ambas sucursales tienen estacionamiento cerca!\n\n📍 Sucursal 1 (Centro) — Estacionamiento disponible\n📍 Sucursal 2 (Marshan) — Área de estacionamiento dedicada\n\n¡Ven a entrenar sin preocupaciones! 🚗",
    ar: "🅿️ **مواقف السيارات:**\n\nكلا الفرعين لديهما مواقف قريبة!\n\n📍 الفرع الأول (وسط المدينة) — مواقف متاحة\n📍 الفرع الثاني (مرشان) — منطقة مواقف مخصصة\n\nتعال وتدرب بدون قلق! 🚗",
  },
  fallback: {
    en: "I can help you with:\n\n💰 **Pricing** — ask about plans & prices\n🕐 **Hours** — opening & closing times\n📍 **Locations** — our branch addresses\n💪 **Trainers** — coach information\n📅 **Classes** — schedule & programs\n📞 **Contact** — phone & WhatsApp\n🥗 **Nutrition** — diet & meal plans\n\nTry asking about any of these!",
    fr: "Je peux vous aider avec :\n\n💰 **Tarifs** — plans & prix\n🕐 **Horaires** — heures d'ouverture & fermeture\n📍 **Emplacements** — adresses des branches\n💪 **Coachs** — informations sur les entraîneurs\n📅 **Cours** — programme & horaires\n📞 **Contact** — téléphone & WhatsApp\n🥗 **Nutrition** — régimes & plans alimentaires\n\nEssayez de poser une question sur l'un de ces sujets !",
    es: "Puedo ayudarte con:\n\n💰 **Precios** — planes y tarifas\n🕐 **Horarios** — horarios de apertura\n📍 **Ubicaciones** — direcciones de sucursales\n💪 **Entrenadores** — información de coaches\n📅 **Clases** — horarios y programas\n📞 **Contacto** — teléfono y WhatsApp\n🥗 **Nutrición** — dietas y planes de comidas\n\n¡Intenta preguntar sobre cualquiera de estos temas!",
    ar: "يمكنني مساعدتك في:\n\n💰 **الأسعار** — الباقات والأسعار\n🕐 **الأوقات** — أوقات الفتح والإغلاق\n📍 **المواقع** — عناوين الفروع\n💪 **المدربون** — معلومات المدربين\n📅 **الحصص** — الجدول والبرامج\n📞 **الاتصال** — الهاتف وواتساب\n🥗 **التغذية** — الحميات وخطط الوجبات\n\nحاول السؤال عن أي من هذه المواضيع!",
  },
};

function getAIResponse(input: string): string {
  var lower = input.toLowerCase().trim();
  var lang = detectLang(input);

  if (/price|prix|سعر|tarif|كلفة|cost|plan|abonnement|باقة|suscripción/i.test(lower)) return KB.pricing[lang];
  if (/hours|heure|ساعات|ouverture|open|ferm|horario|abierto/i.test(lower)) return KB.hours[lang];
  if (/location|adresse|عنوان|où|where|branch|فروع|ubicación|dirección/i.test(lower)) return KB.location[lang];
  if (/trainer|coach|مدرب|entraineur|personal|تدريب/i.test(lower)) return KB.trainer[lang];
  if (/class|cours|دروس|program|تدريب|schedule|horair|clase/i.test(lower)) return KB.classes[lang];
  if (/contact|whatsapp|اتصل|phone|call|رقم|تلفون|contáctenos/i.test(lower)) return KB.contact[lang];
  if (/nutrition|food|diet|regime|régime|تغذية|حمية|nutrición|alimentación/i.test(lower)) return KB.nutrition[lang];
  if (/parking|voiture|سيارة|estacionamiento|coche/i.test(lower)) return KB.parking[lang];
  if (/hello|hi|hey|salut|مرحب|bonjour|salam|hola|أهلا/i.test(lower)) return KB.hello[lang];
  if (/thank|thanks|شكر|merci|gracias|شكرا/i.test(lower)) return KB.thanks[lang];
  if (/join|sign|inscri|subscribe|انضم|سجل|abonn|regis/i.test(lower)) return KB.join[lang];

  return KB.fallback[lang];
}

var quickSuggestions = [
  { icon: '💰', key: 'pricing', en: 'Pricing', fr: 'Tarifs', es: 'Precios', ar: 'الأسعار' },
  { icon: '🕐', key: 'hours', en: 'Hours', fr: 'Horaires', es: 'Horarios', ar: 'الأوقات' },
  { icon: '📍', key: 'location', en: 'Locations', fr: 'Adresses', es: 'Ubicación', ar: 'المواقع' },
  { icon: '📅', key: 'classes', en: 'Classes', fr: 'Cours', es: 'Clases', ar: 'الحصص' },
  { icon: '💪', key: 'trainer', en: 'Trainers', fr: 'Coachs', es: 'Entrenadores', ar: 'المدربون' },
  { icon: '📞', key: 'contact', en: 'Contact', fr: 'Contact', es: 'Contacto', ar: 'الاتصال' },
];

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey warrior! ⚔️ I'm the Vikings Club AI assistant. How can I help you today?", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const handleSend = useCallback((text?: string) => {
    const msgText = (text || input).trim();
    if (!msgText) return;

    const userMsg: Message = { id: Date.now(), text: msgText, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, text: getAIResponse(msgText), sender: 'ai' };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 600 + Math.random() * 500);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickSuggestion = (suggestion: typeof quickSuggestions[0]) => {
    const lang = detectLang(input || 'en');
    const text = suggestion[lang] || suggestion.en;
    handleSend(text);
  };

  return (
    <div
      className={'fixed bottom-36 right-4 md:bottom-24 md:right-6 z-50 transition-all duration-500 ' + (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')}
    >
      {/* Chat Panel */}
      <div
        className={
          'absolute bottom-14 md:bottom-16 right-0 w-[320px] sm:w-[380px] max-h-[480px] md:max-h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-300 ease-out ' +
          (open && !minimized
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none')
        }
      >
        {/* Header */}
        <div className="glass-dark px-4 py-3 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full btn-primary flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Vikings Assistant</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online · 4 languages
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setMinimized(true)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" aria-label="Minimize"><Minus className="w-3.5 h-3.5" /></button>
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" aria-label="Close chat"><X className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="glass-dark flex-1 overflow-y-auto p-4 space-y-3 max-h-[280px] md:max-h-[320px] min-h-[150px]">
          {messages.map((msg) => (
            <div key={msg.id} className={'flex gap-2 ' + (msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row')}>
              <div className={'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ' + (msg.sender === 'ai' ? 'btn-primary text-white' : 'bg-white/10 text-white/70')}>
                {msg.sender === 'ai' ? 'V' : 'U'}
              </div>
              <div className={'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ' + (msg.sender === 'user' ? 'btn-primary text-white rounded-tr-md' : 'bg-card text-card-foreground rounded-tl-md border border-white/5')}>
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full btn-primary flex items-center justify-center shrink-0 text-xs font-bold text-white">V</div>
              <div className="bg-card rounded-2xl rounded-tl-md border border-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {messages.length <= 3 && !typing && (
          <div className="glass-dark px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide border-t border-white/5">
            {quickSuggestions.map((s) => (
              <button
                key={s.key}
                onClick={() => handleQuickSuggestion(s)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{s.icon}</span>
                <span>{s.en}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="glass-dark px-3 py-3 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything... (EN/FR/ES/AR)"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white shrink-0 transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-40 disabled:hover:shadow-none active:scale-95 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-white/20 mt-1.5 text-center">Powered by Vikings Club Tanger · EN / FR / ES / AR 🌍</p>
        </div>
      </div>

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); }}
          className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full btn-primary text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/50 active:scale-95 cursor-pointer"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
        </button>
      )}

      {/* Minimized chip */}
      {open && minimized && (
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-dark text-xs md:text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-white/5 cursor-pointer"
          aria-label="Expand chat"
        >
          <MessageCircle className="w-4 h-4 text-primary" />
          <span>Vikings Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}
    </div>
  );
}