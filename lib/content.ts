/**
 * Contenido y configuración de la landing.
 * Todo el copy vive aquí para que los componentes sean puramente presentacionales.
 */

export const site = {
  title: "IRYA — Viaja mejor. Juntos.",
  description:
    "Comparte trayectos, conecta con otros viajeros y muévete entre ciudades de una forma más simple.",
  /** Fecha de lanzamiento usada por la cuenta regresiva (ISO, hora de Lima). */
  launchDate: "2027-08-12T09:00:00-05:00",
  year: 2026,
} as const;

export const links = {
  download: "#descargar",
  signup: "#registro",
  features: "#funciones",
  /** TODO: reemplazar por las rutas reales cuando existan. */
  exploreTrips: "#funciones",
  publishTrip: "#funciones",
  about: "#funciones",
} as const;

export const navbar = {
  cta: { label: "Download App", href: links.download },
  /** Enlaces del menú desplegable en mobile. */
  menu: [
    { label: "Funciones", href: links.features },
    { label: "Regístrate", href: links.signup },
  ],
};

export const hero = {
  badge: "Lanzamiento pronto",
  title: ["Tu próximo viaje", "empieza con IRYA"],
  description:
    "Comparte trayectos, conecta con otros viajeros y muévete entre ciudades de una forma más simple.",
  waitlist: "1500+ personas ya esperan IRYA.",
};

export const signupForm = {
  placeholder: "tucorreo@mail.com",
  submit: "Regístrate",
  success: "¡Listo! Te avisaremos cuando IRYA esté disponible.",
  invalid: "Ingresa un correo válido.",
};

export const countdownLabels = {
  days: "Días",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
} as const;

/** Placeholders: reemplazar por fotos reales de la comunidad. */
export const waitlistAvatars = [
  { src: "/images/avatars/avatar-1.svg", alt: "" },
  { src: "/images/avatars/avatar-2.svg", alt: "" },
  { src: "/images/avatars/avatar-3.svg", alt: "" },
];

export type Mockup = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * PLACEHOLDERS: recortes de los screenshots de referencia.
 * Reemplazar por los exports originales (PNG transparente) desde Figma
 * manteniendo el mismo nombre de archivo y relación de aspecto.
 */
export const mockups = {
  login: {
    src: "/images/mockups/phone-login.png",
    alt: "Pantalla de inicio de sesión de la app IRYA",
    width: 820,
    height: 1264,
  },
  trips: {
    src: "/images/mockups/phone-trips.png",
    alt: "Listado de viajes disponibles en la app IRYA",
    width: 804,
    height: 1272,
  },
  tripDetail: {
    src: "/images/mockups/phone-trip-detail.png",
    alt: "Detalle de un viaje en la app IRYA",
    width: 796,
    height: 1256,
  },
  signup: {
    src: "/images/mockups/phone-signup.png",
    alt: "Pantalla de registro de la app IRYA",
    width: 1048,
    height: 712,
  },
  tripConfirmed: {
    src: "/images/mockups/phone-trip-confirmed.png",
    alt: "Confirmación de un viaje reservado en la app IRYA",
    width: 680,
    height: 692,
  },
} satisfies Record<string, Mockup>;

export const featuresIntro = {
  badge: "Funciones",
  title: "Viajar juntos debería ser así de simple",
  description:
    "IRYA conecta a personas que van hacia el mismo destino para que puedan compartir el trayecto de forma sencilla, organizada y segura.",
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  secondaryCta: { label: string; href: string };
  primaryCta: { label: string; href: string };
  mockup: Mockup;
  mockupSide: "left" | "right";
};

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
    secondaryCta: { label: "Más info", href: links.about },
    primaryCta: { label: "Explorar viajes", href: links.exploreTrips },
    mockup: mockups.login,
    mockupSide: "right",
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
    secondaryCta: { label: "Más info", href: links.about },
    primaryCta: { label: "Publicar un viaje", href: links.publishTrip },
    mockup: mockups.trips,
    mockupSide: "left",
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
    secondaryCta: { label: "Más info", href: links.about },
    primaryCta: { label: "Conocer IRYA", href: links.about },
    mockup: mockups.tripDetail,
    mockupSide: "right",
  },
];

export const downloadCta = {
  title: ["Mismos destinos.", "Mejores historias."],
  cta: { label: "Download App", href: "#" },
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
