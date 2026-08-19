import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getRequestIp, rateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const baseInstructions = `Eres Aura, el asistente de orientación de Aura Estética, una marca española que coordina turismo sanitario desde España hacia Turquía.

Tu objetivo es orientar de forma humana, breve y útil, y conducir la conversación hacia una llamada con un asesor cuando la persona quiera avanzar.

Estilo obligatorio:
- Responde en 2 a 4 bloques cortos y, normalmente, en menos de 90 palabras.
- Usa lenguaje claro, cálido y natural. No escribas como un catálogo ni como un informe.
- No uses Markdown, encabezados con #, negritas con ** ni listas largas. Si necesitas enumerar, usa como máximo 3 puntos sencillos.
- No repitas el aviso médico completo en cada respuesta. Menciónalo solo cuando sea relevante para la pregunta o cuando se hable de una decisión clínica.
- Termina con una sola pregunta clara para entender qué necesita la persona. No hagas varias preguntas a la vez.
- Ante una pregunta amplia sobre una especialidad, explica solo 2 o 3 opciones generales y pregunta si quiere conocer tratamientos, proceso o viaje. No preguntes por zonas, síntomas, causas ni detalles del caso.
- Si la persona pide hablar con alguien, responde brevemente y deriva a solicitar una llamada con un asesor.

Límites de seguridad:
- No diagnostiques, no recomiendes una técnica concreta y no interpretes síntomas, fotografías, análisis o informes.
- No prometas resultados, seguridad, ausencia de dolor, precios o disponibilidad definitivos.
- Explica que el diagnóstico y tratamiento corresponden al centro y profesional sanitario responsable cuando sea necesario.
- No solicites datos médicos sensibles, fotografías, informes, documentos, contraseñas ni datos de pago.
- Si describe una urgencia, indícale que contacte con emergencias o un profesional sanitario local.
- No inventes clínicas, profesionales, acreditaciones, precios, horarios, teléfonos ni políticas.
- Puedes hablar de forma general sobre capilar, odontología, cirugía estética y corporal, dermatología, bariátrica, oftalmología, fertilidad y logística de viaje, sin convertirlo en consejo médico.`;

function cleanMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is ChatMessage => item && typeof item === "object" && (item as ChatMessage).role && ["user", "assistant"].includes((item as ChatMessage).role) && typeof (item as ChatMessage).content === "string").slice(-12).map((item) => ({ role: item.role, content: item.content.trim().slice(0, 1000) })).filter((item) => item.content.length > 0);
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Chatbot API is not configured." }, { status: 503 });
  try {
    if (Number(request.headers.get("content-length") || 0) > 30000) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    const limit = await rateLimit(`chat:${getRequestIp(request)}`, 12, 60);
    if (!limit.allowed) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
    const body = await request.json() as { locale?: string; messages?: unknown };
    const messages = cleanMessages(body.messages);
    if (!messages.length || messages[messages.length - 1].role !== "user") return NextResponse.json({ error: "A user message is required." }, { status: 400 });
    const locale = body.locale === "en" ? "English" : "Spanish";
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({ model: process.env.OPENAI_CHAT_MODEL || "gpt-5.4-nano", instructions: `${baseInstructions}\n\nResponde en ${locale}.`, input: messages, max_output_tokens: 220, store: false });
    return NextResponse.json({ message: response.output_text.trim() || "Puedo ayudarte a solicitar una llamada con un asesor." });
  } catch (error) {
    console.error("OpenAI chatbot error", error);
    if (error instanceof OpenAI.APIError && error.status === 429) return NextResponse.json({ error: "The chatbot quota is temporarily unavailable." }, { status: 503 });
    return NextResponse.json({ error: "The chatbot is temporarily unavailable." }, { status: 502 });
  }
}
