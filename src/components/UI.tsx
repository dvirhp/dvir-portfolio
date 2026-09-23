import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types/project";
import { useI18n } from "../i18n/context";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  const { tr } = useI18n();
  return (
    <header className="page-intro">
      <p className="eyebrow">{tr(label)}</p>
      <h1>{tr(title)}</h1>
      <p className="intro-copy">{children}</p>
    </header>
  );
}
export function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  return (
    <div className={`project-visual ${kind}`} aria-hidden="true" dir="ltr">
      {kind === "possbo" ? (
        <div className="possbo-mark">
          <span className="visual-caption">CREATE / SCHEDULE / PUBLISH</span>
          <strong>
            possbo<span>.</span>
          </strong>
          <div className="possbo-channels">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>WhatsApp</span>
          </div>
        </div>
      ) : kind === "assembler" ? (
        <div className="assembly-visual">
          <span className="visual-caption">SOURCE → MACHINE</span>
          <div>
            <span className="code-symbol">{"{ }"}</span>
            <span className="visual-line" />
            <span className="binary">
              01001000
              <br />
              00110101
              <br />
              10100001
            </span>
          </div>
          <span className="visual-caption">C / 24-BIT ARCHITECTURE</span>
        </div>
      ) : kind === "systems" ? (
        <div className="system-visual">
          <span className="node">CLIENT</span>
          <span className="connector" />
          <div className="node-row">
            <span className="node">API</span>
            <span className="node">ACCESS</span>
            <span className="node">LISTS</span>
          </div>
          <span className="connector" />
          <span className="node database">DATA</span>
        </div>
      ) : (
        <div className="ai-visual">
          <div className="context-file">
            <span className="file-top">≡ RECEIPT</span>
            <span className="file-line" />
            <span className="file-line short" />
            <span className="file-line" />
          </div>
          <span className="visual-line" />
          <span className="node">
            ITEMS
            <br />
            <br />
            CART
          </span>
        </div>
      )}
    </div>
  );
}
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { tr } = useI18n();
  return (
    <article
      className={`project-card ${project.featured ? "featured-project" : ""}`}
    >
      <Link
        className="project-visual-link"
        to={`/projects/${project.slug}`}
        aria-label={`${tr("Explore project")}: ${tr(project.title)}`}
      >
        {project.preview ? (
          <img
            className="featured-screenshot"
            src={`${import.meta.env.BASE_URL}${project.preview.src}`}
            alt={tr(project.preview.alt)}
            width="1440"
            height="900"
            loading="lazy"
          />
        ) : (
          <ProjectVisual kind={project.visual} />
        )}
      </Link>
      <div className="project-card-body">
        <div className="card-meta">
          <span>{tr(project.category)}</span>
          <span>
            {project.featured
              ? tr("FEATURED PROJECT")
              : String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>{tr(project.title)}</Link>
          <Arrow diagonal />
        </h3>
        <p>{tr(project.description)}</p>
        <div className="tags">
          {(project.highlights ?? project.tech.slice(0, 3)).map((item) => (
            <span key={item}>
              <bdi>{tr(item)}</bdi>
            </span>
          ))}
        </div>
        <div className="card-actions">
          <Link className="text-link" to={`/projects/${project.slug}`}>
            {tr("Read case study")}
            <Arrow />
          </Link>
          {project.demo && (
            <ExternalLink className="button primary" href={project.demo}>
              {tr("View Live App")}
              <Arrow diagonal />
            </ExternalLink>
          )}
          {project.github && (
            <ExternalLink className="text-link" href={project.github}>
              {tr("View on GitHub")}
              <Arrow diagonal />
            </ExternalLink>
          )}
        </div>
        {project.sourceNote && (
          <p className="source-note">{tr(project.sourceNote)}</p>
        )}
      </div>
    </article>
  );
}
