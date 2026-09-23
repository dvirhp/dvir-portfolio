import { useI18n } from "../i18n/context";
import { useRef, useState } from "react";
import type { FormEvent } from "react";

import { Arrow, ExternalLink } from "./UI";
import { links } from "../data/portfolio";
export function ResumeActions({ pdfLabels = false }: { pdfLabels?: boolean }) {
  const { tr } = useI18n();
  return (
    <div className="hero-actions resume-actions">
      <ExternalLink href={links.cv} className="button secondary">
        {tr(pdfLabels ? "View PDF" : "View Resume")} <Arrow diagonal />
      </ExternalLink>
      <a href={links.cv} download className="button secondary">
        {tr(pdfLabels ? "Download PDF" : "Download CV")}{" "}
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
export function ContactForm() {
  const { tr } = useI18n();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "limited"
  >("idle");
  const busy = useRef(false);
  const request = useRef({ payload: "", id: "" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      ["name", "email", "company", "subject", "message", "website"].map(
        (key) => [key, String(data.get(key) ?? "").trim()],
      ),
    );
    for (const key of ["name", "subject", "message"]) {
      const field = form.elements.namedItem(key) as HTMLInputElement;
      field.setCustomValidity(values[key] ? "" : tr("Please enter a value."));
    }
    if (!form.reportValidity()) return;
    const payload = JSON.stringify(values);
    if (request.current.payload !== payload)
      request.current = { payload, id: crypto.randomUUID() };
    busy.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, requestId: request.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (response.ok && result.ok === true) {
        form.reset();
        request.current = { payload: "", id: "" };
        setStatus("success");
      } else setStatus(response.status === 429 ? "limited" : "error");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onInput={(event) => {
        (event.target as HTMLInputElement).setCustomValidity("");
        if (!busy.current) setStatus("idle");
      }}
      aria-busy={status === "sending"}
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title">{tr("Start a conversation.")}</h2>
      <p id="form-help" className="muted">
        {tr("Send your message directly from this page.")}
      </p>
      <fieldset disabled={status === "sending"} className="contact-fields">
        <label className="contact-honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="form-row">
          <label htmlFor="contact-name">
            {tr("Name")}
            <input
              dir="auto"
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor="contact-email">
            {tr("Email")}
            <input
              dir="ltr"
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
            />
          </label>
        </div>
        <label htmlFor="contact-company">
          {tr("Company")}
          <span className="muted">{tr("(optional)")}</span>
          <input
            dir="auto"
            id="contact-company"
            name="company"
            autoComplete="organization"
            maxLength={150}
          />
        </label>
        <label htmlFor="contact-subject">
          {tr("Subject")}
          <input
            dir="auto"
            id="contact-subject"
            name="subject"
            required
            maxLength={150}
          />
        </label>
        <label htmlFor="contact-message">
          {tr("Message")}
          <textarea
            dir="auto"
            id="contact-message"
            name="message"
            rows={7}
            required
            maxLength={2500}
          />
        </label>
        <button
          type="submit"
          className="button primary"
          aria-describedby="form-help"
        >
          {tr(status === "sending" ? "Sending\u2026" : "Send Message")}
          <Arrow />
        </button>
      </fieldset>
      <p role="status" aria-live="polite" className={`form-status ${status}`}>
        {status === "success"
          ? tr("Message sent successfully. I\u2019ll get back to you soon.")
          : status === "limited"
            ? tr("Too many attempts. Please wait a few minutes and try again.")
            : status === "error"
              ? tr(
                  "Could not send your message. Your details are saved here; please try again.",
                )
              : status === "sending"
                ? tr("Sending\u2026")
                : ""}
      </p>
    </form>
  );
}
