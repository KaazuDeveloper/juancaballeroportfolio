export const profile = {
  name: "Juan Caballero",
  role: "Desarrollador fullstack",
  location: "Córdoba y provincia",
  timezone: "Europe/Madrid",
  email: "juan.antonioccpp@gmail.com",
  linkedin: "https://www.linkedin.com/in/juanancaballero",
  itch: "https://itch.io/profile/kaazu-13",
  cv: "/cv-juan-caballero.pdf",
  languages: "ES · EN · IT",
  currently: "Soluciones Informáticas M.J",
  year: "2026",
};

export type Tint = "blue" | "green" | "orange" | "red" | "purple" | "pink" | "indigo" | "teal";
export type IconName = "phone" | "store" | "shop" | "building" | "activity" | "gamepad";

export type Game = {
  title: string;
  blurb: string;
  jam: string;
  url: string;
  cover: string;
};

export type Project = {
  title: string;
  icon: IconName;
  tint: Tint;
  kind: string;
  year: string;
  context: string;
  summary: string;
  details: string[];
  stack: string[];
  games?: Game[];
  url?: string;
};

export const projects: Project[] = [
  {
    title: "La Caja Caballero",
    icon: "shop",
    tint: "orange",
    kind: "Tienda online · proyecto de fin de grado",
    year: "2024 — 26",
    context: "Proyecto de fin de grado",
    summary:
      "Tienda de cajones flamencos con personalizador 3D: eliges la madera, pintas la tapa y ves el resultado antes de comprarlo.",
    details: [
      "Personalizador en 3D con Three.js y editor de dibujo sobre la tapa con Fabric.js.",
      "Front en Angular, API en Node con Express y base de datos MongoDB.",
      "Pagos con Stripe, registro con verificación por correo y panel de administración.",
      "Actualizado a Angular 22, rediseñado entero y con la API protegida por tokens y pruebas automatizadas.",
      "La demo publicada funciona con datos ficticios y pagos simulados.",
    ],
    stack: ["Angular", "Node.js", "Express", "MongoDB", "Three.js", "Stripe"],
    url: "https://cajonescaballero.vercel.app",
  },
  {
    title: "TPV y comandero",
    icon: "store",
    tint: "green",
    kind: "Hostelería · escritorio y móvil",
    year: "2025",
    context: "Soluciones Informáticas M.J",
    summary:
      "El sistema de punto de venta con el que bares y restaurantes trabajan cada día, y el comandero con el que los camareros toman las comandas desde el móvil.",
    details: [
      "TPV de escritorio en .NET con Windows Forms y componentes de Telerik.",
      "Comandero en Flutter, compilado para Android e iOS desde un solo código.",
      "El comandero se conecta a un servidor ASP.NET del que obtiene los datos.",
    ],
    stack: [".NET", "Windows Forms", "Telerik", "Flutter", "ASP.NET"],
  },
  {
    title: "ERP y servicios web",
    icon: "building",
    tint: "blue",
    kind: "Producto interno",
    year: "2024 — 25",
    context: "Iconos Software",
    summary:
      "Desarrollo y mantenimiento de un ERP en producción, de sus servicios web y de las aplicaciones web conectadas a él.",
    details: [
      "Librerías en .NET 8 y aplicaciones de escritorio con Windows Forms.",
      "Aplicaciones web con Angular, MySQL, PHP y JavaScript.",
      "Desarrollo y mantenimiento de servicios web.",
    ],
    stack: [".NET 8", "Angular", "MySQL", "PHP"],
  },
  {
    title: "Monitorización con ELK",
    icon: "activity",
    tint: "purple",
    kind: "Infraestructura",
    year: "2024",
    context: "Tesar S.p.A — Italia",
    summary:
      "Implanté el stack ELK para mejorar la monitorización y el análisis de datos de la empresa.",
    details: [
      "Elasticsearch, Logstash y Kibana para recoger, procesar y visualizar los datos.",
      "Pruebas automatizadas con Selenium para asegurar la calidad del software.",
      "Nuevos componentes en Angular.",
    ],
    stack: ["Elasticsearch", "Logstash", "Kibana", "Selenium", "Angular"],
  },
  {
    title: "Videojuegos",
    icon: "gamepad",
    tint: "pink",
    kind: "Game jams",
    year: "2022 — 25",
    context: "Málaga Game Jam",
    summary:
      "Juegos completos hechos en un fin de semana, con un tema que se desvela al empezar y el reloj en contra.",
    details: ["Desarrollo en Unity3D y C#."],
    stack: ["Unity3D", "C#"],
    games: [
      {
        title: "Tapiocat",
        blurb: "Un gato flota dentro de un bubble tea esquivando perlas de tapioca y cubitos de hielo.",
        jam: "MálagaJam Weekend 19",
        url: "https://kaazu-13.itch.io/tapiocat",
        cover: "https://img.itch.zone/aW1nLzE5NTQyMDExLmpwZWc=/315x250%23c/nEpnEw.jpeg",
      },
      {
        title: "Time for Us",
        blurb: "Dos ranitas empiezan de cero en una charca después del fin del mundo, entre minijuegos y música lo-fi.",
        jam: "MálagaJam Weekend 16",
        url: "https://xneriss.itch.io/time-for-us",
        cover: "https://img.itch.zone/aW1nLzEyOTY1OTQ2LnBuZw==/315x250%23c/2%2FJa%2FL.png",
      },
    ],
  },
];

