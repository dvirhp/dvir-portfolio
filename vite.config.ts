import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, loadEnv } from "vite";
import { createContactHandler } from "./server/contact.mjs";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const handler = createContactHandler({ env });
  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      {
        name: "portfolio-contact",
        configureServer(server) {
          server.middlewares.use("/api/contact", handler);
        },
        configurePreviewServer(server) {
          server.middlewares.use("/api/contact", handler);
        },
      },
    ],
  };
});
