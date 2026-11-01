import type { Project } from "../types/project";
export const projects: Project[] = [
  {
    slug: "possbo",
    title: "Possbo",
    category: "Personal project · Full-stack engineering",
    featured: true,
    visual: "possbo",
    description:
      "A social publishing and campaign platform connecting content creation, scheduling, and AI-powered workflows across Facebook, Instagram, and WhatsApp.",
    tech: ["Node.js", "Express", "React", "JavaScript", "PostgreSQL", "Prisma"],
    highlights: [
      "Social publishing",
      "Scheduling & campaigns",
      "AI-assisted content",
      "Frontend + backend",
    ],
    github: "https://github.com/dvirhp/possbo",
    sourceNote: "In Development · Testing",
    sections: [
      {
        id: "overview",
        title: "Product Overview",
        text: "Possbo is my largest personal project: a social publishing and campaign management platform. It brings content creation, scheduling, channel integrations, and reporting into one product.",
      },
      {
        id: "motivation",
        title: "Problem / Motivation",
        text: "Publishing across multiple channels requires coordinating content, audiences, schedules, and follow-up. Possbo connects those steps so a campaign can be managed as a complete workflow.",
      },
      {
        id: "role",
        title: "What I Built",
        text: "Built the frontend and backend around the campaign lifecycle: compose content, select channels, schedule publication, and review results. The product also includes templates, campaign history, WhatsApp workflows, and AI-assisted capabilities.",
      },
      {
        id: "capabilities",
        title: "Product Capabilities",
        items: [
          "Facebook and Instagram publishing",
          "Campaign creation, scheduling, and history",
          "Templates and reusable content",
          "AI-assisted content generation and insights",
          "WhatsApp workflows and chatbot functionality",
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        text: "The source contains a React client, a Node.js/Express API, and a separate background-worker entry point. Prisma models the PostgreSQL data layer. This view summarizes the code structure rather than a production deployment.",
        flow: [
          "React client · content & campaigns",
          "Express API · product workflows",
          "PostgreSQL / Prisma · content, schedules & history",
          "Background worker · scheduled publishing",
        ],
      },
      {
        id: "backend",
        title: "Backend Engineering",
        text: "The backend separates campaign operations from scheduled publication work. The publication scheduler uses persisted jobs, transactional claims, leases, and retry handling. Data models connect posts, schedules, media, publication history, and metrics.",
      },
      {
        id: "ai",
        title: "AI Capabilities",
        text: "AI-assisted writing supports the content-creation workflow. Insights and AI-powered workflows complement campaign management. The focus is integrating useful capabilities into the product experience.",
        link: {
          to: "/ai-engineering",
          label: "Explore my AI engineering approach",
        },
      },
      {
        id: "integrations",
        title: "External Integrations",
        items: [
          "Facebook publishing",
          "Instagram publishing",
          "WhatsApp workflows",
        ],
        text: "Channel integrations connect the campaign workflow to publishing and messaging. Integration-specific behavior remains behind the product interface.",
      },
      {
        id: "challenges",
        title: "Engineering Challenges",
        items: [
          "Coordinating scheduled jobs and recovery after interrupted work.",
          "Keeping content, channel selection, and publication status consistent.",
          "Modeling campaign history and results for later review.",
          "Maintaining a clear boundary between the client, API, and background work.",
        ],
      },
      {
        id: "preview",
        title: "Screenshots / Product Tour",
        text: "Screenshots from Possbo’s development and testing. Figures shown are interface examples, not claims about adoption or performance.",
      },
      {
        id: "stack",
        title: "Tech Stack",
        text: "Verified in the local source: React, JavaScript, Node.js, Express, Prisma, and PostgreSQL. The source includes a separate worker for background processing.",
      },
      {
        id: "live",
        title: "Project Status",
        text: "Possbo is an ongoing personal full-stack SaaS project in development and testing. The application is not publicly accessible.",
      },
    ],
    preview: {
      src: "images/possbo/create.webp",
      alt: "Possbo campaign editor with content fields, an AI writing action, and a social post preview.",
      caption:
        "Campaign creation: content, channel previews, and AI-assisted writing in one workflow.",
    },
    gallery: [
      {
        src: "images/possbo/dashboard.webp",
        alt: "Possbo dashboard showing campaign history, publishing status, and a calendar.",
        caption:
          "Dashboard: campaign activity, publishing status, and a calendar in one workspace.",
      },
      {
        src: "images/possbo/create.webp",
        alt: "Possbo campaign editor with content fields, an AI writing action, and a social post preview.",
        caption:
          "Campaign creation: content, channel previews, and AI-assisted writing in one workflow.",
      },
      {
        src: "images/possbo/stats.webp",
        alt: "Possbo analytics screen with channel filters and an activity chart.",
        caption: "Analytics: channel-level reporting and activity over time.",
      },
    ],
  },
  {
    slug: "family-cart",
    title: "Family Cart",
    category: "Personal project · Backend & mobile",
    visual: "cart",
    description:
      "Shared shopping lists, family permissions, and receipt processing across a Node.js backend and mobile client.",
    tech: ["Node.js", "JavaScript", "React Native", "MongoDB", "LLMs"],
    github: "https://github.com/dvirhp/cart-app",
    sections: [
      {
        id: "overview",
        title: "Overview",
        text: "A family shopping application with a Node.js API and React Native client. The public repository includes family membership, personal and shared carts, product data, and an AI-assisted receipt parser.",
      },
      {
        id: "problem",
        title: "Problem",
        text: "Shared shopping requires a model for family membership and permissions, while receipt information needs to be converted into usable product records.",
      },
      {
        id: "solution",
        title: "Solution",
        text: "The code separates membership checks, cart models, product synchronization, and receipt parsing into distinct modules. A mobile client provides the shopping and family-management interface.",
      },
      {
        id: "architecture",
        title: "Architecture",
        flow: [
          "React Native client",
          "Node.js routes & membership middleware",
          "MongoDB models · families, carts, products",
          "Receipt parsing & product synchronization services",
        ],
      },
      {
        id: "challenges",
        title: "Key Engineering Challenges",
        items: [
          "Checking active family membership and owner-only operations.",
          "Turning receipt images and OCR text into normalized item records.",
          "Handling empty parsing results with fallback attempts.",
          "Mapping retailer price files into product records.",
        ],
      },
      {
        id: "role",
        title: "What I Built / My Role",
        text: "Developed the shopping application across backend and mobile layers. The repository provides concrete examples of domain modeling, permission checks, and AI output normalization. It is presented as a personal project, without production-scale or deployment claims.",
      },
    ],
  },
  {
    slug: "shared-task-manager",
    title: "Shared Task Manager",
    category: "Personal project · Full-stack",
    visual: "systems",
    description:
      "Collaborative task lists with ownership rules, shared access, and an Angular frontend.",
    tech: ["TypeScript", "Node.js", "Express", "Angular", "MongoDB"],
    github: "https://github.com/dvirhp/ng-task-manager",
    sections: [
      {
        id: "overview",
        title: "Overview",
        text: "A full-stack task manager with Angular, an Express/TypeScript backend, and MongoDB persistence. Users can manage lists and share them with other registered users.",
      },
      {
        id: "problem",
        title: "Problem",
        text: "Collaboration requires distinguishing list ownership from shared access and applying those rules consistently to list operations.",
      },
      {
        id: "solution",
        title: "Solution",
        text: "List services check ownership and sharing membership. Owners manage lists and invitations; shared users can leave a list. Authentication includes access tokens and refresh-token rotation.",
      },
      {
        id: "architecture",
        title: "Architecture",
        flow: [
          "Angular features · route guards · HTTP interceptor",
          "Express routes · validation · controllers",
          "Authentication & list services",
          "MongoDB / Mongoose models",
        ],
      },
      {
        id: "challenges",
        title: "Key Engineering Challenges",
        items: [
          "Separating owner-only operations from shared access.",
          "Preventing duplicate list sharing.",
          "Coordinating client authentication with server-side access checks.",
          "Maintaining a consistent service and error-response structure.",
        ],
      },
      {
        id: "role",
        title: "What I Built / My Role",
        text: "Built a collaborative task-management application across frontend and backend layers. The public code is a discussion point for authorization, modular service design, and client/server integration.",
      },
    ],
  },
  {
    slug: "24-bit-assembler",
    title: "24-bit Assembler",
    category: "Academic project · Systems programming",
    visual: "assembler",
    description:
      "A multi-stage assembler in C: macro expansion, symbol resolution, and 24-bit machine-code generation.",
    tech: ["C", "Systems Programming", "Data Structures", "Algorithms"],
    github: "https://github.com/dvirhp/24bit-assembler-c",
    sections: [
      {
        id: "overview",
        title: "Overview",
        text: "An academic assembler for a custom 24-bit instruction set, developed with Yarin Lemel at The Open University of Israel.",
      },
      {
        id: "problem",
        title: "Problem",
        text: "Translate assembly source into machine code while handling macros, labels, addresses, and invalid input.",
      },
      {
        id: "solution",
        title: "Solution",
        text: "The assembler expands macros, processes the source in two passes, and writes machine-code output alongside entry and external-symbol files when applicable.",
      },
      {
        id: "architecture",
        title: "Architecture",
        flow: [
          "Assembly source",
          "Macro expansion",
          "First pass · symbols & instructions",
          "Second pass · address resolution",
          "Machine-code & symbol output",
        ],
      },
      {
        id: "challenges",
        title: "Key Engineering Challenges",
        items: [
          "Resolving labels across multiple passes.",
          "Representing instructions in a 24-bit format.",
          "Handling errors and dynamic memory in C.",
        ],
      },
      {
        id: "role",
        title: "What I Built / My Role",
        text: "Co-developed the assembler with Yarin Lemel. The project connects parsing, data structures, memory management, and low-level instruction encoding.",
      },
    ],
  },
];
