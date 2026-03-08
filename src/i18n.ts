import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    common: {
      nav: { services: "Services", work: "Work", pricing: "Pricing", contact: "Contact", start: "Start Project" },
      hero: { badge: "✦ DIGITAL CREATIVE STUDIO ✦", line1: "We don't build", line2: "websites.", line3: "We build", line4: "experiences.", cta: "START YOUR PROJECT" },
      services: {
        label: "✦ WHAT WE CRAFT ✦", title: "Our", titleAccent: "Services", sub: "Every project is a new universe to build.", hover: "HOVER TO DISCOVER", startNow: "START NOW →",
        items: {
          animations: { title: "Animations", sub: "Motion that tells your story", back: "Custom animations that breathe life into your brand — from micro-interactions to full cinematic motion experiences." },
          presentations: { title: "Presentations", sub: "Slides that close deals", back: "Interactive, cinematic presentations that make your audience remember every word you say." },
          backgrounds: { title: "Backgrounds", sub: "Worlds behind your content", back: "Animated, immersive backgrounds that transform any space — from streams to events to websites." },
          websites: { title: "Websites", sub: "Digital experiences, not pages", back: "Full-stack websites built with cutting-edge tech — fast, beautiful, and impossible to forget." },
          uiux: { title: "UI / UX", sub: "Design that feels inevitable", back: "Interfaces designed with obsessive attention to detail — every pixel, every interaction, every feeling." },
          custom: { title: "Something Else?", sub: "Your vision, our craft", back: "Have a wild idea? We love those. Tell us what you need and we'll make it real." },
        }
      },
      work: {
        label: "✦ INTERACTIVE SHOWCASE ✦", title: "Don't just look.", titleAccent: "Experience.",
        sub: "Eight live demos. Built with the same obsession we bring to every client project.",
        launch: "CLICK TO LAUNCH", inactive: "INACTIVE", live: "LIVE",
        cta: "START YOUR PROJECT →", ctaSub: "Imagine this — but built for",
        demos: {
          particles: { title: "Particle Network", category: "Animation", desc: "120 interactive particles react to your cursor — connecting and repelling in real time." },
          glitch: { title: "Glitch Typography", category: "Motion Design", desc: "Text that breaks reality on command. Click and watch it dissolve." },
          liquid: { title: "Liquid Cursor", category: "UI Effect", desc: "A fluid purple trail follows every move — like paint on dark water." },
          tilt: { title: "3D Card Tilt", category: "UI / UX", desc: "Cards with real depth — light shifts as you move, revealing dimension." },
          morph: { title: "Morphing Gradient", category: "Visual Design", desc: "Organic fluid orbs drifting through each other — infinite and alive." },
          audio: { title: "Audio Visualizer", category: "Motion / Sound", desc: "32 bars that pulse with imaginary music. The rhythm is the design." },
          typewriter: { title: "Typewriter Effect", category: "Typography", desc: "Five phrases. One cursor. The poetry of appearing text." },
          palette: { title: "Color Palettes", category: "Brand Design", desc: "Five hand-crafted dark palettes. Each one a mood, a world, a story." },
        },
        typewriterPhrases: ["We build experiences.", "Motion that captivates.", "Design that converts.", "Code that performs.", "Art that endures."],
        clickToPlay: "CLICK TO PLAY", playing: "PLAYING — CLICK TO PAUSE", moveYourCursor: "MOVE YOUR CURSOR", hoverCard: "HOVER THE CARD", clickToGlitch: "CLICK TO GLITCH", liveRender: "LIVE RENDER", clickDots: "CLICK DOTS TO SWITCH",
      },
      stats: {
        label: "✦ BY THE NUMBERS ✦", title: "The work", titleAccent: "speaks.",
        items: [
          { label: "Projects Delivered", sub: "across 18 countries" },
          { label: "Client Satisfaction", sub: "from post-project surveys" },
          { label: "Eyes Reached", sub: "through our client work" },
          { label: "In the Craft", sub: "building digital experiences" },
        ]
      },
      process: {
        label: "✦ HOW WE WORK ✦", title: "The process behind", titleAccent: "the magic.",
        sub: "Every project follows a ritual. Refined over hundreds of deliveries.",
        steps: [
          { title: "Discovery", desc: "We start with a deep conversation — understanding your brand, your audience, and the feeling you want to create. No briefs. Just real dialogue.", duration: "1–2 days" },
          { title: "Concepting", desc: "We sketch the universe. Moodboards, motion references, visual directions. You choose what resonates — then we go all in.", duration: "2–3 days" },
          { title: "Creation", desc: "This is where the magic happens. Frame by frame, pixel by pixel, line by line — built with precision and obsession.", duration: "3–7 days" },
          { title: "Refinement", desc: "We iterate until it's exactly right. Your feedback shapes everything. We don't stop until it feels inevitable.", duration: "1–3 days" },
          { title: "Delivery", desc: "Clean files, clear handoff, zero friction. And we stay available after — because great partnerships don't end at delivery.", duration: "1 day" },
        ]
      },
      tools: { label: "✦ THE ARSENAL ✦", title: "Built with", titleAccent: "the best." },
      pricing: {
        label: "✦ INVESTMENT ✦", title: "What's your", titleAccent: "vision worth?", sub: "Every project is unique.", popular: "MOST POPULAR", startingFrom: "STARTING FROM", customProject: "CUSTOM PROJECT", talkScope: "Let's talk scope ✦", selected: "service selected", selectedPlural: "services selected", varies: "Final price varies by complexity", getQuote: "GET QUOTE →", selectPrompt: "Select services to get a quote", buildLabel: "✦ BUILD YOUR OWN ✦", buildTitle: "Pick what you need",
        plans: { basic: { name: "Basic", sub: "For individuals & small projects", cta: "Start Basic" }, pro: { name: "Pro", sub: "For brands that want to stand out", cta: "Start Pro" }, custom: { name: "Custom", sub: "Full creative partnership", cta: "Let's Talk" } },
        services: { animation: "Animation", presentation: "Presentation", background: "Animated Background", website: "Full Website", uiux: "UI / UX Design", custom: "Something Custom" },
      },
      testimonials: { label: "✦ WHAT CLIENTS SAY ✦", title: "Words from those who", titleAccent: "experienced it." },
      contact: { label: "✦ GET IN TOUCH ✦", title: "Ready to build something", titleAccent: "extraordinary?", sub: "Every great project starts with a conversation.", whatsapp: "WhatsApp", whatsappSub: "Fastest response", email: "Email", phone: "Phone", startProject: "START YOUR PROJECT" },
      footer: { tagline: "We don't build websites.\nWe build experiences.", navigate: "NAVIGATE", contact: "CONTACT", rights: "ALL RIGHTS RESERVED.", magic: "Crafting digital magic ✦" },
      preloader: { loading: "LOADING EXPERIENCE" },
    }
  },
  ar: {
    common: {
      nav: { services: "الخدمات", work: "أعمالنا", pricing: "الأسعار", contact: "تواصل", start: "ابدأ مشروعك" },
      hero: { badge: "✦ استوديو إبداعي رقمي ✦", line1: "لا نبني", line2: "مواقع.", line3: "نبني", line4: "تجارب.", cta: "ابدأ مشروعك" },
      services: {
        label: "✦ ما نصنعه ✦", title: "خدماتنا", titleAccent: "", sub: "كل مشروع عالم جديد نبنيه.", hover: "مرر للاكتشاف", startNow: "ابدأ الآن →",
        items: {
          animations: { title: "الأنيميشن", sub: "حركة تحكي قصتك", back: "أنيميشن مخصص يبث الحياة في علامتك — من التفاعلات الصغيرة إلى التجارب السينمائية الكاملة." },
          presentations: { title: "العروض التقديمية", sub: "شرائح تُغلق الصفقات", back: "عروض تقديمية تفاعلية وسينمائية تجعل جمهورك يتذكر كل كلمة تقولها." },
          backgrounds: { title: "الخلفيات", sub: "عوالم خلف محتواك", back: "خلفيات متحركة وغامرة تحوّل أي مكان — من البث المباشر إلى الفعاليات والمواقع." },
          websites: { title: "المواقع", sub: "تجارب رقمية لا مجرد صفحات", back: "مواقع متكاملة مبنية بأحدث التقنيات — سريعة وجميلة ولا تُنسى." },
          uiux: { title: "واجهات المستخدم", sub: "تصميم يبدو حتمياً", back: "واجهات مصممة باهتمام وسواس بالتفاصيل — كل بكسل، كل تفاعل، كل إحساس." },
          custom: { title: "شيء آخر؟", sub: "رؤيتك، حرفتنا", back: "لديك فكرة جنونية؟ نحن نحبها. أخبرنا بما تحتاج وسنجعله حقيقة." },
        }
      },
      work: {
        label: "✦ عرض تفاعلي ✦", title: "لا تكتفِ بالنظر.", titleAccent: "جرّب.",
        sub: "ثمانية عروض حية. مبنية بنفس الهوس الذي نجلبه لكل مشروع.",
        launch: "انقر للتشغيل", inactive: "غير نشط", live: "مباشر",
        cta: "ابدأ مشروعك →", ctaSub: "تخيل هذا — لكن مبني من أجلك",
        demos: {
          particles: { title: "شبكة الجزيئات", category: "أنيميشن", desc: "120 جسيم تفاعلي يستجيب لمؤشرك — تتصل وتتنافر في الوقت الفعلي." },
          glitch: { title: "الخط المشوه", category: "تصميم حركي", desc: "نص يكسر الواقع عند الأمر. انقر وشاهده يذوب." },
          liquid: { title: "مؤشر سائل", category: "تأثير واجهة", desc: "أثر بنفسجي سائل يتبع كل حركة — كالطلاء على الماء المظلم." },
          tilt: { title: "بطاقة ثلاثية الأبعاد", category: "واجهة المستخدم", desc: "بطاقات بعمق حقيقي — الضوء يتحول بتحركك، يكشف الأبعاد." },
          morph: { title: "تدرج متحول", category: "تصميم بصري", desc: "كرات سائلة عضوية تتحرك عبر بعضها — لا نهائية وحية." },
          audio: { title: "محلل صوتي", category: "حركة وصوت", desc: "32 شريطاً ينبض بموسيقى خيالية. الإيقاع هو التصميم." },
          typewriter: { title: "تأثير الآلة الكاتبة", category: "طباعة", desc: "خمس عبارات. مؤشر واحد. شعر النص الظاهر." },
          palette: { title: "لوحات الألوان", category: "تصميم العلامة", desc: "خمس لوحات داكنة مصنوعة يدوياً. كل واحدة حالة وعالم وقصة." },
        },
        typewriterPhrases: ["نبني تجارب.", "حركة تأسر الانتباه.", "تصميم يُحوّل.", "كود يؤدي.", "فن يدوم."],
        clickToPlay: "انقر للتشغيل", playing: "يعزف — انقر للإيقاف", moveYourCursor: "حرك مؤشرك", hoverCard: "مرر على البطاقة", clickToGlitch: "انقر للتشويه", liveRender: "عرض مباشر", clickDots: "انقر النقاط للتبديل",
      },
      stats: {
        label: "✦ بالأرقام ✦", title: "العمل", titleAccent: "يتكلم.",
        items: [
          { label: "مشروع تم تسليمه", sub: "في 18 دولة" },
          { label: "رضا العملاء", sub: "من استطلاعات ما بعد المشروع" },
          { label: "عين وصلت إليها", sub: "من خلال أعمال عملائنا" },
          { label: "سنوات في الحرفة", sub: "نبني تجارب رقمية" },
        ]
      },
      process: {
        label: "✦ كيف نعمل ✦", title: "العملية خلف", titleAccent: "السحر.",
        sub: "كل مشروع يتبع طقساً. مُصقّل عبر مئات التسليمات.",
        steps: [
          { title: "الاكتشاف", desc: "نبدأ بمحادثة عميقة — نفهم علامتك وجمهورك والشعور الذي تريد إيجاده. لا إحاطات. فقط حوار حقيقي.", duration: "1–2 أيام" },
          { title: "التصور", desc: "نرسم الكون. لوحات المزاج، ومراجع الحركة، والاتجاهات البصرية. تختار ما يلامسك — ثم ننطلق بكل قوة.", duration: "2–3 أيام" },
          { title: "الإبداع", desc: "هنا تحدث السحر. إطاراً إطاراً، بكسلاً بكسل، سطراً سطراً — مبني بدقة وهوس.", duration: "3–7 أيام" },
          { title: "الصقل", desc: "نكرر حتى يكون صحيحاً تماماً. ملاحظاتك تشكل كل شيء. لا نتوقف حتى يبدو حتمياً.", duration: "1–3 أيام" },
          { title: "التسليم", desc: "ملفات نظيفة، تسليم واضح، لا احتكاك. ونبقى متاحين بعد ذلك — لأن الشراكات العظيمة لا تنتهي عند التسليم.", duration: "يوم واحد" },
        ]
      },
      tools: { label: "✦ الترسانة ✦", title: "مبني بـ", titleAccent: "الأفضل." },
      pricing: {
        label: "✦ الاستثمار ✦", title: "ما قيمة", titleAccent: "رؤيتك؟", sub: "كل مشروع فريد.", popular: "الأكثر شيوعاً", startingFrom: "يبدأ من", customProject: "مشروع مخصص", talkScope: "لنتحدث عن النطاق ✦", selected: "خدمة مختارة", selectedPlural: "خدمات مختارة", varies: "السعر النهائي يختلف حسب التعقيد", getQuote: "احصل على عرض سعر →", selectPrompt: "اختر الخدمات للحصول على عرض سعر", buildLabel: "✦ ابنِ خطتك ✦", buildTitle: "اختر ما تحتاجه",
        plans: { basic: { name: "أساسي", sub: "للأفراد والمشاريع الصغيرة", cta: "ابدأ الأساسي" }, pro: { name: "احترافي", sub: "للعلامات التي تريد التميز", cta: "ابدأ الاحترافي" }, custom: { name: "مخصص", sub: "شراكة إبداعية كاملة", cta: "لنتحدث" } },
        services: { animation: "أنيميشن", presentation: "عرض تقديمي", background: "خلفية متحركة", website: "موقع كامل", uiux: "تصميم واجهات", custom: "شيء مخصص" },
      },
      testimonials: { label: "✦ ماذا يقول العملاء ✦", title: "كلمات ممن", titleAccent: "جربوا التجربة." },
      contact: { label: "✦ تواصل معنا ✦", title: "مستعد لبناء شيء", titleAccent: "استثنائي؟", sub: "كل مشروع عظيم يبدأ بمحادثة.", whatsapp: "واتساب", whatsappSub: "أسرع رد", email: "البريد الإلكتروني", phone: "الهاتف", startProject: "ابدأ مشروعك" },
      footer: { tagline: "لا نبني مواقع.\nنبني تجارب.", navigate: "التنقل", contact: "التواصل", rights: "جميع الحقوق محفوظة.", magic: "نصنع السحر الرقمي ✦" },
      preloader: { loading: "جاري التحميل" },
    }
  },
  fr: {
    common: {
      nav: { services: "Services", work: "Réalisations", pricing: "Tarifs", contact: "Contact", start: "Démarrer" },
      hero: { badge: "✦ STUDIO CRÉATIF DIGITAL ✦", line1: "Nous ne construisons pas", line2: "des sites.", line3: "Nous construisons des", line4: "expériences.", cta: "DÉMARRER VOTRE PROJET" },
      services: {
        label: "✦ CE QUE NOUS CRÉONS ✦", title: "Nos", titleAccent: "Services", sub: "Chaque projet est un nouvel univers.", hover: "SURVOLEZ POUR DÉCOUVRIR", startNow: "COMMENCER →",
        items: {
          animations: { title: "Animations", sub: "Le mouvement raconte votre histoire", back: "Des animations sur mesure qui donnent vie à votre marque — des micro-interactions aux expériences cinématiques complètes." },
          presentations: { title: "Présentations", sub: "Des slides qui concluent", back: "Des présentations interactives et cinématiques qui font que votre audience se souvient de chaque mot." },
          backgrounds: { title: "Arrière-plans", sub: "Des mondes derrière votre contenu", back: "Des arrière-plans animés et immersifs qui transforment n'importe quel espace — des streams aux événements aux sites web." },
          websites: { title: "Sites Web", sub: "Des expériences, pas des pages", back: "Des sites full-stack construits avec les dernières technologies — rapides, beaux et impossibles à oublier." },
          uiux: { title: "UI / UX", sub: "Un design qui semble inévitable", back: "Des interfaces conçues avec une attention obsessionnelle aux détails — chaque pixel, chaque interaction, chaque sensation." },
          custom: { title: "Autre chose?", sub: "Votre vision, notre art", back: "Vous avez une idée folle? Nous adorons ça. Dites-nous ce dont vous avez besoin et nous le réaliserons." },
        }
      },
      work: {
        label: "✦ VITRINE INTERACTIVE ✦", title: "Ne regardez pas.", titleAccent: "Vivez l'expérience.",
        sub: "Huit démos en direct. Construites avec le même soin que chaque projet client.",
        launch: "CLIQUER POUR LANCER", inactive: "INACTIF", live: "EN DIRECT",
        cta: "DÉMARRER VOTRE PROJET →", ctaSub: "Imaginez cela — conçu pour vous",
        demos: {
          particles: { title: "Réseau de Particules", category: "Animation", desc: "120 particules interactives réagissent à votre curseur — se connectant et se repoussant en temps réel." },
          glitch: { title: "Typographie Glitch", category: "Motion Design", desc: "Du texte qui brise la réalité sur commande. Cliquez et regardez-le se dissoudre." },
          liquid: { title: "Curseur Liquide", category: "Effet UI", desc: "Une traînée violette fluide suit chaque mouvement — comme de la peinture sur une eau sombre." },
          tilt: { title: "Carte 3D Tilt", category: "UI / UX", desc: "Des cartes avec une vraie profondeur — la lumière change à votre mouvement, révélant la dimension." },
          morph: { title: "Dégradé Morphing", category: "Design Visuel", desc: "Des orbes fluides organiques dérivant les uns à travers les autres — infinis et vivants." },
          audio: { title: "Visualiseur Audio", category: "Motion / Son", desc: "32 barres pulsant avec une musique imaginaire. Le rythme est le design." },
          typewriter: { title: "Effet Machine à Écrire", category: "Typographie", desc: "Cinq phrases. Un curseur. La poésie du texte qui apparaît." },
          palette: { title: "Palettes de Couleurs", category: "Design de Marque", desc: "Cinq palettes sombres faites à la main. Chacune une humeur, un monde, une histoire." },
        },
        typewriterPhrases: ["Nous créons des expériences.", "Le mouvement qui captive.", "Le design qui convertit.", "Le code qui performe.", "L'art qui dure."],
        clickToPlay: "CLIQUER POUR JOUER", playing: "EN LECTURE — CLIQUER POUR PAUSE", moveYourCursor: "BOUGEZ VOTRE CURSEUR", hoverCard: "SURVOLEZ LA CARTE", clickToGlitch: "CLIQUER POUR GLITCH", liveRender: "RENDU EN DIRECT", clickDots: "CLIQUER LES POINTS POUR CHANGER",
      },
      stats: {
        label: "✦ EN CHIFFRES ✦", title: "Le travail", titleAccent: "parle.",
        items: [
          { label: "Projets Livrés", sub: "dans 18 pays" },
          { label: "Satisfaction Client", sub: "des enquêtes post-projet" },
          { label: "Yeux Atteints", sub: "via notre travail client" },
          { label: "Dans le Métier", sub: "à créer des expériences digitales" },
        ]
      },
      process: {
        label: "✦ COMMENT NOUS TRAVAILLONS ✦", title: "Le processus derrière", titleAccent: "la magie.",
        sub: "Chaque projet suit un rituel. Affiné sur des centaines de livraisons.",
        steps: [
          { title: "Découverte", desc: "Nous commençons par une conversation approfondie — comprendre votre marque, votre audience et la sensation que vous voulez créer.", duration: "1–2 jours" },
          { title: "Conception", desc: "Nous esquissons l'univers. Moodboards, références motion, directions visuelles. Vous choisissez ce qui résonne — puis nous fonçons.", duration: "2–3 jours" },
          { title: "Création", desc: "C'est là que la magie opère. Image par image, pixel par pixel, ligne par ligne — construit avec précision et obsession.", duration: "3–7 jours" },
          { title: "Affinage", desc: "Nous itérons jusqu'à ce que ce soit parfait. Vos retours façonnent tout. Nous ne nous arrêtons pas avant que ça semble inévitable.", duration: "1–3 jours" },
          { title: "Livraison", desc: "Fichiers propres, transfert clair, zéro friction. Et nous restons disponibles après — car les grandes collaborations ne se terminent pas à la livraison.", duration: "1 jour" },
        ]
      },
      tools: { label: "✦ L'ARSENAL ✦", title: "Construit avec", titleAccent: "le meilleur." },
      pricing: {
        label: "✦ INVESTISSEMENT ✦", title: "Quelle est la valeur de", titleAccent: "votre vision?", sub: "Chaque projet est unique.", popular: "LE PLUS POPULAIRE", startingFrom: "À PARTIR DE", customProject: "PROJET PERSONNALISÉ", talkScope: "Parlons du périmètre ✦", selected: "service sélectionné", selectedPlural: "services sélectionnés", varies: "Prix variable selon la complexité", getQuote: "OBTENIR UN DEVIS →", selectPrompt: "Sélectionnez des services", buildLabel: "✦ CONSTRUISEZ LE VÔTRE ✦", buildTitle: "Choisissez ce dont vous avez besoin",
        plans: { basic: { name: "Basique", sub: "Pour les particuliers", cta: "Commencer" }, pro: { name: "Pro", sub: "Pour les marques ambitieuses", cta: "Commencer Pro" }, custom: { name: "Personnalisé", sub: "Partenariat créatif complet", cta: "Parlons-en" } },
        services: { animation: "Animation", presentation: "Présentation", background: "Arrière-plan Animé", website: "Site Complet", uiux: "Design UI / UX", custom: "Quelque Chose de Personnalisé" },
      },
      testimonials: { label: "✦ CE QUE DISENT LES CLIENTS ✦", title: "Des mots de ceux qui", titleAccent: "ont vécu l'expérience." },
      contact: { label: "✦ CONTACTEZ-NOUS ✦", title: "Prêt à construire quelque chose", titleAccent: "d'extraordinaire?", sub: "Chaque grand projet commence par une conversation.", whatsapp: "WhatsApp", whatsappSub: "Réponse rapide", email: "Email", phone: "Téléphone", startProject: "DÉMARRER VOTRE PROJET" },
      footer: { tagline: "Nous ne construisons pas des sites.\nNous construisons des expériences.", navigate: "NAVIGATION", contact: "CONTACT", rights: "TOUS DROITS RÉSERVÉS.", magic: "Créer la magie digitale ✦" },
      preloader: { loading: "CHARGEMENT" },
    }
  },
  de: {
    common: {
      nav: { services: "Leistungen", work: "Arbeiten", pricing: "Preise", contact: "Kontakt", start: "Projekt starten" },
      hero: { badge: "✦ DIGITALES KREATIVSTUDIO ✦", line1: "Wir bauen keine", line2: "Websites.", line3: "Wir bauen", line4: "Erlebnisse.", cta: "PROJEKT STARTEN" },
      services: {
        label: "✦ WAS WIR ERSCHAFFEN ✦", title: "Unsere", titleAccent: "Leistungen", sub: "Jedes Projekt ist ein neues Universum.", hover: "HOVER ZUM ENTDECKEN", startNow: "JETZT STARTEN →",
        items: {
          animations: { title: "Animationen", sub: "Bewegung erzählt Ihre Geschichte", back: "Maßgeschneiderte Animationen, die Ihre Marke zum Leben erwecken — von Micro-Interaktionen bis zu filmischen Erlebnissen." },
          presentations: { title: "Präsentationen", sub: "Folien, die Deals abschließen", back: "Interaktive, filmische Präsentationen, die Ihr Publikum an jedes Wort erinnern lassen." },
          backgrounds: { title: "Hintergründe", sub: "Welten hinter Ihrem Inhalt", back: "Animierte, immersive Hintergründe, die jeden Raum transformieren — von Streams bis zu Websites." },
          websites: { title: "Websites", sub: "Digitale Erlebnisse, keine Seiten", back: "Full-Stack-Websites mit modernster Technologie — schnell, schön und unvergesslich." },
          uiux: { title: "UI / UX", sub: "Design, das unvermeidlich wirkt", back: "Interfaces mit obsessiver Liebe zum Detail — jedes Pixel, jede Interaktion, jedes Gefühl." },
          custom: { title: "Etwas anderes?", sub: "Ihre Vision, unser Handwerk", back: "Haben Sie eine verrückte Idee? Wir lieben das. Sagen Sie uns, was Sie brauchen." },
        }
      },
      work: {
        label: "✦ INTERAKTIVE PRÄSENTATION ✦", title: "Nicht nur schauen.", titleAccent: "Erleben.",
        sub: "Acht Live-Demos. Mit derselben Obsession gebaut wie jedes Kundenprojekt.",
        launch: "KLICKEN ZUM STARTEN", inactive: "INAKTIV", live: "LIVE",
        cta: "PROJEKT STARTEN →", ctaSub: "Stellen Sie sich das vor — für Sie gebaut",
        demos: {
          particles: { title: "Partikelnetzwerk", category: "Animation", desc: "120 interaktive Partikel reagieren auf Ihren Cursor — verbinden und abstoßen in Echtzeit." },
          glitch: { title: "Glitch-Typografie", category: "Motion Design", desc: "Text, der die Realität auf Befehl bricht. Klicken Sie und sehen Sie ihn sich auflösen." },
          liquid: { title: "Flüssiger Cursor", category: "UI-Effekt", desc: "Eine flüssige lila Spur folgt jeder Bewegung — wie Farbe auf dunklem Wasser." },
          tilt: { title: "3D-Karte Tilt", category: "UI / UX", desc: "Karten mit echter Tiefe — Licht verschiebt sich mit Ihrer Bewegung." },
          morph: { title: "Morphender Gradient", category: "Visuelles Design", desc: "Organische flüssige Kugeln gleiten durcheinander — unendlich und lebendig." },
          audio: { title: "Audio-Visualisierer", category: "Motion / Sound", desc: "32 Balken pulsieren mit imaginärer Musik. Der Rhythmus ist das Design." },
          typewriter: { title: "Schreibmaschinen-Effekt", category: "Typografie", desc: "Fünf Sätze. Ein Cursor. Die Poesie des erscheinenden Textes." },
          palette: { title: "Farbpaletten", category: "Markendesign", desc: "Fünf handgefertigte dunkle Paletten. Jede eine Stimmung, eine Welt, eine Geschichte." },
        },
        typewriterPhrases: ["Wir bauen Erlebnisse.", "Bewegung, die fesselt.", "Design, das konvertiert.", "Code, der performt.", "Kunst, die bleibt."],
        clickToPlay: "KLICKEN ZUM ABSPIELEN", playing: "SPIELT — KLICKEN ZUM PAUSIEREN", moveYourCursor: "BEWEGEN SIE IHREN CURSOR", hoverCard: "KARTE HOVERN", clickToGlitch: "KLICKEN FÜR GLITCH", liveRender: "LIVE-RENDERING", clickDots: "PUNKTE KLICKEN ZUM WECHSELN",
      },
      stats: {
        label: "✦ IN ZAHLEN ✦", title: "Die Arbeit", titleAccent: "spricht.",
        items: [
          { label: "Projekte Geliefert", sub: "in 18 Ländern" },
          { label: "Kundenzufriedenheit", sub: "aus Post-Projekt-Umfragen" },
          { label: "Erreichte Augen", sub: "durch unsere Kundenarbeit" },
          { label: "Im Handwerk", sub: "digitale Erlebnisse schaffen" },
        ]
      },
      process: {
        label: "✦ WIE WIR ARBEITEN ✦", title: "Der Prozess hinter", titleAccent: "der Magie.",
        sub: "Jedes Projekt folgt einem Ritual. Verfeinert über Hunderte von Lieferungen.",
        steps: [
          { title: "Entdeckung", desc: "Wir beginnen mit einem tiefen Gespräch — Ihre Marke, Ihr Publikum und das Gefühl, das Sie erschaffen wollen.", duration: "1–2 Tage" },
          { title: "Konzeption", desc: "Wir skizzieren das Universum. Moodboards, Motion-Referenzen, visuelle Richtungen. Sie wählen, was resoniert.", duration: "2–3 Tage" },
          { title: "Erstellung", desc: "Hier geschieht die Magie. Bild für Bild, Pixel für Pixel, Zeile für Zeile — mit Präzision und Obsession gebaut.", duration: "3–7 Tage" },
          { title: "Verfeinerung", desc: "Wir iterieren, bis es genau richtig ist. Ihr Feedback gestaltet alles. Wir hören nicht auf, bis es unvermeidlich wirkt.", duration: "1–3 Tage" },
          { title: "Lieferung", desc: "Saubere Dateien, klare Übergabe, keine Reibung. Und wir bleiben danach verfügbar.", duration: "1 Tag" },
        ]
      },
      tools: { label: "✦ DAS ARSENAL ✦", title: "Gebaut mit", titleAccent: "dem Besten." },
      pricing: {
        label: "✦ INVESTITION ✦", title: "Was ist Ihre", titleAccent: "Vision wert?", sub: "Jedes Projekt ist einzigartig.", popular: "AM BELIEBTESTEN", startingFrom: "AB", customProject: "INDIVIDUELLES PROJEKT", talkScope: "Sprechen wir über den Umfang ✦", selected: "Service ausgewählt", selectedPlural: "Services ausgewählt", varies: "Endpreis variiert je nach Komplexität", getQuote: "ANGEBOT ANFRAGEN →", selectPrompt: "Services auswählen", buildLabel: "✦ EIGENES PAKET ✦", buildTitle: "Wählen Sie was Sie brauchen",
        plans: { basic: { name: "Basic", sub: "Für Einzelpersonen", cta: "Basic starten" }, pro: { name: "Pro", sub: "Für ambitionierte Marken", cta: "Pro starten" }, custom: { name: "Individuell", sub: "Vollständige kreative Partnerschaft", cta: "Sprechen wir" } },
        services: { animation: "Animation", presentation: "Präsentation", background: "Animierter Hintergrund", website: "Vollständige Website", uiux: "UI / UX Design", custom: "Etwas Individuelles" },
      },
      testimonials: { label: "✦ WAS KUNDEN SAGEN ✦", title: "Worte von denen, die es", titleAccent: "erlebt haben." },
      contact: { label: "✦ KONTAKT ✦", title: "Bereit etwas", titleAccent: "Außergewöhnliches zu bauen?", sub: "Jedes große Projekt beginnt mit einem Gespräch.", whatsapp: "WhatsApp", whatsappSub: "Schnellste Antwort", email: "E-Mail", phone: "Telefon", startProject: "PROJEKT STARTEN" },
      footer: { tagline: "Wir bauen keine Websites.\nWir bauen Erlebnisse.", navigate: "NAVIGATION", contact: "KONTAKT", rights: "ALLE RECHTE VORBEHALTEN.", magic: "Digitale Magie erschaffen ✦" },
      preloader: { loading: "LADEN" },
    }
  },
  es: {
    common: {
      nav: { services: "Servicios", work: "Trabajos", pricing: "Precios", contact: "Contacto", start: "Iniciar Proyecto" },
      hero: { badge: "✦ ESTUDIO CREATIVO DIGITAL ✦", line1: "No construimos", line2: "sitios web.", line3: "Construimos", line4: "experiencias.", cta: "INICIA TU PROYECTO" },
      services: {
        label: "✦ LO QUE CREAMOS ✦", title: "Nuestros", titleAccent: "Servicios", sub: "Cada proyecto es un nuevo universo.", hover: "HOVER PARA DESCUBRIR", startNow: "EMPEZAR →",
        items: {
          animations: { title: "Animaciones", sub: "Movimiento que cuenta tu historia", back: "Animaciones personalizadas que dan vida a tu marca — desde micro-interacciones hasta experiencias cinemáticas completas." },
          presentations: { title: "Presentaciones", sub: "Slides que cierran negocios", back: "Presentaciones interactivas y cinemáticas que hacen que tu audiencia recuerde cada palabra." },
          backgrounds: { title: "Fondos", sub: "Mundos detrás de tu contenido", back: "Fondos animados e inmersivos que transforman cualquier espacio — desde streams hasta sitios web." },
          websites: { title: "Sitios Web", sub: "Experiencias digitales, no páginas", back: "Sitios full-stack construidos con tecnología de punta — rápidos, hermosos e imposibles de olvidar." },
          uiux: { title: "UI / UX", sub: "Diseño que parece inevitable", back: "Interfaces diseñadas con atención obsesiva al detalle — cada píxel, cada interacción, cada sensación." },
          custom: { title: "¿Algo más?", sub: "Tu visión, nuestro arte", back: "¿Tienes una idea loca? Las amamos. Dinos qué necesitas y lo haremos realidad." },
        }
      },
      work: {
        label: "✦ MUESTRA INTERACTIVA ✦", title: "No solo mires.", titleAccent: "Experiméntalo.",
        sub: "Ocho demos en vivo. Construidos con la misma obsesión de cada proyecto.",
        launch: "CLIC PARA LANZAR", inactive: "INACTIVO", live: "EN VIVO",
        cta: "INICIA TU PROYECTO →", ctaSub: "Imagina esto — pero construido para ti",
        demos: {
          particles: { title: "Red de Partículas", category: "Animación", desc: "120 partículas interactivas reaccionan a tu cursor — conectándose y repeliendo en tiempo real." },
          glitch: { title: "Tipografía Glitch", category: "Motion Design", desc: "Texto que rompe la realidad a voluntad. Haz clic y míralo disolverse." },
          liquid: { title: "Cursor Líquido", category: "Efecto UI", desc: "Un rastro fluido violeta sigue cada movimiento — como pintura en agua oscura." },
          tilt: { title: "Tarjeta 3D Tilt", category: "UI / UX", desc: "Tarjetas con profundidad real — la luz cambia con tu movimiento." },
          morph: { title: "Gradiente Morphing", category: "Diseño Visual", desc: "Orbes fluidos orgánicos derivando entre sí — infinitos y vivos." },
          audio: { title: "Visualizador de Audio", category: "Motion / Sonido", desc: "32 barras que pulsan con música imaginaria. El ritmo es el diseño." },
          typewriter: { title: "Efecto Máquina de Escribir", category: "Tipografía", desc: "Cinco frases. Un cursor. La poesía del texto que aparece." },
          palette: { title: "Paletas de Colores", category: "Diseño de Marca", desc: "Cinco paletas oscuras hechas a mano. Cada una un estado de ánimo, un mundo, una historia." },
        },
        typewriterPhrases: ["Construimos experiencias.", "Movimiento que cautiva.", "Diseño que convierte.", "Código que funciona.", "Arte que perdura."],
        clickToPlay: "CLIC PARA REPRODUCIR", playing: "REPRODUCIENDO — CLIC PARA PAUSAR", moveYourCursor: "MUEVE TU CURSOR", hoverCard: "PASA EL MOUSE POR LA TARJETA", clickToGlitch: "CLIC PARA GLITCH", liveRender: "RENDER EN VIVO", clickDots: "CLIC EN PUNTOS PARA CAMBIAR",
      },
      stats: {
        label: "✦ EN NÚMEROS ✦", title: "El trabajo", titleAccent: "habla.",
        items: [
          { label: "Proyectos Entregados", sub: "en 18 países" },
          { label: "Satisfacción del Cliente", sub: "de encuestas post-proyecto" },
          { label: "Ojos Alcanzados", sub: "a través de nuestro trabajo" },
          { label: "En el Oficio", sub: "construyendo experiencias digitales" },
        ]
      },
      process: {
        label: "✦ CÓMO TRABAJAMOS ✦", title: "El proceso detrás", titleAccent: "de la magia.",
        sub: "Cada proyecto sigue un ritual. Refinado en cientos de entregas.",
        steps: [
          { title: "Descubrimiento", desc: "Comenzamos con una conversación profunda — entendiendo tu marca, tu audiencia y la sensación que quieres crear.", duration: "1–2 días" },
          { title: "Conceptualización", desc: "Esbozamos el universo. Moodboards, referencias de movimiento, direcciones visuales. Eliges lo que resuena.", duration: "2–3 días" },
          { title: "Creación", desc: "Aquí ocurre la magia. Frame a frame, píxel a píxel, línea a línea — construido con precisión y obsesión.", duration: "3–7 días" },
          { title: "Refinamiento", desc: "Iteramos hasta que esté exactamente bien. Tu feedback moldea todo. No paramos hasta que parezca inevitable.", duration: "1–3 días" },
          { title: "Entrega", desc: "Archivos limpios, entrega clara, cero fricción. Y seguimos disponibles después.", duration: "1 día" },
        ]
      },
      tools: { label: "✦ EL ARSENAL ✦", title: "Construido con", titleAccent: "lo mejor." },
      pricing: {
        label: "✦ INVERSIÓN ✦", title: "¿Cuánto vale", titleAccent: "tu visión?", sub: "Cada proyecto es único.", popular: "MÁS POPULAR", startingFrom: "DESDE", customProject: "PROYECTO PERSONALIZADO", talkScope: "Hablemos del alcance ✦", selected: "servicio seleccionado", selectedPlural: "servicios seleccionados", varies: "El precio final varía según la complejidad", getQuote: "OBTENER PRESUPUESTO →", selectPrompt: "Selecciona servicios", buildLabel: "✦ CREA EL TUYO ✦", buildTitle: "Elige lo que necesitas",
        plans: { basic: { name: "Básico", sub: "Para individuos y proyectos pequeños", cta: "Empezar Básico" }, pro: { name: "Pro", sub: "Para marcas que quieren destacar", cta: "Empezar Pro" }, custom: { name: "Personalizado", sub: "Asociación creativa completa", cta: "Hablemos" } },
        services: { animation: "Animación", presentation: "Presentación", background: "Fondo Animado", website: "Sitio Completo", uiux: "Diseño UI / UX", custom: "Algo Personalizado" },
      },
      testimonials: { label: "✦ LO QUE DICEN LOS CLIENTES ✦", title: "Palabras de quienes", titleAccent: "lo vivieron." },
      contact: { label: "✦ CONTÁCTANOS ✦", title: "¿Listo para construir algo", titleAccent: "extraordinario?", sub: "Todo gran proyecto comienza con una conversación.", whatsapp: "WhatsApp", whatsappSub: "Respuesta más rápida", email: "Email", phone: "Teléfono", startProject: "INICIA TU PROYECTO" },
      footer: { tagline: "No construimos sitios web.\nConstruimos experiencias.", navigate: "NAVEGAR", contact: "CONTACTO", rights: "TODOS LOS DERECHOS RESERVADOS.", magic: "Creando magia digital ✦" },
      preloader: { loading: "CARGANDO" },
    }
  },
  it: { common: { nav: { services: "Servizi", work: "Lavori", pricing: "Prezzi", contact: "Contatti", start: "Inizia Progetto" }, hero: { badge: "✦ STUDIO CREATIVO DIGITALE ✦", line1: "Non costruiamo", line2: "siti web.", line3: "Costruiamo", line4: "esperienze.", cta: "INIZIA IL TUO PROGETTO" }, services: { label: "✦ COSA CREIAMO ✦", title: "I Nostri", titleAccent: "Servizi", sub: "Ogni progetto è un nuovo universo.", hover: "PASSA IL MOUSE PER SCOPRIRE", startNow: "INIZIA ORA →", items: { animations: { title: "Animazioni", sub: "Movimento che racconta la tua storia", back: "Animazioni personalizzate che danno vita al tuo brand." }, presentations: { title: "Presentazioni", sub: "Slide che chiudono affari", back: "Presentazioni interattive e cinematiche memorabili." }, backgrounds: { title: "Sfondi", sub: "Mondi dietro il tuo contenuto", back: "Sfondi animati e immersivi che trasformano qualsiasi spazio." }, websites: { title: "Siti Web", sub: "Esperienze digitali, non pagine", back: "Siti full-stack costruiti con tecnologia all'avanguardia." }, uiux: { title: "UI / UX", sub: "Design che sembra inevitabile", back: "Interfacce con attenzione ossessiva ai dettagli." }, custom: { title: "Qualcos'altro?", sub: "La tua visione, la nostra arte", back: "Hai un'idea folle? La adoriamo. Dicci cosa ti serve." } } }, work: { label: "✦ VETRINA INTERATTIVA ✦", title: "Non guardare soltanto.", titleAccent: "Vivi l'esperienza.", sub: "Otto demo dal vivo. Con la stessa ossessione di ogni progetto.", launch: "CLICCA PER AVVIARE", inactive: "INATTIVO", live: "LIVE", cta: "INIZIA IL TUO PROGETTO →", ctaSub: "Immagina questo — ma costruito per te", demos: { particles: { title: "Rete di Particelle", category: "Animazione", desc: "120 particelle interattive reagiscono al cursore in tempo reale." }, glitch: { title: "Tipografia Glitch", category: "Motion Design", desc: "Testo che rompe la realtà. Clicca e guardalo dissolversi." }, liquid: { title: "Cursore Liquido", category: "Effetto UI", desc: "Una scia fluida viola segue ogni movimento." }, tilt: { title: "Carta 3D Tilt", category: "UI / UX", desc: "Carte con profondità reale — la luce cambia con il tuo movimento." }, morph: { title: "Gradiente Morphing", category: "Design Visivo", desc: "Sfere fluide organiche che si fondono — infinite e vive." }, audio: { title: "Visualizzatore Audio", category: "Motion / Suono", desc: "32 barre che pulsano con musica immaginaria." }, typewriter: { title: "Effetto Macchina da Scrivere", category: "Tipografia", desc: "Cinque frasi. Un cursore. La poesia del testo che appare." }, palette: { title: "Palette di Colori", category: "Brand Design", desc: "Cinque palette scure fatte a mano. Ognuna un'umore, un mondo." } }, typewriterPhrases: ["Costruiamo esperienze.", "Movimento che cattura.", "Design che converte.", "Codice che performa.", "Arte che dura."], clickToPlay: "CLICCA PER RIPRODURRE", playing: "IN RIPRODUZIONE — CLICCA PER PAUSA", moveYourCursor: "MUOVI IL CURSORE", hoverCard: "PASSA SULLA CARTA", clickToGlitch: "CLICCA PER GLITCH", liveRender: "RENDER LIVE", clickDots: "CLICCA I PUNTI PER CAMBIARE" }, stats: { label: "✦ IN NUMERI ✦", title: "Il lavoro", titleAccent: "parla.", items: [{ label: "Progetti Consegnati", sub: "in 18 paesi" }, { label: "Soddisfazione Cliente", sub: "dai sondaggi post-progetto" }, { label: "Occhi Raggiunti", sub: "tramite il nostro lavoro" }, { label: "Nel Mestiere", sub: "creando esperienze digitali" }] }, process: { label: "✦ COME LAVORIAMO ✦", title: "Il processo dietro", titleAccent: "la magia.", sub: "Ogni progetto segue un rituale. Raffinato su centinaia di consegne.", steps: [{ title: "Scoperta", desc: "Iniziamo con una conversazione profonda — capire il tuo brand e il sentimento che vuoi creare.", duration: "1–2 giorni" }, { title: "Concettualizzazione", desc: "Schizziamo l'universo. Moodboard, riferimenti motion, direzioni visive.", duration: "2–3 giorni" }, { title: "Creazione", desc: "Qui avviene la magia. Frame per frame, pixel per pixel, riga per riga.", duration: "3–7 giorni" }, { title: "Rifinitura", desc: "Iteriamo finché non è perfetto. Il tuo feedback plasma tutto.", duration: "1–3 giorni" }, { title: "Consegna", desc: "File puliti, consegna chiara, zero attrito. E restiamo disponibili dopo.", duration: "1 giorno" }] }, tools: { label: "✦ L'ARSENALE ✦", title: "Costruito con", titleAccent: "il meglio." }, pricing: { label: "✦ INVESTIMENTO ✦", title: "Quanto vale", titleAccent: "la tua visione?", sub: "Ogni progetto è unico.", popular: "PIÙ POPOLARE", startingFrom: "A PARTIRE DA", customProject: "PROGETTO PERSONALIZZATO", talkScope: "Parliamo dell'ambito ✦", selected: "servizio selezionato", selectedPlural: "servizi selezionati", varies: "Il prezzo finale varia in base alla complessità", getQuote: "OTTIENI PREVENTIVO →", selectPrompt: "Seleziona i servizi", buildLabel: "✦ COSTRUISCI IL TUO ✦", buildTitle: "Scegli cosa ti serve", plans: { basic: { name: "Base", sub: "Per individui e piccoli progetti", cta: "Inizia Base" }, pro: { name: "Pro", sub: "Per brand che vogliono distinguersi", cta: "Inizia Pro" }, custom: { name: "Personalizzato", sub: "Partnership creativa completa", cta: "Parliamo" } }, services: { animation: "Animazione", presentation: "Presentazione", background: "Sfondo Animato", website: "Sito Completo", uiux: "Design UI / UX", custom: "Qualcosa di Personalizzato" } }, testimonials: { label: "✦ COSA DICONO I CLIENTI ✦", title: "Parole di chi", titleAccent: "l'ha vissuto." }, contact: { label: "✦ CONTATTACI ✦", title: "Pronto a costruire qualcosa", titleAccent: "di straordinario?", sub: "Ogni grande progetto inizia con una conversazione.", whatsapp: "WhatsApp", whatsappSub: "Risposta più veloce", email: "Email", phone: "Telefono", startProject: "INIZIA IL TUO PROGETTO" }, footer: { tagline: "Non costruiamo siti web.\nCostruiamo esperienze.", navigate: "NAVIGA", contact: "CONTATTI", rights: "TUTTI I DIRITTI RISERVATI.", magic: "Creare magia digitale ✦" }, preloader: { loading: "CARICAMENTO" } } },
  ru: { common: { nav: { services: "Услуги", work: "Работы", pricing: "Цены", contact: "Контакт", start: "Начать Проект" }, hero: { badge: "✦ ЦИФРОВАЯ КРЕАТИВНАЯ СТУДИЯ ✦", line1: "Мы не строим", line2: "сайты.", line3: "Мы создаём", line4: "впечатления.", cta: "НАЧАТЬ ПРОЕКТ" }, services: { label: "✦ ЧТО МЫ СОЗДАЁМ ✦", title: "Наши", titleAccent: "Услуги", sub: "Каждый проект — новая вселенная.", hover: "НАВЕДИТЕ ДЛЯ ОТКРЫТИЯ", startNow: "НАЧАТЬ →", items: { animations: { title: "Анимации", sub: "Движение рассказывает вашу историю", back: "Анимации, которые оживляют ваш бренд — от микро-взаимодействий до кинематографических опытов." }, presentations: { title: "Презентации", sub: "Слайды, которые закрывают сделки", back: "Интерактивные кинематографические презентации, которые запоминаются." }, backgrounds: { title: "Фоны", sub: "Миры за вашим контентом", back: "Анимированные иммерсивные фоны, трансформирующие любое пространство." }, websites: { title: "Сайты", sub: "Цифровые впечатления, не страницы", back: "Полноценные сайты на передовых технологиях — быстрые, красивые и незабываемые." }, uiux: { title: "UI / UX", sub: "Дизайн, который кажется неизбежным", back: "Интерфейсы с одержимым вниманием к деталям — каждый пиксель, каждое взаимодействие." }, custom: { title: "Что-то другое?", sub: "Ваше видение, наше мастерство", back: "Есть безумная идея? Мы её любим. Скажите нам, что нужно." } } }, work: { label: "✦ ИНТЕРАКТИВНАЯ ВИТРИНА ✦", title: "Не просто смотри.", titleAccent: "Почувствуй.", sub: "Восемь живых демо. С той же одержимостью что и каждый проект.", launch: "НАЖМИТЕ ДЛЯ ЗАПУСКА", inactive: "НЕАКТИВНО", live: "В ЭФИРЕ", cta: "НАЧАТЬ ПРОЕКТ →", ctaSub: "Представьте это — созданное для вас", demos: { particles: { title: "Сеть Частиц", category: "Анимация", desc: "120 частиц реагируют на ваш курсор в реальном времени." }, glitch: { title: "Глитч Типографика", category: "Моушн Дизайн", desc: "Текст, ломающий реальность. Нажмите и смотрите." }, liquid: { title: "Жидкий Курсор", category: "UI Эффект", desc: "Жидкий фиолетовый след следует за каждым движением." }, tilt: { title: "3D Карта Тилт", category: "UI / UX", desc: "Карты с настоящей глубиной — свет меняется при движении." }, morph: { title: "Морфинг Градиент", category: "Визуальный Дизайн", desc: "Органические шары плавают друг сквозь друга — бесконечно." }, audio: { title: "Аудио Визуализатор", category: "Моушн / Звук", desc: "32 полосы пульсируют с воображаемой музыкой." }, typewriter: { title: "Эффект Пишущей Машинки", category: "Типографика", desc: "Пять фраз. Один курсор. Поэзия появляющегося текста." }, palette: { title: "Цветовые Палитры", category: "Брендинг", desc: "Пять тёмных палитр. Каждая — настроение, мир, история." } }, typewriterPhrases: ["Мы создаём впечатления.", "Движение, которое захватывает.", "Дизайн, который конвертирует.", "Код, который работает.", "Искусство, которое остаётся."], clickToPlay: "НАЖМИТЕ ДЛЯ ВОСПРОИЗВЕДЕНИЯ", playing: "ИГРАЕТ — НАЖМИТЕ ДЛЯ ПАУЗЫ", moveYourCursor: "ДВИГАЙТЕ КУРСОР", hoverCard: "НАВЕДИТЕ НА КАРТУ", clickToGlitch: "НАЖМИТЕ ДЛЯ ГЛИТЧА", liveRender: "ЖИВОЙ РЕНДЕР", clickDots: "НАЖМИТЕ ТОЧКИ ДЛЯ СМЕНЫ" }, stats: { label: "✦ В ЦИФРАХ ✦", title: "Работа", titleAccent: "говорит.", items: [{ label: "Проектов Сдано", sub: "в 18 странах" }, { label: "Удовлетворённость Клиентов", sub: "из опросов после проекта" }, { label: "Охваченных Глаз", sub: "через работу с клиентами" }, { label: "В Профессии", sub: "создавая цифровые впечатления" }] }, process: { label: "✦ КАК МЫ РАБОТАЕМ ✦", title: "Процесс за", titleAccent: "магией.", sub: "Каждый проект следует ритуалу. Отточен на сотнях поставок.", steps: [{ title: "Открытие", desc: "Начинаем с глубокого разговора — понять ваш бренд и ощущение, которое вы хотите создать.", duration: "1–2 дня" }, { title: "Концепция", desc: "Набрасываем вселенную. Мудборды, референсы движения, визуальные направления.", duration: "2–3 дня" }, { title: "Создание", desc: "Здесь происходит магия. Кадр за кадром, пиксель за пикселем.", duration: "3–7 дней" }, { title: "Шлифовка", desc: "Итерируем пока не будет идеально. Ваш фидбек формирует всё.", duration: "1–3 дня" }, { title: "Доставка", desc: "Чистые файлы, ясная передача, ноль трений. И остаёмся доступными после.", duration: "1 день" }] }, tools: { label: "✦ АРСЕНАЛ ✦", title: "Построено с", titleAccent: "лучшим." }, pricing: { label: "✦ ИНВЕСТИЦИИ ✦", title: "Сколько стоит", titleAccent: "ваша идея?", sub: "Каждый проект уникален.", popular: "САМЫЙ ПОПУЛЯРНЫЙ", startingFrom: "ОТ", customProject: "ИНДИВИДУАЛЬНЫЙ ПРОЕКТ", talkScope: "Обсудим объём ✦", selected: "услуга выбрана", selectedPlural: "услуги выбраны", varies: "Финальная цена зависит от сложности", getQuote: "ПОЛУЧИТЬ РАСЧЁТ →", selectPrompt: "Выберите услуги", buildLabel: "✦ СОЗДАЙТЕ СВОЁ ✦", buildTitle: "Выберите что вам нужно", plans: { basic: { name: "Базовый", sub: "Для частных лиц", cta: "Начать Базовый" }, pro: { name: "Про", sub: "Для брендов", cta: "Начать Про" }, custom: { name: "Индивидуальный", sub: "Полное творческое партнёрство", cta: "Обсудим" } }, services: { animation: "Анимация", presentation: "Презентация", background: "Анимированный Фон", website: "Полный Сайт", uiux: "UI / UX Дизайн", custom: "Что-то Индивидуальное" } }, testimonials: { label: "✦ ЧТО ГОВОРЯТ КЛИЕНТЫ ✦", title: "Слова тех, кто", titleAccent: "это пережил." }, contact: { label: "✦ СВЯЗАТЬСЯ ✦", title: "Готовы создать что-то", titleAccent: "выдающееся?", sub: "Каждый великий проект начинается с разговора.", whatsapp: "WhatsApp", whatsappSub: "Быстрый ответ", email: "Email", phone: "Телефон", startProject: "НАЧАТЬ ПРОЕКТ" }, footer: { tagline: "Мы не строим сайты.\nМы создаём впечатления.", navigate: "НАВИГАЦИЯ", contact: "КОНТАКТ", rights: "ВСЕ ПРАВА ЗАЩИЩЕНЫ.", magic: "Создаём цифровую магию ✦" }, preloader: { loading: "ЗАГРУЗКА" } } },
  sv: { common: { nav: { services: "Tjänster", work: "Arbeten", pricing: "Priser", contact: "Kontakt", start: "Starta Projekt" }, hero: { badge: "✦ DIGITALT KREATIVT STUDIO ✦", line1: "Vi bygger inte", line2: "webbplatser.", line3: "Vi bygger", line4: "upplevelser.", cta: "STARTA DITT PROJEKT" }, services: { label: "✦ VAD VI SKAPAR ✦", title: "Våra", titleAccent: "Tjänster", sub: "Varje projekt är ett nytt universum.", hover: "HOVRA FÖR ATT UPPTÄCKA", startNow: "BÖRJA NU →", items: { animations: { title: "Animationer", sub: "Rörelse berättar din historia", back: "Anpassade animationer som ger liv till ditt varumärke." }, presentations: { title: "Presentationer", sub: "Slides som stänger affärer", back: "Interaktiva cinematiska presentationer som publiken minns." }, backgrounds: { title: "Bakgrunder", sub: "Världar bakom ditt innehåll", back: "Animerade immersiva bakgrunder som transformerar vilket utrymme som helst." }, websites: { title: "Webbplatser", sub: "Digitala upplevelser, inte sidor", back: "Full-stack webbplatser byggda med senaste tekniken." }, uiux: { title: "UI / UX", sub: "Design som känns oundviklig", back: "Gränssnitt med obsessiv uppmärksamhet på detaljer." }, custom: { title: "Något annat?", sub: "Din vision, vårt hantverk", back: "Har du en galen idé? Vi älskar dem. Berätta vad du behöver." } } }, work: { label: "✦ INTERAKTIV SHOWCASE ✦", title: "Titta inte bara.", titleAccent: "Upplev.", sub: "Åtta live-demos. Byggda med samma besatthet som varje projekt.", launch: "KLICKA FÖR ATT STARTA", inactive: "INAKTIV", live: "LIVE", cta: "STARTA DITT PROJEKT →", ctaSub: "Föreställ dig detta — byggt för dig", demos: { particles: { title: "Partikelnätverk", category: "Animation", desc: "120 interaktiva partiklar reagerar på din markör i realtid." }, glitch: { title: "Glitch Typografi", category: "Motion Design", desc: "Text som bryter verkligheten. Klicka och se den lösas upp." }, liquid: { title: "Flytande Markör", category: "UI-effekt", desc: "Ett flytande lila spår följer varje rörelse." }, tilt: { title: "3D-kort Tilt", category: "UI / UX", desc: "Kort med verkligt djup — ljuset förändras med din rörelse." }, morph: { title: "Morphande Gradient", category: "Visuell Design", desc: "Organiska sfärer som glider genom varandra — oändliga och levande." }, audio: { title: "Ljudvisualisering", category: "Motion / Ljud", desc: "32 staplar som pulserar med imaginär musik." }, typewriter: { title: "Skrivmaskineffekt", category: "Typografi", desc: "Fem fraser. En markör. Poesin i text som uppträder." }, palette: { title: "Färgpaletter", category: "Varumärkesdesign", desc: "Fem handgjorda mörka paletter. Var och en ett humör, en värld." } }, typewriterPhrases: ["Vi bygger upplevelser.", "Rörelse som fängslar.", "Design som konverterar.", "Kod som presterar.", "Konst som varar."], clickToPlay: "KLICKA FÖR ATT SPELA", playing: "SPELAR — KLICKA FÖR PAUS", moveYourCursor: "FLYTTA DIN MARKÖR", hoverCard: "HOVRA KORTET", clickToGlitch: "KLICKA FÖR GLITCH", liveRender: "LIVE-RENDERING", clickDots: "KLICKA PUNKTER FÖR ATT BYTA" }, stats: { label: "✦ I SIFFROR ✦", title: "Arbetet", titleAccent: "talar.", items: [{ label: "Projekt Levererade", sub: "i 18 länder" }, { label: "Kundnöjdhet", sub: "från enkäter efter projekt" }, { label: "Ögon Nådda", sub: "genom vårt kundarbete" }, { label: "I Hantverket", sub: "skapar digitala upplevelser" }] }, process: { label: "✦ HUR VI ARBETAR ✦", title: "Processen bakom", titleAccent: "magin.", sub: "Varje projekt följer ett ritual. Förfinat över hundratals leveranser.", steps: [{ title: "Upptäckt", desc: "Vi börjar med ett djupt samtal — förstå ditt varumärke och känslan du vill skapa.", duration: "1–2 dagar" }, { title: "Konceptutveckling", desc: "Vi skissar universumet. Moodboards, rörelsreferenser, visuella riktningar.", duration: "2–3 dagar" }, { title: "Skapande", desc: "Här händer magin. Frame för frame, pixel för pixel.", duration: "3–7 dagar" }, { title: "Förfining", desc: "Vi itererar tills det är precis rätt. Din feedback formar allt.", duration: "1–3 dagar" }, { title: "Leverans", desc: "Rena filer, tydlig överlämning, noll friktion.", duration: "1 dag" }] }, tools: { label: "✦ ARSENALEN ✦", title: "Byggt med", titleAccent: "det bästa." }, pricing: { label: "✦ INVESTERING ✦", title: "Vad är din", titleAccent: "vision värd?", sub: "Varje projekt är unikt.", popular: "MEST POPULÄRT", startingFrom: "FRÅN", customProject: "ANPASSAT PROJEKT", talkScope: "Låt oss prata om scope ✦", selected: "tjänst vald", selectedPlural: "tjänster valda", varies: "Slutpriset varierar beroende på komplexitet", getQuote: "FÅ OFFERT →", selectPrompt: "Välj tjänster", buildLabel: "✦ BYGG DIN EGEN ✦", buildTitle: "Välj vad du behöver", plans: { basic: { name: "Bas", sub: "För privatpersoner", cta: "Starta Bas" }, pro: { name: "Pro", sub: "För ambitiösa varumärken", cta: "Starta Pro" }, custom: { name: "Anpassad", sub: "Fullt kreativt partnerskap", cta: "Låt oss prata" } }, services: { animation: "Animation", presentation: "Presentation", background: "Animerad Bakgrund", website: "Fullständig Webbplats", uiux: "UI / UX Design", custom: "Något Anpassat" } }, testimonials: { label: "✦ VAD KUNDER SÄGER ✦", title: "Ord från dem som", titleAccent: "upplevde det." }, contact: { label: "✦ KOM I KONTAKT ✦", title: "Redo att bygga något", titleAccent: "extraordinärt?", sub: "Varje stort projekt börjar med ett samtal.", whatsapp: "WhatsApp", whatsappSub: "Snabbast svar", email: "Email", phone: "Telefon", startProject: "STARTA DITT PROJEKT" }, footer: { tagline: "Vi bygger inte webbplatser.\nVi bygger upplevelser.", navigate: "NAVIGERA", contact: "KONTAKT", rights: "ALLA RÄTTIGHETER FÖRBEHÅLLNA.", magic: "Skapar digital magi ✦" }, preloader: { loading: "LADDAR" } } },
  pt: { common: { nav: { services: "Serviços", work: "Trabalhos", pricing: "Preços", contact: "Contato", start: "Iniciar Projeto" }, hero: { badge: "✦ ESTÚDIO CRIATIVO DIGITAL ✦", line1: "Não construímos", line2: "sites.", line3: "Construímos", line4: "experiências.", cta: "INICIE SEU PROJETO" }, services: { label: "✦ O QUE CRIAMOS ✦", title: "Nossos", titleAccent: "Serviços", sub: "Cada projeto é um novo universo.", hover: "PASSE O MOUSE PARA DESCOBRIR", startNow: "COMEÇAR →", items: { animations: { title: "Animações", sub: "Movimento que conta sua história", back: "Animações personalizadas que dão vida à sua marca." }, presentations: { title: "Apresentações", sub: "Slides que fecham negócios", back: "Apresentações interativas e cinematográficas memoráveis." }, backgrounds: { title: "Fundos", sub: "Mundos atrás do seu conteúdo", back: "Fundos animados e imersivos que transformam qualquer espaço." }, websites: { title: "Sites", sub: "Experiências digitais, não páginas", back: "Sites full-stack com tecnologia de ponta." }, uiux: { title: "UI / UX", sub: "Design que parece inevitável", back: "Interfaces com atenção obsessiva aos detalhes." }, custom: { title: "Algo mais?", sub: "Sua visão, nossa arte", back: "Tem uma ideia louca? Adoramos. Diga-nos o que precisa." } } }, work: { label: "✦ VITRINE INTERATIVA ✦", title: "Não apenas olhe.", titleAccent: "Experiencie.", sub: "Oito demos ao vivo. Com a mesma obsessão de cada projeto.", launch: "CLIQUE PARA LANÇAR", inactive: "INATIVO", live: "AO VIVO", cta: "INICIE SEU PROJETO →", ctaSub: "Imagine isso — mas construído para você", demos: { particles: { title: "Rede de Partículas", category: "Animação", desc: "120 partículas interativas reagem ao cursor em tempo real." }, glitch: { title: "Tipografia Glitch", category: "Motion Design", desc: "Texto que quebra a realidade. Clique e veja-o se dissolver." }, liquid: { title: "Cursor Líquido", category: "Efeito UI", desc: "Um rastro fluido roxo segue cada movimento." }, tilt: { title: "Card 3D Tilt", category: "UI / UX", desc: "Cards com profundidade real — a luz muda com seu movimento." }, morph: { title: "Gradiente Morphing", category: "Design Visual", desc: "Orbes fluidos orgânicos flutuando uns pelos outros." }, audio: { title: "Visualizador de Áudio", category: "Motion / Som", desc: "32 barras pulsando com música imaginária." }, typewriter: { title: "Efeito Máquina de Escrever", category: "Tipografia", desc: "Cinco frases. Um cursor. A poesia do texto que aparece." }, palette: { title: "Paletas de Cores", category: "Design de Marca", desc: "Cinco paletas escuras feitas à mão. Cada uma um humor, um mundo." } }, typewriterPhrases: ["Construímos experiências.", "Movimento que cativa.", "Design que converte.", "Código que performa.", "Arte que perdura."], clickToPlay: "CLIQUE PARA REPRODUZIR", playing: "REPRODUZINDO — CLIQUE PARA PAUSAR", moveYourCursor: "MOVA SEU CURSOR", hoverCard: "PASSE O MOUSE NO CARD", clickToGlitch: "CLIQUE PARA GLITCH", liveRender: "RENDERIZAÇÃO AO VIVO", clickDots: "CLIQUE NOS PONTOS PARA MUDAR" }, stats: { label: "✦ EM NÚMEROS ✦", title: "O trabalho", titleAccent: "fala.", items: [{ label: "Projetos Entregues", sub: "em 18 países" }, { label: "Satisfação do Cliente", sub: "de pesquisas pós-projeto" }, { label: "Olhos Alcançados", sub: "através do nosso trabalho" }, { label: "No Ofício", sub: "construindo experiências digitais" }] }, process: { label: "✦ COMO TRABALHAMOS ✦", title: "O processo por trás", titleAccent: "da magia.", sub: "Cada projeto segue um ritual. Refinado em centenas de entregas.", steps: [{ title: "Descoberta", desc: "Começamos com uma conversa profunda — entender sua marca e a sensação que quer criar.", duration: "1–2 dias" }, { title: "Conceituação", desc: "Esboçamos o universo. Moodboards, referências de movimento, direções visuais.", duration: "2–3 dias" }, { title: "Criação", desc: "Aqui acontece a magia. Frame a frame, pixel a pixel.", duration: "3–7 dias" }, { title: "Refinamento", desc: "Iteramos até ficar exatamente certo. Seu feedback molda tudo.", duration: "1–3 dias" }, { title: "Entrega", desc: "Arquivos limpos, entrega clara, zero fricção.", duration: "1 dia" }] }, tools: { label: "✦ O ARSENAL ✦", title: "Construído com", titleAccent: "o melhor." }, pricing: { label: "✦ INVESTIMENTO ✦", title: "Quanto vale", titleAccent: "sua visão?", sub: "Cada projeto é único.", popular: "MAIS POPULAR", startingFrom: "A PARTIR DE", customProject: "PROJETO PERSONALIZADO", talkScope: "Vamos falar sobre o escopo ✦", selected: "serviço selecionado", selectedPlural: "serviços selecionados", varies: "Preço final varia conforme a complexidade", getQuote: "OBTER ORÇAMENTO →", selectPrompt: "Selecione os serviços", buildLabel: "✦ CRIE O SEU ✦", buildTitle: "Escolha o que você precisa", plans: { basic: { name: "Básico", sub: "Para indivíduos e pequenos projetos", cta: "Começar Básico" }, pro: { name: "Pro", sub: "Para marcas que querem se destacar", cta: "Começar Pro" }, custom: { name: "Personalizado", sub: "Parceria criativa completa", cta: "Vamos Conversar" } }, services: { animation: "Animação", presentation: "Apresentação", background: "Fundo Animado", website: "Site Completo", uiux: "Design UI / UX", custom: "Algo Personalizado" } }, testimonials: { label: "✦ O QUE OS CLIENTES DIZEM ✦", title: "Palavras de quem", titleAccent: "vivenciou." }, contact: { label: "✦ ENTRE EM CONTATO ✦", title: "Pronto para construir algo", titleAccent: "extraordinário?", sub: "Todo grande projeto começa com uma conversa.", whatsapp: "WhatsApp", whatsappSub: "Resposta mais rápida", email: "Email", phone: "Telefone", startProject: "INICIE SEU PROJETO" }, footer: { tagline: "Não construímos sites.\nConstruímos experiências.", navigate: "NAVEGAR", contact: "CONTATO", rights: "TODOS OS DIREITOS RESERVADOS.", magic: "Criando magia digital ✦" }, preloader: { loading: "CARREGANDO" } } },
  zh: { common: { nav: { services: "服务", work: "作品", pricing: "价格", contact: "联系", start: "开始项目" }, hero: { badge: "✦ 数字创意工作室 ✦", line1: "我们不只是建", line2: "网站。", line3: "我们创造", line4: "体验。", cta: "开始您的项目" }, services: { label: "✦ 我们的创作 ✦", title: "我们的", titleAccent: "服务", sub: "每个项目都是一个新宇宙。", hover: "悬停以发现", startNow: "立即开始 →", items: { animations: { title: "动画", sub: "讲述您故事的动态", back: "为您的品牌注入生命的定制动画。" }, presentations: { title: "演示文稿", sub: "促成交易的幻灯片", back: "让观众记住每一个字的互动电影式演示。" }, backgrounds: { title: "背景", sub: "内容背后的世界", back: "改变任何空间的动态沉浸式背景。" }, websites: { title: "网站", sub: "数字体验，而非页面", back: "用尖端技术构建的全栈网站。" }, uiux: { title: "UI / UX", sub: "感觉不可避免的设计", back: "对细节有强迫症的界面设计。" }, custom: { title: "其他需求？", sub: "您的愿景，我们的工艺", back: "有疯狂的想法？我们喜欢。告诉我们您需要什么。" } } }, work: { label: "✦ 互动展示 ✦", title: "不只是看。", titleAccent: "体验。", sub: "八个实时演示。用我们对每个项目的同等热情构建。", launch: "点击启动", inactive: "未激活", live: "实时", cta: "开始您的项目 →", ctaSub: "想象这个 — 但为您而建", demos: { particles: { title: "粒子网络", category: "动画", desc: "120个交互粒子实时响应您的光标。" }, glitch: { title: "故障字体", category: "动态设计", desc: "按需打破现实的文字。点击观看它溶解。" }, liquid: { title: "液态光标", category: "UI效果", desc: "流动的紫色轨迹跟随每个动作。" }, tilt: { title: "3D卡片倾斜", category: "UI / UX", desc: "具有真实深度的卡片。" }, morph: { title: "渐变变形", category: "视觉设计", desc: "有机流体球体相互漂移——无限且充满活力。" }, audio: { title: "音频可视化", category: "动态/声音", desc: "32个条形随想象中的音乐脉动。" }, typewriter: { title: "打字机效果", category: "字体排印", desc: "五个短语。一个光标。出现文字的诗意。" }, palette: { title: "色彩调色板", category: "品牌设计", desc: "五个手工制作的深色调色板。" } }, typewriterPhrases: ["我们创造体验。", "captivating动态。", "转化设计。", "高性能代码。", "永恒艺术。"], clickToPlay: "点击播放", playing: "播放中 — 点击暂停", moveYourCursor: "移动您的光标", hoverCard: "悬停卡片", clickToGlitch: "点击故障", liveRender: "实时渲染", clickDots: "点击圆点切换" }, stats: { label: "✦ 用数字说话 ✦", title: "作品", titleAccent: "自己说话。", items: [{ label: "已交付项目", sub: "遍及18个国家" }, { label: "客户满意度", sub: "来自项目后调查" }, { label: "触达眼球", sub: "通过我们的客户工作" }, { label: "深耕此道", sub: "构建数字体验" }] }, process: { label: "✦ 我们的工作方式 ✦", title: "魔法背后的", titleAccent: "流程。", sub: "每个项目都遵循一个仪式。在数百次交付中精炼。", steps: [{ title: "探索", desc: "我们从深度对话开始——了解您的品牌和您想创造的感觉。", duration: "1–2天" }, { title: "构思", desc: "我们勾勒宇宙。情绪板、动态参考、视觉方向。", duration: "2–3天" }, { title: "创作", desc: "魔法在这里发生。逐帧、逐像素、逐行构建。", duration: "3–7天" }, { title: "精炼", desc: "我们迭代直到完全正确。您的反馈塑造一切。", duration: "1–3天" }, { title: "交付", desc: "干净的文件，清晰的交接，零摩擦。", duration: "1天" }] }, tools: { label: "✦ 工具库 ✦", title: "用最好的", titleAccent: "工具构建。" }, pricing: { label: "✦ 投资 ✦", title: "您的愿景", titleAccent: "价值几何？", sub: "每个项目都是独特的。", popular: "最受欢迎", startingFrom: "起价", customProject: "定制项目", talkScope: "让我们谈谈范围 ✦", selected: "项服务已选", selectedPlural: "项服务已选", varies: "最终价格因复杂性而异", getQuote: "获取报价 →", selectPrompt: "选择服务获取报价", buildLabel: "✦ 定制您的方案 ✦", buildTitle: "选择您需要的", plans: { basic: { name: "基础", sub: "适合个人和小型项目", cta: "开始基础版" }, pro: { name: "专业", sub: "适合想要脱颖而出的品牌", cta: "开始专业版" }, custom: { name: "定制", sub: "完整创意合作", cta: "联系我们" } }, services: { animation: "动画", presentation: "演示文稿", background: "动态背景", website: "完整网站", uiux: "UI / UX 设计", custom: "定制需求" } }, testimonials: { label: "✦ 客户评价 ✦", title: "来自亲身", titleAccent: "体验者的话。" }, contact: { label: "✦ 联系我们 ✦", title: "准备好创建", titleAccent: "非凡的作品了吗？", sub: "每个伟大的项目都从对话开始。", whatsapp: "WhatsApp", whatsappSub: "最快响应", email: "电子邮件", phone: "电话", startProject: "开始您的项目" }, footer: { tagline: "我们不只是建网站。\n我们创造体验。", navigate: "导航", contact: "联系", rights: "版权所有。", magic: "创造数字魔法 ✦" }, preloader: { loading: "加载中" } } },
  ja: { common: { nav: { services: "サービス", work: "実績", pricing: "料金", contact: "お問い合わせ", start: "プロジェクト開始" }, hero: { badge: "✦ デジタルクリエイティブスタジオ ✦", line1: "私たちは単なる", line2: "ウェブサイトを作りません。", line3: "私たちは", line4: "体験を創ります。", cta: "プロジェクトを始める" }, services: { label: "✦ 私たちが創るもの ✦", title: "私たちの", titleAccent: "サービス", sub: "すべてのプロジェクトは新しい宇宙です。", hover: "ホバーして発見", startNow: "今すぐ始める →", items: { animations: { title: "アニメーション", sub: "あなたの物語を語る動き", back: "ブランドに命を吹き込むカスタムアニメーション。" }, presentations: { title: "プレゼンテーション", sub: "取引を成立させるスライド", back: "聴衆が言葉を覚えるインタラクティブなプレゼン。" }, backgrounds: { title: "バックグラウンド", sub: "コンテンツの背後にある世界", back: "あらゆる空間を変えるアニメーション背景。" }, websites: { title: "ウェブサイト", sub: "デジタル体験、ページではなく", back: "最先端技術で構築したフルスタックサイト。" }, uiux: { title: "UI / UX", sub: "必然に感じるデザイン", back: "細部への強迫的な注意でデザインされたインターフェース。" }, custom: { title: "その他は？", sub: "あなたのビジョン、私たちの技", back: "奇抜なアイデアをお持ちですか？大歓迎です。" } } }, work: { label: "✦ インタラクティブショーケース ✦", title: "見るだけでなく、", titleAccent: "体験してください。", sub: "8つのライブデモ。すべてのプロジェクトと同じ熱意で構築。", launch: "クリックして起動", inactive: "非アクティブ", live: "ライブ", cta: "プロジェクトを始める →", ctaSub: "これを想像してください — あなたのために作られた", demos: { particles: { title: "パーティクルネットワーク", category: "アニメーション", desc: "120のインタラクティブな粒子がカーソルに反応。" }, glitch: { title: "グリッチタイポグラフィ", category: "モーションデザイン", desc: "命令で現実を壊すテキスト。" }, liquid: { title: "リキッドカーソル", category: "UIエフェクト", desc: "すべての動きに追従する流体の紫のトレイル。" }, tilt: { title: "3Dカードチルト", category: "UI / UX", desc: "本物の奥行きを持つカード。" }, morph: { title: "モーフィンググラデーション", category: "ビジュアルデザイン", desc: "有機的な流体球が互いに漂う。" }, audio: { title: "オーディオビジュアライザー", category: "モーション / サウンド", desc: "32バーが想像上の音楽でパルス。" }, typewriter: { title: "タイプライター効果", category: "タイポグラフィ", desc: "5つのフレーズ。1つのカーソル。" }, palette: { title: "カラーパレット", category: "ブランドデザイン", desc: "5つの手作りダークパレット。" } }, typewriterPhrases: ["体験を創ります。", "魅了する動き。", "コンバートするデザイン。", "パフォームするコード。", "永続する芸術。"], clickToPlay: "クリックして再生", playing: "再生中 — クリックで一時停止", moveYourCursor: "カーソルを動かして", hoverCard: "カードにホバー", clickToGlitch: "クリックでグリッチ", liveRender: "ライブレンダリング", clickDots: "ドットをクリックして切替" }, stats: { label: "✦ 数字で見る ✦", title: "仕事が", titleAccent: "語る。", items: [{ label: "納品済みプロジェクト", sub: "18カ国で" }, { label: "顧客満足度", sub: "プロジェクト後のアンケートより" }, { label: "リーチした目", sub: "クライアント作品を通じて" }, { label: "この道で", sub: "デジタル体験を構築" }] }, process: { label: "✦ 私たちの仕事の進め方 ✦", title: "魔法の背後にある", titleAccent: "プロセス。", sub: "すべてのプロジェクトは儀式に従います。何百もの納品で磨かれた。", steps: [{ title: "ディスカバリー", desc: "深い会話から始めます — ブランド、オーディエンス、作りたい感覚を理解する。", duration: "1〜2日" }, { title: "コンセプト", desc: "宇宙をスケッチします。ムードボード、モーションリファレンス、ビジュアル方向性。", duration: "2〜3日" }, { title: "クリエイション", desc: "ここで魔法が起きます。フレームごと、ピクセルごと、行ごとに構築。", duration: "3〜7日" }, { title: "リファインメント", desc: "完璧になるまで繰り返します。フィードバックがすべてを形作る。", duration: "1〜3日" }, { title: "デリバリー", desc: "クリーンなファイル、明確な引き渡し、ゼロフリクション。", duration: "1日" }] }, tools: { label: "✦ アーセナル ✦", title: "最高のもので", titleAccent: "構築。" }, pricing: { label: "✦ 投資 ✦", title: "あなたのビジョンは", titleAccent: "どれほどの価値がありますか？", sub: "すべてのプロジェクトはユニークです。", popular: "最も人気", startingFrom: "から", customProject: "カスタムプロジェクト", talkScope: "範囲について話しましょう ✦", selected: "サービスを選択", selectedPlural: "サービスを選択", varies: "最終価格は複雑さによって異なります", getQuote: "見積もりを取得 →", selectPrompt: "サービスを選択してください", buildLabel: "✦ 自分だけのプランを作る ✦", buildTitle: "必要なものを選んでください", plans: { basic: { name: "ベーシック", sub: "個人・小規模プロジェクト向け", cta: "ベーシックを始める" }, pro: { name: "プロ", sub: "目立ちたいブランド向け", cta: "プロを始める" }, custom: { name: "カスタム", sub: "完全なクリエイティブパートナーシップ", cta: "話し合いましょう" } }, services: { animation: "アニメーション", presentation: "プレゼンテーション", background: "アニメーション背景", website: "フルウェブサイト", uiux: "UI / UX デザイン", custom: "カスタム" } }, testimonials: { label: "✦ クライアントの声 ✦", title: "体験した人たちの", titleAccent: "言葉。" }, contact: { label: "✦ お問い合わせ ✦", title: "何か素晴らしいものを", titleAccent: "作る準備はできていますか？", sub: "すべての素晴らしいプロジェクトは会話から始まります。", whatsapp: "WhatsApp", whatsappSub: "最速の返答", email: "メール", phone: "電話", startProject: "プロジェクトを始める" }, footer: { tagline: "単なるウェブサイトを作りません。\n体験を創ります。", navigate: "ナビゲーション", contact: "お問い合わせ", rights: "全著作権所有。", magic: "デジタルマジックを創る ✦" }, preloader: { loading: "読み込み中" } } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;