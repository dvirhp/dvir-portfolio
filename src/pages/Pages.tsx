import { useI18n } from "../i18n/context";
import { Link } from "react-router-dom";
import { Arrow, ExternalLink, PageIntro, ProjectCard } from "../components/UI";
import { experience, links, technologies } from "../data/portfolio";
import { ContactForm, ResumeActions } from "../components/ContactForm";
import { projects } from "../data/projects";
function Technologies() {
  const { tr } = useI18n();
  return (
    <div className="technology-grid">
      {technologies.map((group, i) => (
        <div className="technology-group" key={group.title}>
          <span className="index-label">0{i + 1}</span>
          <h3>{tr(group.title)}</h3>
          <div className="tags">
            {group.items.map((item) => (
              <span key={item}>
                <bdi>{tr(item)}</bdi>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export function Home() {
  const { tr } = useI18n();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {tr("ENGINEERING WITH INTENTION")}
          </p>
          <h1>
            {tr("Dvir Haham Pour")}
            <span className="accent">.</span>
          </h1>
          <p className="hero-role" dir="ltr">
            {tr("Software Engineer")}
            <span>|</span>
            {tr("Backend & AI")}
          </p>
          <p className="hero-description">
            {tr(
              "Building reliable backend systems, cloud-native applications, and AI-powered products.",
            )}
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/projects">
              {tr("View Projects")}
              <Arrow />
            </Link>
            <a className="button secondary" href={links.cv} download>
              {tr("Download CV")}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-socials">
            <ExternalLink href={links.github}>
              {tr("GitHub")}
              <Arrow diagonal />
            </ExternalLink>
            <ExternalLink href={links.linkedin}>
              {tr("LinkedIn")}
              <Arrow diagonal />
            </ExternalLink>
            <ExternalLink href={links.cv}>
              {tr("View Resume")}
              <Arrow diagonal />
            </ExternalLink>
            <span className="social-rule" />
            <span className="mono">{tr("CODE. BUILD. REFINE.")}</span>
          </div>
        </div>
        <div
          dir="ltr"
          className="engineering-panel"
          aria-label={tr(
            "Engineering focus: backend systems, cloud-native applications, and AI-powered products",
          )}
        >
          <div className="panel-heading">
            <span className="panel-dots">
              <i />
              <i />
              <i />
            </span>
            <span>{tr("engineering / focus")}</span>
            <span>↗</span>
          </div>
          <div className="panel-code" dir="ltr">
            <span className="code-comment">
              {"// built on solid foundations"}
            </span>
            <p>
              <span className="code-keyword">const</span> engineer = {"{"}
            </p>
            <p className="indent">
              name: <span className="code-string">'Dvir Haham Pour'</span>,
            </p>
            <p className="indent">focus: [</p>
            <p className="indent-two code-string">'Backend systems',</p>
            <p className="indent-two code-string">
              'Cloud-native applications',
            </p>
            <p className="indent-two code-string">'AI-powered products'</p>
            <p className="indent">],</p>
            <p className="indent">
              approach:{" "}
              <span className="code-string">'Build with purpose'</span>
            </p>
            <p>{"};"}</p>
          </div>
          <div className="panel-footer">
            <span>
              <span className="status-dot" />
              {tr("Reliability by design")}
            </span>
            <span>{tr("TypeScript")}</span>
          </div>
        </div>
      </section>
      <section className="intro-strip">
        <p className="eyebrow">{tr("THE WAY I BUILD")}</p>
        <p>
          {tr("Strong foundations. Thoughtful architecture.")}
          <br />
          <span>{tr("Software that holds up beyond the first release.")}</span>
        </p>
        <Link className="text-link" to="/about">
          {tr("More about me")}
          <Arrow />
        </Link>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{tr("01 / SELECTED WORK")}</p>
            <h2>
              {tr("Engineering in practice")}
              <span className="accent">.</span>
            </h2>
          </div>
          <Link className="text-link" to="/projects">
            {tr("All projects")}
            <Arrow />
          </Link>
        </div>
        <p className="section-description">
          {tr(
            "From low-level systems to connected services and better development workflows.",
          )}
        </p>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{tr("02 / CORE TECHNOLOGIES")}</p>
            <h2>
              {tr("The tools behind the work")}
              <span className="accent">.</span>
            </h2>
          </div>
          <span className="section-note mono">{tr("PURPOSE OVER HYPE")}</span>
        </div>
        <p className="section-description">
          {tr(
            "A practical toolkit for backend engineering, distributed systems, cloud-native architecture, and AI-assisted development.",
          )}
        </p>
        <Technologies />
      </section>
      <section className="home-experience">
        <div>
          <p className="eyebrow">{tr("03 / EXPERIENCE")}</p>
          <h2>{tr("Built in practice.")}</h2>
        </div>
        <div>
          <span className="mono muted">{tr("Dec 2025 \u2014 Aug 2026")}</span>
          <h3>
            {tr("Software Engineer")}
            <span className="muted">{tr("at NGSOFT")}</span>
          </h3>
          <p>
            {tr(
              "Backend services, reliable synchronization, and cloud-native delivery.",
            )}
          </p>
        </div>
        <Link className="text-link" to="/experience">
          {tr("Explore experience")}
          <Arrow />
        </Link>
      </section>
      <section className="ai-crosslink">
        <div>
          <p className="eyebrow">{tr("AI ENGINEERING")}</p>
          <h2>{tr("Products first. Engineering throughout.")}</h2>
          <p>
            {tr("AI-powered products and practical engineering workflows.")}
          </p>
        </div>
        <Link className="text-link" to="/ai-engineering">
          {tr("Explore AI engineering")}
          <Arrow />
        </Link>
      </section>
      <ContactBanner />
    </>
  );
}
function ContactBanner() {
  const { tr } = useI18n();
  return (
    <section className="contact-banner recruiter-banner">
      <div>
        <p className="eyebrow">{tr("LET\u2019S WORK TOGETHER")}</p>
        <h2>{tr("Let’s talk engineering.")}</h2>
        <p>
          {tr(
            "I\u2019m open to Software Engineering opportunities, especially in backend development, distributed systems, cloud-native applications, and applied AI. If you\u2019re hiring or building something interesting, let\u2019s connect.",
          )}
        </p>
        <Link className="text-link" to="/resume">
          {tr("Explore my resume")}
          <Arrow />
        </Link>
      </div>
      <div className="recruiter-actions">
        <Link className="button primary" to="/contact">
          {tr("Contact Me")}
          <Arrow />
        </Link>
        <ExternalLink className="button secondary" href={links.whatsapp}>
          {tr("WhatsApp")}
          <Arrow diagonal />
        </ExternalLink>
        <ExternalLink className="text-link" href={links.linkedin}>
          {tr("LinkedIn")}
          <Arrow diagonal />
        </ExternalLink>
      </div>
    </section>
  );
}
export function About() {
  const { tr } = useI18n();
  return (
    <>
      <PageIntro
        label={tr("ABOUT / THE ENGINEER")}
        title={tr("Thoughtful code. Reliable systems.")}
      >
        {tr(
          "I\u2019m Dvir Haham Pour, a Software Engineer with a B.Sc. in Computer Science and a strong focus on backend development and AI.",
        )}
      </PageIntro>
      <section className="about-grid section">
        <div>
          <p className="eyebrow">{tr("MY APPROACH")}</p>
          <h2>
            {tr("Built to be understood.")}
            <br />
            {tr("Designed to be maintained.")}
          </h2>
        </div>
        <div className="prose">
          <p>
            {tr(
              "I enjoy building reliable, maintainable backend systems and cloud-native applications, and solving complex technical problems.",
            )}
          </p>
          <p>
            {tr(
              "My experience spans scalable applications built with Node.js, NestJS, TypeScript, PostgreSQL, Redis, AWS, Docker, Kubernetes, and Angular.",
            )}
          </p>
          <p>
            {tr(
              "I also build AI-powered capabilities and integrate AI-assisted workflows into the software engineering lifecycle.",
            )}
          </p>
          <Link className="text-link" to="/ai-engineering">
            {tr("Explore my AI engineering practice")}
            <Arrow />
          </Link>
          <ResumeActions />
          <h3>{tr("Areas of focus")}</h3>
          <div className="tags">
            {[
              "REST APIs",
              "Distributed systems",
              "Real-time systems",
              "Cloud-native architectures",
              "Database design",
              "Production-ready backend services",
              "AI-powered development workflows",
            ].map((t) => (
              <span key={t}>{tr(t)}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{tr("TECH STACK")}</p>
            <h2>{tr("A practical engineering toolkit.")}</h2>
          </div>
        </div>
        <Technologies />
      </section>
      <Education />
      <ContactBanner />
    </>
  );
}
function Education() {
  const { tr } = useI18n();
  return (
    <section className="education section">
      <p className="eyebrow">{tr("EDUCATION")}</p>
      <div className="education-inner">
        <div>
          <span className="mono muted">2022 — 2025</span>
          <h2>{tr("The Open University of Israel")}</h2>
          <h3>{tr("Bachelor of Science (B.Sc.) in Computer Science")}</h3>
        </div>
        <div>
          <p>
            {tr(
              "Software development, algorithms, data structures, and systems programming.",
            )}
          </p>
          <Link className="text-link" to="/projects/24-bit-assembler">
            {tr("Academic project: 24-bit Assembler")}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Experience() {
  const { tr } = useI18n();
  return (
    <>
      <PageIntro
        label={tr("EXPERIENCE / PROFESSIONAL JOURNEY")}
        title={tr("Engineering beyond the code.")}
      >
        {tr(
          "Building backend systems, strengthening shared foundations, and taking applications from development to deployment.",
        )}
      </PageIntro>
      <section className="experience-layout section">
        <aside>
          <p className="eyebrow">{tr("Dec 2025 \u2014 Aug 2026")}</p>
          <h2>{tr("NGSOFT")}</h2>
          <p>{tr("Software Engineer")}</p>
          <div className="tags">
            <span>{tr("Backend")}</span>
            <span>{tr("Cloud")}</span>
            <span>{tr("AI-assisted development")}</span>
          </div>
        </aside>
        <div className="timeline">
          {experience.map((item, i) => (
            <article key={item.title}>
              <span className="timeline-number">0{i + 1}</span>
              <h3>{tr(item.title)}</h3>
              <p>{tr(item.text)}</p>
            </article>
          ))}
        </div>
      </section>
      <Education />
      <ContactBanner />
    </>
  );
}
export function Contact() {
  const { tr } = useI18n();
  return (
    <>
      <PageIntro
        label={tr("CONTACT / LET\u2019S WORK TOGETHER")}
        title={tr("Let\u2019s talk engineering.")}
      >
        {tr(
          "I\u2019m open to Software Engineering opportunities, especially in backend development, distributed systems, cloud-native applications, and applied AI. If you\u2019re hiring or building something interesting, let\u2019s connect.",
        )}
      </PageIntro>
      <section className="contact-layout">
        <ContactForm />
        <aside className="contact-direct">
          <p className="eyebrow">{tr("PREFER A DIRECT CONVERSATION?")}</p>
          <h2>{tr("Choose your channel.")}</h2>
          <a className="direct-contact" href={links.email}>
            <span>{tr("Email Me")}</span>
            <span dir="ltr">
              dvir.hahampour@gmail.com
              <Arrow diagonal />
            </span>
          </a>
          <ExternalLink className="direct-contact" href={links.whatsapp}>
            <span>{tr("WhatsApp")}</span>
            <span>
              {tr("Message me on WhatsApp")}
              <Arrow diagonal />
            </span>
          </ExternalLink>
          <ExternalLink className="direct-contact" href={links.linkedin}>
            <span>{tr("LinkedIn")}</span>
            <span>
              {tr("Connect professionally")}
              <Arrow diagonal />
            </span>
          </ExternalLink>
          <ExternalLink className="direct-contact" href={links.github}>
            <span>{tr("GitHub")}</span>
            <span>
              {tr("Explore my public code")}
              <Arrow diagonal />
            </span>
          </ExternalLink>
          <div className="contact-resume">
            <h3>{tr("Get the full picture.")}</h3>
            <Link className="text-link" to="/resume">
              {tr("Read my resume")}
              <Arrow />
            </Link>
            <ResumeActions />
          </div>
        </aside>
      </section>
    </>
  );
}
export function NotFound() {
  const { tr } = useI18n();
  return (
    <div className="not-found">
      <PageIntro
        label={tr("404 / PAGE NOT FOUND")}
        title={tr("This route ends here.")}
      >
        {tr(
          "The page you\u2019re looking for doesn\u2019t exist. There\u2019s still plenty to explore.",
        )}
      </PageIntro>
      <Link className="button primary" to="/">
        {tr("Back to home")}
        <Arrow />
      </Link>
    </div>
  );
}
