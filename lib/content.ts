export const profile = {
  name: "Juan Caballero",
  role: "Desarrollador fullstack",
  location: "Córdoba y provincia",
  timezone: "Europe/Madrid",
  email: "juan.antonioccpp@gmail.com",
  linkedin: "https://www.linkedin.com/in/juanancaballero",
  cv: "/cv-juan-caballero.pdf",
  languages: "ES · EN · IT",
  currently: "Soluciones Informáticas M.J",
  year: "2026",
};

export type Tint = "blue" | "green" | "orange" | "red" | "purple" | "pink" | "indigo" | "teal";
export type IconName = "phone" | "store" | "building" | "activity" | "gamepad";

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
};

export const projects: Project[] = [
  {
    title: "Comandero móvil",
    icon: "phone",
    tint: "orange",
    kind: "App multiplataforma",
    year: "2025",
    context: "Soluciones Informáticas M.J",
    summary:
      "Una app para que los camareros tomen las comandas desde el móvil. Un solo código que se compila para Android y para iOS.",
    details: [
      "Desarrollada con Flutter como app nativa para Android e iOS.",
      "Se conecta a un servidor ASP.NET del que obtiene los datos.",
    ],
    stack: ["Flutter", "ASP.NET"],
  },
  {
    title: "TPV para hostelería",
    icon: "store",
    tint: "green",
    kind: "Software de escritorio",
    year: "2025",
    context: "Soluciones Informáticas M.J",
    summary:
      "Un sistema de punto de venta pensado para hostelería: el programa con el que bares y restaurantes trabajan cada día.",
    details: [
      "Aplicación de escritorio en .NET con Windows Forms.",
      "Interfaz construida con los componentes de Telerik.",
    ],
    stack: [".NET", "Windows Forms", "Telerik"],
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
      "Aplicaciones web con Angular, SQL Server, PHP y JavaScript.",
      "Desarrollo y mantenimiento de servicios web.",
    ],
    stack: [".NET 8", "Angular", "SQL Server", "PHP"],
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
  },
];

export const experience = [
  {
    period: "2025 — hoy",
    role: "Desarrollador multiplataforma",
    company: "Soluciones Informáticas M.J",
    place: "Córdoba",
  },
  {
    period: "2024 — 2025",
    role: "Desarrollador multiplataforma",
    company: "Iconos Software",
    place: "Córdoba",
  },
  {
    period: "2024",
    role: "Desarrollador multiplataforma",
    company: "Tesar S.p.A",
    place: "Italia",
  },
  {
    period: "2022 — 2025",
    role: "Desarrollador de videojuegos",
    company: "Málaga Game Jam",
    place: "Málaga",
  },
];

export const education = "Técnico Superior en Desarrollo de Aplicaciones Web — IES Trassierra, 2024";

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
    items: ["SQL Server", "Elasticsearch", "Logstash", "Kibana", "Selenium"],
  },
  {
    group: "Juegos",
    items: ["Unity3D", "C#"],
  },
];