export type TimelineKind = "trabajo" | "juegos" | "formacion";

export type TimelineItem = {
  org: string;
  role: string;
  place: string;
  kind: TimelineKind;
  /* Year + month as "YYYY-MM"; `to: null` means ongoing. */
  from: string;
  to: string | null;
  period: string;
  note: string;
};

export const timeline: TimelineItem[] = [
  {
    org: "Soluciones Informáticas M.J",
    role: "Desarrollador multiplataforma",
    place: "Córdoba",
    kind: "trabajo",
    from: "2025-10",
    to: null,
    period: "Oct 2025 — hoy",
    note: "TPV para hostelería y comandero móvil con Flutter.",
  },
  {
    org: "Iconos Software",
    role: "Desarrollador multiplataforma",
    place: "Córdoba",
    kind: "trabajo",
    from: "2024-09",
    to: "2025-10",
    period: "Sep 2024 — Oct 2025",
    note: "ERP, servicios web y aplicaciones con .NET, Angular y MySQL.",
  },
  {
    org: "Tesar S.p.A",
    role: "Desarrollador multiplataforma",
    place: "Italia",
    kind: "trabajo",
    from: "2024-03",
    to: "2024-06",
    period: "Mar — Jun 2024",
    note: "Stack ELK, pruebas con Selenium y componentes en Angular.",
  },
  {
    org: "IES Trassierra",
    role: "Técnico Superior en Desarrollo de Aplicaciones Web",
    place: "Córdoba",
    kind: "formacion",
    from: "2022-09",
    to: "2024-06",
    period: "2022 — 2024",
    note: "Ciclo formativo de grado superior.",
  },
  {
    org: "Málaga Game Jam",
    role: "Desarrollador de videojuegos",
    place: "Málaga",
    kind: "juegos",
    from: "2022-01",
    to: "2025-12",
    period: "2022 — 2025",
    note: "Juegos completos en un fin de semana con Unity3D y C#.",
  },
];

export const platforms = [
  { label: "Escritorio", name: "Windows", note: "TPV y ERP con .NET y Windows Forms", tint: "blue" },
  { label: "Navegador", name: "Web", note: "Angular, Vue.js, PHP y ASP.NET", tint: "teal" },
  { label: "Móvil", name: "Android", note: "Comandero con Flutter", tint: "green" },
  { label: "Móvil", name: "iOS", note: "La misma app, desde el mismo código", tint: "indigo" },
] as const;

export const stack = [
  {
    group: "Backend y escritorio",
    items: [".NET 8", "ASP.NET", "C#", "Windows Forms", "Telerik", "Node.js", "PHP", "Java"],
  },
  {
    group: "Frontend y móvil",
    items: ["Angular", "Vue.js", "Flutter", "JavaScript", "HTML y CSS", "Bootstrap"],
  },
  {
    group: "Datos y calidad",
    items: ["MySQL", "Elasticsearch", "Logstash", "Kibana", "Selenium"],
  },
  {
    group: "Juegos",
    items: ["Unity3D", "C#"],
  },
];
