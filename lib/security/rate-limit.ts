type LimitResult = { allowed: boolean; remaining: number; retryAfterSeconds: number };
const localBuckets = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<LimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const redisKey = `aura:ratelimit:${key}`;
    const response = await fetch(`${url}/pipeline`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify([["INCR", redisKey], ["EXPIRE", redisKey, windowSeconds]]), cache: "no-store" });
    if (!response.ok) return { allowed: false, remaining: 0, retryAfterSeconds: windowSeconds };
    const result = await response.json() as Array<{ result?: number }>;
    const count = Number(result?.[0]?.result || 0);
    return { allowed: count <= limit, remaining: Math.max(0, limit - count), retryAfterSeconds: windowSeconds };
  }
  if (process.env.NODE_ENV === "production") return { allowed: false, remaining: 0, retryAfterSeconds: windowSeconds };
  const now = Date.now();
  const current = localBuckets.get(key);
  if (!current || current.resetAt <= now) { localBuckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 }); return { allowed: true, remaining: limit - 1, retryAfterSeconds: windowSeconds }; }
  current.count += 1;
  return { allowed: current.count <= limit, remaining: Math.max(0, limit - current.count), retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) };
}

export function getRequestIp(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"; }
