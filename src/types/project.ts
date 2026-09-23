export interface ProjectSection {
  id: string;
  title: string;
  text?: string;
  items?: string[];
  flow?: string[];
  link?: { to: string; label: string };
}
export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  featured?: boolean;
  tech: string[];
  visual: "assembler" | "systems" | "ai" | "possbo" | "cart";
  highlights?: string[];
  sections: ProjectSection[];
  github?: string;
  demo?: string;
  sourceNote?: string;
  preview?: { src: string; alt: string; caption: string };
  gallery?: { src: string; alt: string; caption: string }[];
}
