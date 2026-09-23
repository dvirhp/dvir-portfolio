export const links = {
  github: "https://github.com/dvirhp",
  linkedin: "https://www.linkedin.com/in/dvirhp/",
  email: "mailto:dvir.hahampour@gmail.com",
  cv: `${import.meta.env.BASE_URL}Dvir_Haham_Pour_Resume.pdf`,
  whatsapp: `https://wa.me/972509507992?text=${encodeURIComponent("Hi Dvir, I came across your portfolio and would like to connect regarding a potential opportunity.")}`,
};
export const technologies = [
  {
    title: "Backend",
    items: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Express",
      "REST APIs",
      "Socket.IO",
    ],
  },
  { title: "Databases", items: ["PostgreSQL", "Redis", "SQL", "Prisma"] },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git"],
  },
  { title: "Frontend", items: ["Angular", "JavaScript"] },
  { title: "Programming Languages", items: ["TypeScript", "JavaScript", "C"] },
  {
    title: "AI & Developer Tools",
    items: ["Claude Code", "Codex", "GitHub Copilot", "AI Agents", "LLMs"],
  },
];
export const experience = [
  {
    title: "End-to-end engineering",
    text: "Developed systems with NestJS on AWS and Kubernetes, exposing REST APIs and real-time Socket.IO channels backed by PostgreSQL, with Angular clients.",
  },
  {
    title: "Shared backend foundations",
    text: "Architected a shared TypeScript library for logging and secure cross-network file exchange across multiple backend applications.",
  },
  {
    title: "Reliable synchronization",
    text: "Redesigned full synchronization into incremental synchronization, transferring only changed records with automated retries and acknowledgements for reliable delivery across isolated networks.",
  },
  {
    title: "Cloud-native delivery",
    text: "Built and maintained CI/CD pipelines for Docker-based Kubernetes deployments, including database migrations using init containers.",
  },
  {
    title: "AI-assisted development",
    text: "Authored instruction.md and AGENT.md files with coding standards and architectural context to support AI-generated code accuracy, development workflows, code reviews, and onboarding.",
  },
];
