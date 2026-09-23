import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createContactHandler } from "./contact.mjs";
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const contact = createContactHandler({
  env: { ...process.env, NODE_ENV: "production" },
});
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname === "/api/contact") return await contact(req, res);
    if (pathname.startsWith("/api/")) {
      res.writeHead(404);
      return res.end();
    }
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      return res.end();
    }
    const target = resolve(root, "." + pathname);
    if (target !== resolve(root) && !target.startsWith(resolve(root) + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if (pathname.split("/").some((part) => part.startsWith("."))) {
      res.writeHead(404);
      return res.end();
    }
    let file = target;
    try {
      if (!(await stat(file)).isFile()) file = resolve(root, "index.html");
    } catch {
      if (extname(pathname)) {
        res.writeHead(404);
        return res.end();
      }
      file = resolve(root, "index.html");
    }
    const bytes = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": pathname.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : bytes);
  } catch {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
});
server.requestTimeout = 20000;
server.headersTimeout = 15000;
server.listen(
  Number(process.env.PORT || 3000),
  process.env.HOST || "127.0.0.1",
  () =>
    console.log(
      `Portfolio server: http://${process.env.HOST || "127.0.0.1"}:${process.env.PORT || 3000}`,
    ),
);
