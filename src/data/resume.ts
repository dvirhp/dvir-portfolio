// Based on the supplied CV; employment dates corrected by the owner. The PDF remains unchanged.
export const resume = {
  summary:
    "Software Engineer with a B.Sc. in Computer Science and a backend focus. Experienced in end-to-end systems, reliable architecture, cloud-native delivery, and practical AI-assisted development.",
  skills: [
    "Node.js",
    "TypeScript",
    "JavaScript",
    "NestJS",
    "Express",
    "REST APIs",
    "Socket.IO",
    "PostgreSQL",
    "Prisma",
    "SQL",
    "Redis",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Git",
    "Angular",
  ],
  tools: ["Codex", "Claude Code", "GitHub Copilot"],
  experience: {
    company: "NGSOFT",
    title: "Software Engineer",
    dates: "Dec 2025 – Sep 2026",
    items: [
      "Built end-to-end NestJS systems with PostgreSQL, REST APIs, Socket.IO, and Angular.",
      "Designed shared TypeScript foundations and incremental synchronization with retries.",
      "Maintained Docker/Kubernetes delivery pipelines and database migrations.",
      "Authored agent context files to support coding standards, reviews, and onboarding.",
    ],
  },
  projects: [{
    title: "Possbo",
    description: "Full-Stack SaaS & AI Platform",
    stage: "Pre-production",
    dates: "2026 – Present",
    items: [
      "Built a full-stack SaaS platform using React, TypeScript, Node.js, PostgreSQL, and Prisma.",
      "Implemented scheduling, third-party integrations, and AI-powered content generation.",
      "Led architecture and implementation using AI-assisted, spec-driven development workflows.",
    ],
  }],
  education: {
    institution: "The Open University of Israel",
    degree: "Bachelor of Science (B.Sc.) in Computer Science",
    dates: "2022 — 2025",
    items: [
      "Focused on software development, algorithms, data structures, and systems programming.",
      "Designed and implemented a 24-bit assembler in C, translating assembly code into machine code.",
    ],
  },
  service: {
    organization: "Meitav Unit",
    role: "IT Systems Support Technician",
    dates: "2018 — 2020",
    description:
      "Provided technical support and maintained IT infrastructure and systems.",
  },
  languages: ["Hebrew (Native)", "English (Fluent)"],
};
