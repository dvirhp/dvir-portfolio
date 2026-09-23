import { useI18n } from "../i18n/context";
import { PageIntro } from "../components/UI";
import { ResumeActions } from "../components/ContactForm";
import { resume } from "../data/resume";
export function Resume() {
  const { tr } = useI18n();
  return (
    <>
      <PageIntro
        label={tr("RESUME / PROFESSIONAL PROFILE")}
        title={tr("Dvir Haham Pour")}
      >
        {tr("Software Engineer | Backend & AI")}
      </PageIntro>
      <div className="resume-toolbar">
        <ResumeActions pdfLabels />
        <p className="muted">
          {tr("A concise profile. The original PDF is available in full.")}
        </p>
      </div>
      <div className="resume-document">
        <section>
          <p className="eyebrow">{tr("PROFILE")}</p>
          <h2>{tr("Professional Summary")}</h2>
          <p>{tr(resume.summary)}</p>
        </section>
        <section>
          <p className="eyebrow">{tr("EXPERIENCE")}</p>
          <div className="section-heading">
            <h2>{tr(resume.experience.company)}</h2>
            <span className="mono muted">{tr(resume.experience.dates)}</span>
          </div>
          <h3>{tr(resume.experience.title)}</h3>
          <ul className="challenge-list">
            {resume.experience.items.map((item) => (
              <li key={item}>{tr(item)}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{tr("Technical Skills")}</h2>
          <div className="tags">
            {resume.skills.map((item) => (
              <span key={item}>
                <bdi>{tr(item)}</bdi>
              </span>
            ))}
          </div>
          <h3>{tr("AI & Developer Tools")}</h3>
          <div className="tags">
            {resume.tools.map((item) => (
              <span key={item}>
                <bdi>{tr(item)}</bdi>
              </span>
            ))}
          </div>
        </section>
        <section>
          <p className="eyebrow">
            {tr("EDUCATION")} / <bdi>{resume.education.dates}</bdi>
          </p>
          <h2>{tr(resume.education.institution)}</h2>
          <h3>{tr(resume.education.degree)}</h3>
          <ul className="challenge-list">
            {resume.education.items.map((item) => (
              <li key={item}>{tr(item)}</li>
            ))}
          </ul>
        </section>
        <section>
          <p className="eyebrow">
            {tr("Military Service")} / <bdi>{resume.service.dates}</bdi>
          </p>
          <h2>{tr(resume.service.organization)}</h2>
          <h3>{tr(resume.service.role)}</h3>
          <p>{tr(resume.service.description)}</p>
        </section>
        <section>
          <h2>{tr("Languages")}</h2>
          <div className="tags">
            {resume.languages.map((item) => (
              <span key={item}>
                <bdi>{tr(item)}</bdi>
              </span>
            ))}
          </div>
        </section>
        <section>
          <h2>{tr("Download Full Resume")}</h2>
          <ResumeActions pdfLabels />
        </section>
      </div>
    </>
  );
}
