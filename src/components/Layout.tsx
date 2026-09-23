import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { links } from "../data/portfolio";
import { projects } from "../data/projects";
import { Arrow, ExternalLink } from "./UI";
import { useI18n } from "../i18n/context";
export function Layout() {
  const { language, setLanguage, tr } = useI18n();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previous = useRef(pathname);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101112" : "#f7f8f5");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [theme]);
  useEffect(() => {
    const project = projects.find((p) => pathname === `/projects/${p.slug}`);
    const page =
      project?.title ??
      (
        {
          "/about": "About",
          "/projects": "Projects",
          "/experience": "Experience",
          "/contact": "Contact",
          "/resume": "Resume",
          "/ai-engineering": "AI Engineering",
        } as Record<string, string>
      )[pathname];
    document.title = page
      ? `${tr(page)} | ${tr("Dvir Haham Pour")}`
      : tr("Dvir Haham Pour | Software Engineer - Backend & AI");
    const description = tr(
      project?.description ??
        "Software Engineer focused on backend development, distributed systems, cloud-native applications, and AI-powered products.",
    );
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "he" ? "he_IL" : "en_US");
    if (previous.current !== pathname) {
      window.scrollTo(0, 0);
      main.current?.focus();
      previous.current = pathname;
    }
  }, [pathname, tr, language]);
  const nav = [
    ["/", "Home"],
    ["/about", "About"],
    ["/projects", "Projects"],
    ["/experience", "Experience"],
    ["/ai-engineering", "AI Engineering"],
    ["/resume", "Resume"],
    ["/contact", "Contact"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        {tr("Skip to content")}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            to="/"
            aria-label={tr("Dvir Haham Pour home")}
            dir="ltr"
          >
            dvir<span>.</span>
          </Link>
          <nav aria-label={tr("Main navigation")}>
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {tr(label)}
              </NavLink>
            ))}
          </nav>
          <div className="header-controls">
            <div
              className="language-switch"
              role="group"
              aria-label={tr("Language")}
              dir="ltr"
            >
              <button
                type="button"
                lang="en"
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                lang="he"
                aria-pressed={language === "he"}
                onClick={() => setLanguage("he")}
              >
                עב
              </button>
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={tr(
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme",
              )}
            >
              <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
            </button>
          </div>
        </div>
      </header>
      <main id="main" ref={main} tabIndex={-1} className="container">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <Link className="footer-name" to="/">
              {tr("Dvir Haham Pour")}
              <span>.</span>
            </Link>
            <p>
              <bdi>Software Engineer | Backend & AI</bdi>
            </p>
          </div>
          <nav
            className="footer-quick-links"
            aria-label={tr("Footer navigation")}
          >
            {[
              ["/projects", "Projects"],
              ["/experience", "Experience"],
              ["/resume", "Resume"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <Link key={to} to={to}>
                {tr(label)}
              </Link>
            ))}
          </nav>
          <div className="footer-links">
            <ExternalLink href={links.github}>
              GitHub <Arrow diagonal />
            </ExternalLink>
            <ExternalLink href={links.linkedin}>
              LinkedIn <Arrow diagonal />
            </ExternalLink>
            <a href={links.email}>
              {tr("Email")} <Arrow diagonal />
            </a>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} {tr("Dvir Haham Pour")}
          </p>
        </div>
      </footer>
    </>
  );
}
