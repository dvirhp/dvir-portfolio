import { learningAreas, ragFlow } from "../data/aiEngineering";
import { useI18n } from "../i18n/context";
import { Link } from "react-router-dom";
import { Arrow, PageIntro } from "../components/UI";
const workflow = [
  [
    "Architecture & solution design",
    "Explore alternatives and trade-offs within the constraints of the existing system.",
  ],
  [
    "Code generation & refactoring",
    "Implement bounded changes with repository context, coding standards, and existing behavior in mind.",
  ],
  [
    "Debugging & testing",
    "Trace failures, identify edge cases, and verify behavior with focused tests.",
  ],
  [
    "Code review",
    "Review correctness, maintainability, and the fit with the surrounding architecture.",
  ],
  [
    "Documentation",
    "Explain decisions and keep documentation aligned with implementation.",
  ],
  [
    "Understanding unfamiliar codebases",
    "Map modules, dependencies, and data flows before changing the system.",
  ],
];
const steps = [
  "Understand the problem",
  "Design / Architecture",
  "Provide repository context",
  "Implementation",
  "Review, test & debug",
  "Refinement",
];
export function AIEngineering() {
  const { tr } = useI18n();
  return (
    <>
      <PageIntro
        label={tr("AI ENGINEERING / PRODUCTS & PRACTICE")}
        title={tr("Software engineering. Applied AI.")}
      >
        {tr(
          "Backend engineering is my foundation. I build AI-powered product capabilities and use coding agents throughout the development lifecycle.",
        )}
      </PageIntro>
      <section className="section">
        <p className="eyebrow">{tr("01 / AI IN PRODUCTS")}</p>
        <div className="ai-product">
          <div>
            <h2>{tr("Possbo: AI as a product capability.")}</h2>
            <p>
              {tr(
                "Possbo combines social publishing and campaign management with AI-assisted content generation, insights, and workflows.",
              )}
            </p>
            <p>
              {tr(
                "The engineering work connects these capabilities with content, schedules, and publishing across the frontend and backend.",
              )}
            </p>
            <Link className="text-link" to="/projects/possbo">
              {tr("Explore the Possbo case study")}
              <Arrow />
            </Link>
          </div>
          <div className="tags">
            <span>{tr("Content generation")}</span>
            <span>{tr("Insights")}</span>
            <span>{tr("AI-powered workflows")}</span>
          </div>
        </div>
      </section>
      <section className="section ruled">
        <p className="eyebrow">{tr("02 / AI SYSTEMS — HANDS-ON LEARNING")}</p>
        <h2>{tr("Learning by building and experimenting.")}</h2>
        <p className="section-description">
          {tr(
            "In independent learning projects and experiments, I implement the core architecture behind modern AI applications. These explorations are separate from my professional work at NGSOFT and the verified Possbo product capabilities.",
          )}
        </p>
        <ol className="architecture-flow ai-flow">
          {ragFlow.map((step) => (
            <li key={step}>{tr(step)}</li>
          ))}
        </ol>
        <div className="workflow-grid">
          {learningAreas.map(([title, text]) => (
            <article key={title}>
              <h3>{tr(title)}</h3>
              <p>{tr(text)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section ruled">
        <p className="eyebrow">{tr("03 / AI IN SOFTWARE ENGINEERING")}</p>
        <h2>{tr("From understanding to implementation.")}</h2>
        <p className="section-description">
          {tr(
            "Coding agents are most useful when they can work with the repository, its architecture, and a clearly defined task.",
          )}
        </p>
        <div className="workflow-grid">
          {workflow.map(([title, text]) => (
            <article key={title}>
              <h3>{tr(title)}</h3>
              <p>{tr(text)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-grid section ruled">
        <div>
          <p className="eyebrow">{tr("REPOSITORY CONTEXT")}</p>
          <h2>{tr("Make project knowledge actionable.")}</h2>
          <div className="tags">
            <span>{tr("AGENT.md")}</span>
            <span>{tr("instruction.md")}</span>
          </div>
        </div>
        <div className="prose">
          <p>
            {tr(
              "I create instruction files that describe project architecture, coding standards, repository conventions, and development rules.",
            )}
          </p>
          <p>
            {tr(
              "That context helps agents produce changes that fit the system and supports consistent reviews and onboarding.",
            )}
          </p>
          <h3>{tr("Engineering concepts")}</h3>
          <div className="tags">
            <span>{tr("AI Agents")}</span>
            <span>{tr("Prompt & Context Engineering")}</span>
            <span>{tr("AI-powered Workflows")}</span>
          </div>
        </div>
      </section>
      <section className="about-grid section ruled">
        <div>
          <p className="eyebrow">{tr("THE ENGINEERING WORKFLOW")}</p>
          <h2>{tr("Clear context. Verified changes.")}</h2>
          <p className="muted">
            {tr(
              "A practical loop from problem definition to a reviewed and tested implementation.",
            )}
          </p>
        </div>
        <ol className="architecture-flow ai-flow">
          {steps.map((step) => (
            <li key={step}>{tr(step)}</li>
          ))}
        </ol>
      </section>
      <section className="section ruled">
        <p className="eyebrow">{tr("04 / DEVELOPMENT TOOLS")}</p>
        <h2>{tr("The tools I work with.")}</h2>
        <div className="tool-cards development-tools">
          {["Claude Code", "Codex", "GitHub Copilot"].map((tool) => (
            <div key={tool}>
              <bdi>{tool}</bdi>
            </div>
          ))}
        </div>
      </section>
      <section className="section ruled">
        <p className="eyebrow">{tr("05 / ENGINEERING PRINCIPLES")}</p>
        <h2>{tr("Engineering judgment stays central.")}</h2>
        <p className="principle-summary">
          {tr(
            "Generated changes are reviewed, tested, and validated. Agents follow the project\u2019s architecture and standards; I remain responsible for design and production decisions.",
          )}
        </p>
      </section>
      <div className="project-bottom">
        <Link className="text-link" to="/about">
          {tr("More about my approach")}
          <Arrow />
        </Link>
        <Link className="text-link" to="/contact">
          {tr("Let\u2019s talk engineering")}
          <Arrow />
        </Link>
      </div>
    </>
  );
}
