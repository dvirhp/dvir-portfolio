import { randomUUID } from "node:crypto";
import { isIP } from "node:net";

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
export function createContactHandler({
  env = process.env,
  fetchImpl = fetch,
  now = Date.now,
  timeoutMs = 12000,
  vercel = false,
} = {}) {
  const attempts = new Map();
  return async function contact(req, res) {
    const reply = (status, body) => {
      res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(JSON.stringify(body));
    };
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return reply(405, { error: "method" });
    }
    const origin = req.headers.origin;
    const expected = env.CONTACT_ALLOWED_ORIGIN;
    const localOrigin = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(
      origin ?? "",
    );
    if (
      !origin ||
      (expected
        ? origin !== expected
        : env.NODE_ENV === "production" ||
          !localOrigin ||
          new URL(origin).host !== req.headers.host)
    )
      return reply(403, { error: "origin" });
    if (!req.headers["content-type"]?.startsWith("application/json"))
      return reply(415, { error: "content_type" });
    // Only trust this header at the Vercel entry point: Vercel overwrites it.
    const forwarded = vercel ? req.headers["x-forwarded-for"] : undefined;
    const clientIp = typeof forwarded === "string" ? forwarded.trim() : "";
    const ip = isIP(clientIp)
      ? clientIp
      : (req.socket?.remoteAddress ?? "unknown");
    const time = now();
    for (const [key, value] of attempts)
      if (time - value.start >= 900000) attempts.delete(key);
    const entry = attempts.get(ip) ?? { start: time, count: 0 };
    if (entry.count >= 5 || (!attempts.has(ip) && attempts.size >= 10000)) {
      res.setHeader("Retry-After", "900");
      return reply(429, { error: "rate_limit" });
    }
    entry.count++;
    attempts.set(ip, entry);
    let data;
    try {
      // Vercel parses JSON before calling the function; Vite/local HTTP use a stream.
      if (req.body !== undefined) {
        const body = Buffer.isBuffer(req.body)
          ? req.body.toString("utf8")
          : typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body);
        if (Buffer.byteLength(body) > 16384)
          return reply(413, { error: "size" });
        data = JSON.parse(body);
      } else {
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
          const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          size += bytes.length;
          if (size > 16384) return reply(413, { error: "size" });
          chunks.push(bytes);
        }
        data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      }
    } catch {
      return reply(400, { error: "invalid" });
    }
    if (!data || typeof data !== "object" || Array.isArray(data))
      return reply(400, { error: "invalid" });
    const values = {};
    for (const [key, max] of Object.entries({
      name: 100,
      email: 200,
      company: 150,
      subject: 150,
      message: 2500,
    })) {
      if (
        typeof data[key] !== "string" ||
        data[key].length > max ||
        (key !== "company" && !data[key].trim()) ||
        (key !== "message" &&
          (/[\r\n]/.test(data[key]) ||
            data[key].includes(String.fromCharCode(0))))
      )
        return reply(400, { error: "invalid" });
      values[key] = data[key].trim();
    }
    if (
      !emailPattern.test(values.email) ||
      data.website ||
      typeof data.requestId !== "string" ||
      !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
        data.requestId,
      )
    )
      return reply(400, { error: "invalid" });
    const recipient = env.CONTACT_TO_EMAIL || "dvir.hahampour@gmail.com";
    if (
      !env.RESEND_API_KEY ||
      !emailPattern.test(env.CONTACT_FROM_EMAIL ?? "") ||
      !emailPattern.test(recipient)
    )
      return reply(503, { error: "unavailable" });
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `portfolio-contact/${data.requestId}`,
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: [recipient],
          reply_to: values.email,
          subject: `Portfolio: ${values.subject}`,
          text: `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "—"}\n\n${values.message}`,
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== "string" || !result.id)
        return reply(502, { error: "delivery" });
      return reply(200, { ok: true });
    } catch {
      return reply(502, { error: "delivery", reference: randomUUID() });
    }
  };
}
