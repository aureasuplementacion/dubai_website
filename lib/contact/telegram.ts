export function getTelegramUsername(value = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME) {
  const username = value?.trim().replace(/^@/, "") || "";
  if (!/^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(username)) return null;
  return username;
}

export function getTelegramUrl(context: { locale?: string; source?: string } = {}) {
  const username = getTelegramUsername();
  if (!username) return null;
  const message = context.locale === "en" ? "Hello, I would like to speak with an Aura advisor." : "Hola, me gustaría hablar con un asesor de Aura.";
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}
