import { useI18n } from "../i18n/context";
import { Link, useParams } from "react-router-dom";
import {
  Arrow,
  ExternalLink,
  PageIntro,
  ProjectCard,
  ProjectVisual,
} from "../components/UI";
import { projects } from "../data/projects";
import { ScreenshotGallery } from "../components/ScreenshotGallery";
import { NotFound } from "./Pages";
export function Projects() {
  const { tr } = useI18n();
  return (
    <>
      <PageIntro
        label={tr("PROJECTS / SELECTED WORK")}
        title={tr("Ideas turned into working systems.")}
      >
        {tr(
          "Possbo leads a focused collection of personal and academic work: product engineering, connected applications, and low-level systems.",
        )}
      </PageIntro>
      <section
        className="projects-grid projects-page"
        aria-label={tr("Projects")}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>
      <div className="projects-end">
        <span className="status-dot" />
        <p>
          {tr(
            "A focused selection. More projects will join as the work evolves.",
          )}
        </p>
      </div>
    </>
  );
}
export function ProjectDetail() {
  const { tr } = useI18n();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <>
      <Link className="back-link" to="/projects">
        {tr("\u2190 All projects")}
      </Link>
      <PageIntro
        label={`${project.featured ? tr("FEATURED PROJECT") + " / " : ""}${tr(project.category)}`}
        title={project.title}
      >
        {tr(project.description)}
      </PageIntro>
      <div className="project-detail-hero">
        <ProjectVisual kind={project.visual} />
        <div>
          <p className="eyebrow">
            {tr(project.tech.length ? "TECH STACK" : "ENGINEERING SCOPE")}
          </p>
          <div className="tags">
            {(project.tech.length
              ? project.tech
              : (project.highlights ?? [])
            ).map((t) => (
              <span key={t}>
                <bdi>{tr(t)}</bdi>
              </span>
            ))}
          </div>
          <div className="hero-actions">
            {project.demo && (
              <ExternalLink href={project.demo} className="button primary">
                {tr("View Live App")}
                <Arrow diagonal />
              </ExternalLink>
            )}
            {project.github && (
              <ExternalLink href={project.github} className="button secondary">
                {tr("View on GitHub")}
                <Arrow diagonal />
              </ExternalLink>
            )}
          </div>
          {project.sourceNote && (
            <p className="source-note">{tr(project.sourceNote)}</p>
          )}
        </div>
      </div>
      <div className="case-study">
        <aside>
          <p className="eyebrow">{tr("IN THIS CASE STUDY")}</p>
          {project.sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {tr(section.title)}
            </a>
          ))}
        </aside>
        <div className="case-content">
          {project.sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h2>{tr(section.title)}</h2>
              {section.text && <p>{tr(section.text)}</p>}
              {section.items && (
                <ul className="challenge-list">
                  {section.items.map((item) => (
                    <li key={item}>{tr(item)}</li>
                  ))}
                </ul>
              )}
              {section.flow && (
                <ol className="architecture-flow">
                  {section.flow.map((item) => (
                    <li key={item}>{tr(item)}</li>
                  ))}
                </ol>
              )}
              {section.link && (
                <Link className="text-link" to={section.link.to}>
                  {tr(section.link.label)} <Arrow />
                </Link>
              )}
              {section.id === "preview" && project.gallery && (
                <ScreenshotGallery images={project.gallery} />
              )}
              {(section.id === "live" || section.id === "preview") &&
                project.demo && (
                  <ExternalLink
                    href={project.demo}
                    className="button secondary"
                  >
                    {tr("View Live App")}
                    <Arrow diagonal />
                  </ExternalLink>
                )}
            </section>
          ))}
        </div>
      </div>
      <div className="project-bottom">
        <Link className="text-link" to="/projects">
          {tr("\u2190 Back to all projects")}
        </Link>
        <Link className="text-link" to="/contact">
          {tr("Let\u2019s talk engineering")}
          <Arrow />
        </Link>
      </div>
    </>
  );
}
