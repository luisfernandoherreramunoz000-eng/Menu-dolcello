export const WHATSAPP_NUMBER = "573044787702";

export type Size = { label: string; price: number };
export type Dish = { name: string; desc?: string; sizes: Size[]; page?: number };
export type Category = { id: string; title: string; page?: number; dishes: Dish[] };

const sml = (a: number, b: number, c: number): Size[] => [
  { label: "Standard", price: a },
  { label: "Mediano", price: b },
  { label: "Jumbo", price: c },
];
const slj = (a: number, b: number, c: number): Size[] => [
  { label: "Standard", price: a },
  { label: "Large", price: b },
  { label: "Jumbo", price: c },
];
const one = (p: number): Size[] => [{ label: "Único", price: p }];
const mg = (a: number, b: number): Size[] => [
  { label: "Mediano", price: a },
  { label: "Grande", price: b },
];

export const MENU: Category[] = [
  {
    id: "fresas",
    title: "Fresas con crema",
    page: 3,
    dishes: [
      { name: "Dolcello de la casa", page: 3, desc: "Trozos de fresas con 3 pisos de crema de la casa bañados en oreo pulverizado y salsa de tu elección.", sizes: slj(17500, 19900, 24900) },
      { name: "Chocohershey's", page: 4, desc: "Trozos de fresa con 3 pisos de crema especial de Cookies and Cream con topping de Hershey's y oreo triturada, bañado en salsa de chocolate.", sizes: sml(22900, 24900, 29900) },
      { name: "Biscolata Mood", page: 4, desc: "Trozos de fresas con 3 pisos de crema de la casa, con topping de galletas Biscolata mood, bañado en crema de avellanas.", sizes: sml(24900, 27900, 31900) },
      { name: "Brownie Nutella", page: 5, desc: "Trozos de fresa con nuestra crema de la casa y bocados de brownie bañados en salsa de Nutella.", sizes: slj(24900, 27900, 31900) },
      { name: "Chocoloco", page: 6, desc: "Trozos de fresas con 3 pisos de crema de la casa, con Piazza y M&M's, embebido en salsa de arequipe.", sizes: sml(22900, 24900, 29900) },
      { name: "Goloso", page: 6, desc: "Trozos de fresa con crema especial de la casa con bocados de galletas cubiertas de chocolate y caramelo y trocitos de torta acaramelada.", sizes: sml(22900, 25900, 29900) },
      { name: "Nutella Cream", page: 7, desc: "Trozos de fresa con 3 pisos de crema especial de avellana, topping de crema de avellana y un toque de oreo pulverizado.", sizes: sml(22900, 25900, 29900) },
      { name: "Durazno", page: 7, desc: "Trozos de fresas y durazno en almíbar, con 3 pisos de crema de la casa, oreo triturada y salsa de arequipe.", sizes: sml(21900, 23900, 27900) },
      { name: "Frutos Rojos", page: 8, desc: "Trozos de fresa, 2 pisos de granola y 3 pisos de crema especial de la casa, con frutos secos del bosque.", sizes: slj(21900, 23900, 27900) },
      { name: "Fresas bañadas en chocolate", page: 9, sizes: [{ label: "Standard", price: 14500 }, { label: "Large", price: 18500 }] },
    ],
  },
  {
    id: "waffles",
    title: "Bubble Waffles",
    page: 10,
    dishes: [
      { name: "Waffle De la casa", page: 11, desc: "Waffle burbuja con crema de la casa, helado de vainilla, salsa a elección y trozos de fresa.", sizes: one(19900) },
      { name: "Fresa & Avellana", page: 12, desc: "Waffle burbuja en cono con crema de la casa, toque de Oreo y fresas bañadas en salsa de avellana.", sizes: one(22900) },
      { name: "Brownie y arequipe", page: 12, desc: "Waffle con crema de la casa, Oreo, helado de vainilla, brownie de arequipe, fruta y salsa a elección.", sizes: one(22900) },
      { name: "Oreo Cookies & Cream", page: 13, desc: "Waffle con helado de Cookies & Cream, crema de la casa, fresas y galleta Oreo en salsa de chocolate.", sizes: one(21900) },
      { name: "Avellanas y Wafer", page: 14, desc: "Waffle con base de la casa, crema, oreo, fresas, galleta wafer de avellana y salsa de avellana.", sizes: one(25900) },
      { name: "Granola y frutas", page: 14, desc: "Waffle relleno de crema de la casa con fresas, arándanos, frutos rojos, kiwi y granola.", sizes: one(22900) },
    ],
  },
  {
    id: "crepes",
    title: "Crepes en cono",
    page: 15,
    dishes: [
      { name: "Crepe De la casa", page: 16, desc: "Crepe relleno de crema de la casa con trozos de fresas y crema de avellanas.", sizes: one(19900) },
      { name: "Crepe Arequipe", page: 17, desc: "Crepe de arequipe con tu combinación favorita.", sizes: [
        { label: "Fresas o banano", price: 17900 },
        { label: "+ maní o almendras", price: 19900 },
        { label: "+ brownie", price: 22900 },
        { label: "Crema especial + brownie", price: 24900 },
      ] },
      { name: "Crepe Avellanoso", page: 17, desc: "Crepe de avellana con tu combinación favorita.", sizes: [
        { label: "Fresas o banano", price: 18900 },
        { label: "+ pecanas o almendras", price: 20900 },
        { label: "+ brownie", price: 23900 },
        { label: "Crema especial + brownie", price: 26900 },
      ] },
    ],
  },
  {
    id: "bowls",
    title: "Bowls",
    page: 19,
    dishes: [
      { name: "Dolce Bowl", page: 19, desc: "Bowl de smoothie de la casa con yogurt griego, fresas, frutos rojos y granola.", sizes: mg(19900, 24900) },
      { name: "Sereno", page: 20, desc: "Smoothie de la casa con yogurt griego, fresa, banano, arándanos y granola.", sizes: mg(22900, 27900) },
      { name: "Oasis", page: 20, desc: "Smoothie con yogurt griego, fresa, banano, kiwi, durazno, chía y granola.", sizes: mg(23900, 28900) },
      { name: "Amarillo", page: 20, desc: "Smoothie de mango con yogurt griego, mango, durazno, almendras y granola.", sizes: mg(22900, 27900) },
      { name: "Avellana Bowl", page: 21, desc: "Bowl de crema de la casa con fresas, banano, galletas de avellana y salsa de avellanas.", sizes: mg(25900, 29900) },
      { name: "Brownie Bowl", page: 21, desc: "Bowl de crema de la casa con fresas y brownie bañados en arequipe.", sizes: mg(23900, 27900) },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    page: 23,
    dishes: [
      { name: "Smoothie Fresa Kiwi", page: 23, sizes: mg(12900, 15900) },
      { name: "Smoothie Fresa", page: 23, sizes: mg(11900, 14900) },
      { name: "Smoothie Mango", page: 23, sizes: mg(11900, 14900) },
      { name: "Smoothie Fresa Banano", page: 23, sizes: mg(12900, 15900) },
      { name: "Frozy Pitaya", page: 25, sizes: mg(13900, 16900) },
      { name: "Frozy Mango", page: 25, sizes: mg(12900, 15900) },
      { name: "Frozy Fresa", page: 25, sizes: mg(12900, 15900) },
      { name: "Agua cristal", sizes: one(3500) },
      { name: "Té Hatsu", sizes: one(6500) },
      { name: "Soda", sizes: one(5500) },
      { name: "Espresso", sizes: one(5000) },
      { name: "Americano", sizes: one(6000) },
      { name: "Cappuccino", sizes: one(6000) },
      { name: "Tinto tradicional", sizes: one(5000) },
      { name: "Frappé de fresa", sizes: one(10900) },
      { name: "Limonada de fresa", sizes: one(11900) },
      { name: "Limonada frappé natural", sizes: one(10900) },
    ],
  },
];

export const formatCOP = (n: number) => "$" + n.toLocaleString("es-CO");
