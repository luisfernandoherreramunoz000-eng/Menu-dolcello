import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import pdfAsset from "@/assets/menu-dolcello.pdf.asset.json";
import { MENU, WHATSAPP_NUMBER, formatCOP, type Dish } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dolcello · Menú digital" },
      { name: "description", content: "Menú de Dolcello: fresas con crema, bubble waffles, crepes, bowls y bebidas. Pide por WhatsApp." },
      { property: "og:title", content: "Dolcello · Menú digital" },
      { property: "og:description", content: "Fresas con crema, waffles, crepes y bowls. Pide por WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type CartItem = { key: string; name: string; label?: string | undefined; price: number; qty: number };

function DishCard({ dish, onAdd }: { dish: Dish; onAdd: (i: Omit<CartItem, "qty">) => void }) {
  const [sel, setSel] = useState(0);
  const size = dish.sizes[sel] ?? dish.sizes[0];
  const [added, setAdded] = useState(false);
  if (!size) return null;
  const multi = dish.sizes.length > 1;
  const add = () => {
    onAdd({ key: `${dish.name}|${sel}`, name: dish.name, label: multi ? size.label : undefined, price: size.price });
    setAdded(true); setTimeout(() => setAdded(false), 1200);
  };
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
      {dish.page && (
        <img src={`/menu/p-${String(dish.page).padStart(2, "0")}.jpg`} alt={dish.name} loading="lazy" className="block h-auto w-full object-contain" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-2xl leading-tight text-primary">{dish.name}</h3>
        {dish.desc && <p className="text-sm text-muted-foreground">{dish.desc}</p>}
        {multi && (
          <div className="relative z-0 flex flex-wrap gap-2">
            {dish.sizes.map((s, i) => (
              <button type="button" key={i} onClick={() => setSel(i)} aria-pressed={i === sel}
                className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${i === sel ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-secondary-foreground"}`}>
                {s.label} · {formatCOP(s.price)}
              </button>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="font-display text-2xl text-foreground">{formatCOP(size.price)}</span>
          <button type="button" onClick={add}
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-whatsapp-foreground shadow hover:opacity-90">
            {added ? "✓ Agregado" : "+ Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const addItem = (it: Omit<CartItem, "qty">) => setCart((c) => {
    const f = c.find((x) => x.key === it.key);
    return f ? c.map((x) => (x.key === it.key ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...it, qty: 1 }];
  });
  const changeQty = (key: string, d: number) => setCart((c) => c.map((x) => (x.key === key ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0));
  const count = cart.reduce((n, x) => n + x.qty, 0);
  const total = cart.reduce((n, x) => n + x.qty * x.price, 0);
  const msg = `¡Hola Dolcello! 🍓 Quiero pedir:\n${cart.map((x) => `• ${x.qty} x ${x.name}${x.label ? ` (${x.label})` : ""} - ${formatCOP(x.qty * x.price)}`).join("\n")}\n\nTotal: ${formatCOP(total)}`;
  const orderHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary px-4 pb-10 pt-12 text-center text-primary-foreground">
        <p className="text-xs tracking-[0.4em]">MENÚ DIGITAL</p>
        <h1 className="font-display text-6xl">Dolcello</h1>
        <p className="mt-2 text-sm opacity-90">¿Unas fresas o te freseas? 🍓 Elige tu plato y pídelo por WhatsApp</p>
        <div className="mt-4 flex justify-center gap-3 text-xs">
          <a href={pdfAsset.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary-foreground/50 px-3 py-1">Ver menú PDF</a>
          <Link to="/qr" className="rounded-full border border-primary-foreground/50 px-3 py-1">Código QR</Link>
        </div>
      </header>
      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-background/95 px-4 py-3 backdrop-blur">
        {MENU.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">{c.title}</a>
        ))}
      </nav>
      <main className="mx-auto max-w-6xl space-y-12 px-4 pb-32 pt-8">
        {MENU.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-16">
            <h2 className="mb-5 font-display text-4xl text-primary">{c.title}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.dishes.map((d) => <DishCard key={d.name} dish={d} onAdd={addItem} />)}
            </div>
          </section>
        ))}
        <section className="rounded-3xl bg-card p-6">
          <h2 className="mb-3 font-display text-3xl text-primary">Elige tus adiciones</h2>
          <p className="text-sm text-muted-foreground">Toppings clase 1 +$1.500 · Clase 2 +$4.000 · Clase 3 +$5.000 · Helados +$5.000 · Frutas +$1.500 (banano +$1.000). Indícalas en tu mensaje de WhatsApp.</p>
          <img src="/menu/p-27.jpg" alt="Toppings" loading="lazy" className="mt-4 w-full max-w-md rounded-2xl" />
        </section>
      </main>
      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card p-3 shadow-2xl">
          {open && (
            <ul className="mx-auto mb-3 max-h-64 max-w-xl space-y-2 overflow-y-auto">
              {cart.map((x) => (
                <li key={x.key} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex-1">{x.name}{x.label ? ` (${x.label})` : ""}<br /><span className="text-muted-foreground">{formatCOP(x.price * x.qty)}</span></span>
                  <button type="button" onClick={() => changeQty(x.key, -1)} className="h-8 w-8 rounded-full bg-secondary font-bold">−</button>
                  <span className="w-5 text-center font-bold">{x.qty}</span>
                  <button type="button" onClick={() => changeQty(x.key, 1)} className="h-8 w-8 rounded-full bg-secondary font-bold">+</button>
                </li>
              ))}
            </ul>
          )}
          <div className="mx-auto flex max-w-xl items-center gap-2">
            <button type="button" onClick={() => setOpen(!open)} className="flex-1 rounded-full bg-secondary px-4 py-3 text-left text-sm font-semibold text-secondary-foreground">
              🛒 {count} producto{count > 1 ? "s" : ""} · {formatCOP(total)} {open ? "▾" : "▴"}
            </button>
            <a href={orderHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-whatsapp-foreground shadow">Pedir por WhatsApp</a>
          </div>
        </div>
      ) : (
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-20 rounded-full bg-whatsapp px-5 py-3 font-bold text-whatsapp-foreground shadow-lg">WhatsApp</a>
      )}
    </div>
  );
}
