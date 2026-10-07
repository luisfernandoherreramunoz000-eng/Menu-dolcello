import { createFileRoute, Link } from "@tanstack/react-router";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/qr")({
  head: () => ({
    meta: [
      { title: "Código QR · Menú Dolcello" },
      { name: "description", content: "Escanea el código QR para abrir el menú digital de Dolcello." },
      { property: "og:title", content: "Código QR · Menú Dolcello" },
      { property: "og:description", content: "Escanea para ver el menú y pedir por WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QrPage,
});

function QrPage() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.origin + "/"), []);
  const download = () => {
    const c = document.querySelector<HTMLCanvasElement>("#qr canvas");
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "qr-menu-dolcello.png";
    a.click();
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-primary px-4 text-center text-primary-foreground">
      <h1 className="font-display text-5xl">Dolcello</h1>
      <p>Escanea para ver nuestro menú 🍓</p>
      <div id="qr" className="rounded-3xl bg-card p-5">
        {url && <QRCodeCanvas value={url} size={280} marginSize={1} />}
      </div>
      <p className="text-xs opacity-80 break-all">{url}</p>
      <div className="flex gap-3">
        <button onClick={download} className="rounded-full bg-card px-5 py-2 font-bold text-primary">Descargar QR</button>
        <Link to="/" className="rounded-full border border-primary-foreground/60 px-5 py-2">Ver menú</Link>
      </div>
    </div>
  );
}
