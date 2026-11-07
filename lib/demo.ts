/* Illustrative data shown on the device screens (2D mockups and the 3D scene). */

export const products = [
  { name: "Café con leche", price: "1,40", color: "#a2845e" },
  { name: "Caña", price: "1,80", color: "#f5b014" },
  { name: "Tinto de verano", price: "2,50", color: "#c0392b" },
  { name: "Agua", price: "1,20", color: "#5ac8fa" },
  { name: "Tostada", price: "2,50", color: "#e08e45" },
  { name: "Salmorejo", price: "4,50", color: "#ff6b4a" },
  { name: "Flamenquín", price: "8,00", color: "#d4a017" },
  { name: "Berenjenas", price: "6,50", color: "#8e44ad" },
  { name: "Refresco", price: "2,20", color: "#ff375f" },
  { name: "Croquetas", price: "7,00", color: "#c08a3e" },
  { name: "Ensalada", price: "6,00", color: "#34c759" },
  { name: "Tarta", price: "4,00", color: "#af52de" },
];

export const ticket = [
  { qty: 2, name: "Caña", total: "3,60" },
  { qty: 1, name: "Salmorejo", total: "4,50" },
  { qty: 1, name: "Flamenquín", total: "8,00" },
];

export const order = [
  { name: "Caña", note: "Bebidas", qty: 2, price: "1,80" },
  { name: "Salmorejo", note: "Raciones", qty: 1, price: "4,50" },
  { name: "Flamenquín", note: "Raciones", qty: 1, price: "8,00" },
  { name: "Café con leche", note: "Cafés", qty: 0, price: "1,40" },
  { name: "Tarta de queso", note: "Postres", qty: 0, price: "4,00" },
];

const kw = "#569cd6";
const ty = "#4ec9b0";
const fn = "#dcdcaa";
const st = "#ce9178";
const va = "#9cdcfe";
const cm = "#6a9955";
const tx = "#d4d4d4";

export type Token = [string, string];

/* A small, generic API endpoint: what the client asked for, turned into code. */
export const CODE: Token[][] = [
  [["[", tx], ["ApiController", ty], ["]", tx]],
  [["[", tx], ["Route", ty], ["(", tx], ['"api/pedidos"', st], [")]", tx]],
  [["public class ", kw], ["PedidosController", ty], [" : ", tx], ["ControllerBase", ty]],
  [["{", tx]],
  [["    private readonly ", kw], ["AppDbContext", ty], [" _db", va], [";", tx]],
  [],
  [["    [", tx], ["HttpPost", ty], ["]", tx]],
  [
    ["    public async ", kw], ["Task", ty], ["<", tx], ["IActionResult", ty], ["> ", tx],
    ["Crear", fn], ["(", tx], ["PedidoDto ", ty], ["dto", va], [")", tx],
  ],
  [["    {", tx]],
  [
    ["        var ", kw], ["pedido", va], [" = ", tx], ["new ", kw], ["Pedido", ty], ["(", tx],
    ["dto", va], [".", tx], ["Cliente", va], [", ", tx], ["dto", va], [".", tx], ["Lineas", va], [");", tx],
  ],
  [["        _db", va], [".", tx], ["Pedidos", va], [".", tx], ["Add", fn], ["(", tx], ["pedido", va], [");", tx]],
  [["        await ", kw], ["_db", va], [".", tx], ["SaveChangesAsync", fn], ["();", tx]],
  [["        return ", kw], ["Ok", fn], ["(", tx], ["pedido", va], [".", tx], ["Id", va], ["); ", tx], ["// listo", cm]],
  [["    }", tx]],
  [["}", tx]],
];

export const CODE_FILES = [
  { name: "App.API", depth: 0 },
  { name: "Controllers", depth: 1 },
  { name: "PedidosController.cs", depth: 2, active: true },
  { name: "Models", depth: 1 },
  { name: "Pedido.cs", depth: 2 },
  { name: "AppDbContext.cs", depth: 1 },
];

/* Illustrative conversation with a client: first the brief, at the end the delivery. */
export const CHAT: { from: "client" | "me"; text: string }[] = [
  { from: "client", text: "Hola Juan. Ahora lo apuntamos todo en papel y luego lo pasamos a mano al ordenador." },
  { from: "me", text: "¡Hola! Cuéntame cómo es un día normal en vuestro negocio." },
  { from: "client", text: "Recibimos pedidos todo el día y perdemos mucho tiempo copiándolos." },
  { from: "me", text: "Perfecto, os preparo una propuesta y empezamos." },
  { from: "me", text: "Ya está publicado. Os paso el acceso." },
  { from: "client", text: "¡Funciona genial, gracias!" },
];

export const TESTS = [
  "Inicio de sesión",
  "Crear pedido",
  "Editar pedido",
  "Calcular totales",
  "Permisos de usuario",
  "Exportar informe",
  "Sincronizar con el móvil",
  "Copia de seguridad",
];

export const DEPLOY_STEPS = ["Compilación", "Pruebas", "Base de datos MySQL", "Servidor de producción"];
