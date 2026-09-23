import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { createContactHandler } from "./contact.mjs";
const env = {
  CONTACT_ALLOWED_ORIGIN: "https://portfolio.example",
  RESEND_API_KEY: "test-only",
  CONTACT_FROM_EMAIL: "portfolio@example.com",
};
const message = () => ({
  name: "מגייסת",
  email: "recruiter@example.com",
  company: "",
  subject: "Backend opportunity",
  message: "שלום Dvir\nLet us talk.",
  website: "",
  requestId: randomUUID(),
});
async function fixture(t, options = {}) {
  const server = createServer(
    createContactHandler({
      env,
      fetchImpl: async () => Response.json({ id: "test-message" }),
      ...options,
    }),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(
    () =>
      new Promise((resolve) => {
        server.closeAllConnections();
        server.close(resolve);
      }),
  );
  return (body = message(), init = {}) =>
    fetch(`http://127.0.0.1:${server.address().port}/api/contact`, {
      method: "POST",
      headers: {
        Origin: env.CONTACT_ALLOWED_ORIGIN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...init,
    });
}
test("provider acceptance, fixed recipient, reply-to, Unicode and idempotent retry", async (t) => {
  const calls = [];
  const send = await fixture(t, {
    fetchImpl: async (url, options) => {
      calls.push({ url, ...options });
      return Response.json({ id: "accepted" });
    },
  });
  const body = { ...message(), to: "attacker@example.com" };
  for (let i = 0; i < 2; i++) {
    const response = await send(body);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
  }
  const sent = JSON.parse(calls[0].body);
  assert.deepEqual(sent.to, ["dvir.hahampour@gmail.com"]);
  assert.equal(sent.reply_to, body.email);
  assert.ok(sent.text.includes(body.message));
  assert.equal(
    calls[0].headers["Idempotency-Key"],
    calls[1].headers["Idempotency-Key"],
  );
  assert.equal(calls[0].url, "https://api.resend.com/emails");
});
test("missing configuration never reports success", async (t) => {
  const send = await fixture(t, {
    env: { CONTACT_ALLOWED_ORIGIN: env.CONTACT_ALLOWED_ORIGIN },
  });
  assert.equal((await send()).status, 503);
});
test("provider rejection, malformed response and timeout remain retryable errors", async (t) => {
  for (const fetchImpl of [
    async () =>
      Response.json({ message: "secret provider details" }, { status: 401 }),
    async () => Response.json({}),
    async () => {
      throw new Error("timeout");
    },
  ]) {
    const send = await fixture(t, { fetchImpl });
    const response = await send();
    assert.equal(response.status, 502);
    assert.ok(!(await response.text()).includes("secret"));
  }
});
test("reject invalid fields, header injection, honeypot and invalid request ID", async (t) => {
  for (const change of [
    { name: " " },
    { email: "invalid" },
    { subject: "test\r\nBcc: evil@example.com" },
    { message: "a".repeat(2501) },
    { website: "spam" },
    { requestId: "invalid" },
    { company: null },
  ]) {
    const send = await fixture(t);
    assert.equal((await send({ ...message(), ...change })).status, 400);
  }
});
test("restrict methods, origins, content types and body sizes", async (t) => {
  const send = await fixture(t);
  assert.equal(
    (await send(undefined, { method: "GET", body: undefined })).status,
    405,
  );
  assert.equal(
    (
      await send(undefined, {
        headers: {
          Origin: "https://evil.example",
          "Content-Type": "application/json",
        },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await send(undefined, {
        headers: {
          Origin: env.CONTACT_ALLOWED_ORIGIN,
          "Content-Type": "text/plain",
        },
      })
    ).status,
    415,
  );
  assert.equal((await send(undefined, { body: "invalid json" })).status, 400);
  assert.equal(
    (await send(undefined, { body: "x".repeat(17000) })).status,
    413,
  );
});
test("rate limit blocks excess requests and expires", async (t) => {
  let time = 1;
  const send = await fixture(t, { now: () => time });
  for (let i = 0; i < 5; i++) assert.equal((await send()).status, 200);
  const response = await send();
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "900");
  time += 900001;
  assert.equal((await send()).status, 200);
});
test("production requires a configured origin", async (t) => {
  const send = await fixture(t, { env: { NODE_ENV: "production" } });
  assert.equal((await send()).status, 403);
});
