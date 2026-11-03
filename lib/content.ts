/**
 * Contenido y configuración de la landing.
 * Todo el copy vive aquí para que los componentes sean puramente presentacionales.
 */

export const site = {
  title: "IRYA — Viaja mejor. Juntos.",
  description:
    "Comparte trayectos, conecta con otros viajeros y muévete entre ciudades de una forma más simple.",
  /** Fin de la cuenta regresiva: medianoche en la zona horaria del navegador (sin offset). */
  launchDate: "2027-08-13T00:00:00",
  year: 2026,
} as const;

export const links = {
  download: "#descargar",
  signup: "#registro",
  features: "#funciones",
  /** TODO: reemplazar por las rutas/tiendas reales cuando existan. */
  appStore: "https://apps.apple.com/",
  exploreTrips: "#encuentra",
  publishTrip: "#publica",
  about: "#confianza",
  /** Página "Conócenos" (sin tilde en la URL para que no se codifique como %C3%B3). */
  aboutPage: "/conocenos",
  /** TODO: reemplazar por el correo o canal de soporte real. */
  contact: "mailto:hola@irya.app",
} as const;

export const navbar = {
  cta: { label: "Download App", href: links.download },
  /** Enlaces del menú desplegable en mobile. */
  menu: [
    { label: "Funciones", href: `/${links.features}` },
    { label: "Regístrate", href: `/${links.signup}` },
  ],
};

export const hero = {
  badge: "Lanzamiento pronto",
  title: "Tu próximo viaje empieza con IRYA",
  description:
    "Comparte trayectos, conecta con otros viajeros y muévete entre ciudades de una forma más simple.",
  waitlist: "1500+ personas ya esperan IRYA.",
};

export const signupForm = {
  placeholder: "tucorreo@mail.com",
  submit: "Registrate",
  success: "¡Gracias!",
  error: "Algo salió mal",
};

export const countdownLabels = {
  days: "Días",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
} as const;

export const countdownEndMessage = "¡Ya llegó IRYA!";

/** Orden de pintado: el último queda encima (como en el diseño). */
export const waitlistAvatars = [
  { src: "/images/avatars/avatar-1.jpg", alt: "" },
  { src: "/images/avatars/avatar-2.jpg", alt: "" },
  { src: "/images/avatars/avatar-3.jpg", alt: "" },
];

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Capturas de pantalla de la app (assets originales del proyecto Framer). */
export const screens = {
  login: {
    src: "/images/screens/screen-login.png",
    alt: "Pantalla de inicio de sesión de la app IRYA",
    width: 628,
    height: 1393,
  },
  trips: {
    src: "/images/screens/screen-trips.png",
    alt: "Listado de viajes disponibles en la app IRYA",
    width: 628,
    height: 1393,
  },
  tripDetail: {
    src: "/images/screens/screen-trip-detail.png",
    alt: "Detalle de un viaje en la app IRYA",
    width: 628,
    height: 1393,
  },
  signup: {
    src: "/images/screens/screen-signup.png",
    alt: "Pantalla de registro de la app IRYA",
    width: 628,
    height: 1393,
  },
  tripConfirmed: {
    src: "/images/screens/screen-trip-confirmed.png",
    alt: "Confirmación de un viaje reservado en la app IRYA",
    width: 1024,
    height: 1536,
  },
} satisfies Record<string, Screen>;

/** Marco rasterizado del teléfono del CTA final (pantalla transparente). */
export const phoneFrame = { src: "/images/screens/phone-frame.png", width: 864, height: 1748 };

export const featuresIntro = {
  badge: "Funciones",
  title: "Viajar juntos debería ser así de simple",
  description:
    "IRYA conecta a personas que van hacia el mismo destino para que puedan compartir el trayecto de forma sencilla, organizada y segura.",
};

/** Orientación 3D del teléfono en desktop (grados). */
export type DeviceTilt = { x: number; y: number; z: number };

export type Feature = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  secondaryCta: { label: string; href: string };
  primaryCta: { label: string; href: string };
  screen: Screen;
  deviceSide: "left" | "right";
  tilt: DeviceTilt;
};

const tiltRight: DeviceTilt = { x: 10, y: -17, z: 9 };
const tiltLeft: DeviceTilt = { x: 10, y: 17, z: -9 };

