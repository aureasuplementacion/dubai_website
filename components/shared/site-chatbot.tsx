"use client";

import Link from "next/link";
import { FormEvent, PointerEvent, useRef, useState } from "react";
import { Bot, ChevronDown, Send, UserRound } from "lucide-react";

type ChatMessage = { id: string; from: "bot" | "user"; text: string };
type ChatPosition = { left: number; top: number };

export function SiteChatbot({ locale }: { locale: string }) {
  const english = locale === "en";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<ChatPosition | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: "welcome", from: "bot", text: english ? "Hello. I can help you understand your options and next steps." : "Hola. Puedo ayudarte a entender tus opciones y los siguientes pasos." }]);

  async function send(text = input) {
    const clean = text.trim();
    if (!clean || loading) return;
    const nextMessages = [...messages, { id: crypto.randomUUID(), from: "user" as const, text: clean }];
    setMessages(nextMessages); setInput(""); setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale, messages: nextMessages.filter((message) => message.id !== "welcome").map((message) => ({ role: message.from === "bot" ? "assistant" : "user", content: message.text })) }) });
      const data = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "Chat unavailable");
      setMessages((current) => [...current, { id: crypto.randomUUID(), from: "bot", text: data.message || "No he podido preparar una respuesta." }]);
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), from: "bot", text: english ? "I am having trouble connecting. You can request a call with an advisor instead." : "Estoy teniendo problemas para conectar. Puedes solicitar una llamada con un asesor." }]);
    } finally { setLoading(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void send(); }
  function startDragging(event: PointerEvent<HTMLElement>) { if (event.pointerType === "touch") return; const bounds = event.currentTarget.closest<HTMLElement>("[data-chatbot-shell]")?.getBoundingClientRect(); if (!bounds) return; dragged.current = false; dragOffset.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.style.cursor = "grabbing"; }
  function drag(event: PointerEvent<HTMLElement>) { if (!event.currentTarget.hasPointerCapture(event.pointerId)) return; const panel = event.currentTarget.closest<HTMLElement>("[data-chatbot-shell]")?.getBoundingClientRect(); if (!panel) return; if (Math.abs(event.movementX) > 0 || Math.abs(event.movementY) > 0) dragged.current = true; const left = Math.min(Math.max(12, event.clientX - dragOffset.current.x), window.innerWidth - panel.width - 12); const top = Math.min(Math.max(12, event.clientY - dragOffset.current.y), window.innerHeight - panel.height - 12); setPosition({ left, top }); }
  function stopDragging(event: PointerEvent<HTMLElement>) { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); event.currentTarget.style.cursor = "grab"; }
  function toggleOpen() { if (dragged.current) { dragged.current = false; return; } setOpen((value) => !value); }

  return <div data-chatbot-shell className="fixed bottom-20 right-4 z-30 sm:right-6 md:bottom-6" style={position ? { left: position.left, top: position.top, right: "auto", bottom: "auto" } : undefined}>
    {open && <section className="mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-soft" aria-label={english ? "Aura assistant" : "Asistente de Aura"}>
      <div className="bg-sapphire p-5 text-white"><div onPointerDown={startDragging} onPointerMove={drag} onPointerUp={stopDragging} onPointerCancel={stopDragging} className="flex cursor-grab touch-none items-start justify-between gap-4" title={english ? "Drag to move" : "Arrastra para mover"}><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white/15"><Bot size={19} aria-hidden="true" /></span><div><p className="text-sm font-bold">Aura</p><p className="text-xs text-white/70">{english ? "Guidance assistant" : "Asistente de orientación"}</p></div></div><button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => setOpen(false)} className="rounded-full p-2 text-white/75 hover:bg-white/10" aria-label={english ? "Close assistant" : "Cerrar asistente"}><ChevronDown size={18} aria-hidden="true" /></button></div><p className="mt-4 text-xs leading-5 text-white/75">{english ? "General information only, not medical advice." : "Información general; no consejo médico."}</p></div>
      <div className="max-h-72 space-y-3 overflow-y-auto p-4" aria-live="polite">{messages.map((message) => <div key={message.id} className={`flex gap-2 ${message.from === "user" ? "justify-end" : "justify-start"}`}><span className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full ${message.from === "user" ? "bg-champagne-light text-sapphire" : "bg-surface text-sapphire"}`}>{message.from === "user" ? <UserRound size={13} aria-hidden="true" /> : <Bot size={13} aria-hidden="true" />}</span><div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-5 ${message.from === "user" ? "bg-sapphire text-white" : "bg-surface text-ink"}`}>{message.text}</div></div>)}{loading && <div className="text-xs text-muted">{english ? "Aura is thinking…" : "Aura está preparando una respuesta…"}</div>}</div>
      <div className="border-t border-border p-3"><Link href={`/${locale}/reservar`} className="block rounded-full bg-champagne-light px-4 py-2.5 text-center text-sm font-semibold text-sapphire hover:bg-champagne">{english ? "Request a call with an advisor" : "Solicitar una llamada con un asesor"}</Link><div className="mt-3 flex flex-wrap gap-2">{[(english ? "Specialties" : "Especialidades"), (english ? "How does it work?" : "¿Cómo funciona?"), (english ? "Travel support" : "Acompañamiento de viaje")].map((label) => <button key={label} type="button" disabled={loading} onClick={() => void send(label)} className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-sapphire hover:bg-surface disabled:opacity-50">{label}</button>)}</div></div>
      <form onSubmit={submit} className="flex gap-2 border-t border-border p-3"><label htmlFor="site-chat-input" className="sr-only">{english ? "Write a message" : "Escribe un mensaje"}</label><input id="site-chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder={english ? "Ask a question" : "Escribe una pregunta"} disabled={loading} className="min-h-11 min-w-0 flex-1 rounded-full border border-border px-4 text-sm focus:border-sapphire focus:ring-2 focus:ring-champagne/40 disabled:bg-surface" /><button type="submit" disabled={loading} className="grid size-11 shrink-0 place-items-center rounded-full bg-sapphire text-white hover:bg-sapphire-dark disabled:opacity-50" aria-label={english ? "Send message" : "Enviar mensaje"}><Send size={17} aria-hidden="true" /></button></form>
    </section>}
    <button type="button" onPointerDown={startDragging} onPointerMove={drag} onPointerUp={stopDragging} onPointerCancel={stopDragging} onClick={toggleOpen} className="flex min-h-12 cursor-grab items-center gap-3 rounded-full bg-sapphire px-5 font-semibold text-white shadow-soft transition duration-base hover:-translate-y-1" aria-expanded={open} aria-label={english ? "Open Aura assistant" : "Abrir asistente de Aura"} title={english ? "Click to open or drag to move" : "Haz clic para abrir o arrastra para mover"}><Bot size={19} aria-hidden="true" /><span className="hidden sm:inline">{english ? "Ask Aura" : "Pregunta a Aura"}</span></button>
  </div>;
}