export const features: Feature[] = [
  {
    id: "encuentra",
    title: "Encuentra tu próximo viaje",
    description:
      "Indica desde dónde sales y hacia dónde vas. IRYA te muestra los viajes disponibles para que puedas elegir el que mejor encaje con tu ruta y horario.",
    bullets: [
      "Busca por origen y destino",
      "Compara horarios y puntos de encuentro",
      "Conoce al conductor antes de reservar",
    ],
    secondaryCta: { label: "Más info", href: links.aboutPage },
    primaryCta: { label: "Explorar viajes", href: links.exploreTrips },
    screen: screens.login,
    deviceSide: "right",
    tilt: tiltRight,
  },
  {
    id: "publica",
    title: "Publica y comparte tu ruta",
    description:
      "Publica tu trayecto, indica cuándo sales y cuántas plazas tienes disponibles. Encuentra personas que viajan en tu misma dirección y comparte los gastos del viaje.",
    bullets: [
      "Publica tu ruta en pocos pasos",
      "Define horario y plazas disponibles",
      "Tú decides con quién compartir el viaje",
    ],
    secondaryCta: { label: "Más info", href: links.aboutPage },
    primaryCta: { label: "Publicar un viaje", href: links.publishTrip },
    screen: screens.trips,
    deviceSide: "left",
    tilt: tiltLeft,
  },
  {
    id: "confianza",
    title: "Más confianza en cada trayecto",
    description:
      "IRYA está diseñada para que pasajeros y conductores puedan conocerse mejor antes de viajar, con perfiles, verificaciones y la información necesaria para tomar una decisión con confianza.",
    bullets: [
      "Perfiles de pasajeros y conductores",
      "Verificación de identidad",
      "Valoraciones después de cada viaje",
    ],
    secondaryCta: { label: "Más info", href: links.aboutPage },
    primaryCta: { label: "Conocer IRYA", href: links.about },
    screen: screens.tripDetail,
    deviceSide: "right",
    tilt: tiltRight,
  },
];

/* ---------- Página /conocenos ---------- */

export const aboutIntro = {
  badge: "Funcionalidades",
  title: "Viajar nunca fue tan fácil.",
};

export type AboutFeature = {
  id: string;
  title: string;
  description: string;
  /**
   * Placeholder: pantalla real de la app recortada dentro de un panel.
   * TODO: sustituir por las imágenes compuestas exportadas de Framer (con las tarjetas flotantes).
   */
  screen: Screen;
  /** Parte del teléfono que queda visible dentro del panel. */
  crop: "top" | "bottom";
  mediaSide: "left" | "right";
};

export const aboutFeatures: AboutFeature[] = [
  {
    id: "confianza",
    title: "Viaja con más confianza desde el primer momento.",
    description:
      "Perfiles verificados para que conductores y pasajeros sepan con quién compartirán el trayecto antes de empezar el viaje.",
    screen: screens.tripDetail,
    crop: "bottom",
    mediaSide: "right",
  },
  {
    id: "opciones",
    title: "Elige lo que mejor encaje contigo. Más horarios. Mejores precios.",
    description:
      "Encuentra distintas opciones de salida según tu ruta y escoge la que mejor se adapte a ti.",
    screen: screens.trips,
    crop: "top",
    mediaSide: "left",
  },
  {
    id: "simple",
    title: "Todo más simple, desde que sales hasta que llegas.",
    description:
      "Busca rutas, revisa horarios, reserva tu asiento, coordina con el conductor y gestiona tu viaje desde un solo lugar.",
    screen: screens.tripConfirmed,
    crop: "top",
    mediaSide: "right",
  },
];

export const faqIntro = {
  badge: "FAQs",
  title: "Todo claro antes de empezar el viaje.",
  description: "Todo lo que necesitas saber sobre cómo funciona IRYA antes de empezar a viajar.",
};

export const faqs = [
  {
    question: "¿Qué es IRYA?",
    answer:
      "IRYA es una app de carsharing que conecta a conductores con asientos disponibles y pasajeros que viajan hacia el mismo destino, para compartir el trayecto de forma más simple, flexible y económica.",
  },
  {
    question: "¿Cómo funciona la seguridad en IRYA?",
    answer:
      "IRYA contará con perfiles verificados para pasajeros y conductores, de modo que ambas partes puedan saber con quién compartirán el viaje antes de iniciar el trayecto.",
  },
  {
    question: "¿Cómo publico un viaje?",
    answer:
      "Si vas a conducir, solo tendrás que indicar tu origen, destino, fecha, horario y los asientos disponibles. Tu viaje aparecerá en IRYA para que pasajeros que recorran una ruta compatible puedan encontrarlo y reservar.",
  },
  {
    question: "¿Cómo reservo un viaje?",
    answer:
      "Busca tu ruta, compara los horarios y viajes disponibles, elige la opción que mejor se adapte a ti y reserva tu asiento directamente desde IRYA.",
  },
];

export const contactCard = {
  title: "¿Te quedó alguna duda?",
  description:
    "Si no encuentras la respuesta que buscas, escríbenos. Estaremos encantados de ayudarte.",
  cta: { label: "Contáctanos", href: links.contact },
};

export const downloadCta = {
  title: "Mismos destinos. Mejores historias.",
  cta: { label: "Download App", href: links.appStore },
};

export const footer = {
  tagline: "Viajar nunca fue tan fácil.",
  signupTitle: "Viaja mejor. Juntos.",
  signupDescription:
    "Comparte trayectos, conecta viajeros y muévete entre ciudades de una forma más simple.",
  copyright: `© ${site.year} - irya`,
};

/** TODO: reemplazar por los perfiles oficiales. */
export const socialLinks = [
  { network: "facebook", label: "Facebook", href: "https://facebook.com" },
  { network: "instagram", label: "Instagram", href: "https://instagram.com" },
  { network: "tiktok", label: "TikTok", href: "https://tiktok.com" },
] as const;

export type SocialNetwork = (typeof socialLinks)[number]["network"];
