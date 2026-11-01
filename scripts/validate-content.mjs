import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";
import ts from "typescript";
function load(file) {
  const code = readFileSync(file, "utf8").replaceAll(
    "import.meta.env.BASE_URL",
    '"/"',
  );
  const scope = { exports: {}, encodeURIComponent };
  vm.runInNewContext(
    ts.transpile(code, { module: ts.ModuleKind.CommonJS }),
    scope,
  );
  return scope.exports;
}
const { en } = load("src/i18n/en.ts");
const { he } = load("src/i18n/he.ts");
assert.deepEqual(
  Object.keys(en).sort(),
  Object.keys(he).sort(),
  "Language resources must have matching keys",
);
for (const [key, value] of Object.entries(he))
  assert.ok(value.trim(), `Empty Hebrew translation: ${key}`);
const { projects } = load("src/data/projects.ts");
assert.equal(projects.length, 4);
assert.equal(projects[0].slug, "possbo");
assert.equal(projects.filter((project) => project.featured).length, 1);
assert.equal(
  new Set(projects.map((project) => project.slug)).size,
  projects.length,
);
assert.equal(
  projects[0].github,
  "https://github.com/dvirhp/possbo",
  "Possbo must link to its public repository",
);
assert.equal(projects[0].demo, undefined, "Possbo must not link to a public live app");
assert.equal(projects[0].sourceNote, "In Development · Testing");
assert.equal(projects[0].gallery.length, 3);
for (const image of projects[0].gallery) {
  assert.ok(existsSync(`public/${image.src}`));
  const bytes = readFileSync(`public/${image.src}`);
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  assert.ok(bytes.length < 100_000, "Product images should stay web-sized");
}
const translatedFields = new Set([
  "title",
  "description",
  "category",
  "highlights",
  "text",
  "items",
  "flow",
  "caption",
  "alt",
  "label",
  "sourceNote",
]);
function checkTranslations(value, field = "") {
  if (typeof value === "string" && translatedFields.has(field))
    assert.ok(en[value] && he[value], `Missing translation: ${value}`);
  else if (Array.isArray(value))
    value.forEach((item) => checkTranslations(item, field));
  else if (value && typeof value === "object")
    Object.entries(value).forEach(([key, item]) =>
      checkTranslations(item, key),
    );
}
checkTranslations(projects);
const { resume } = load("src/data/resume.ts");
assert.equal(resume.experience.dates, "Dec 2025 – Sep 2026");
assert.ok(he[resume.experience.dates]);
assert.equal(resume.projects[0].title, "Possbo");
assert.equal(resume.projects[0].stage, "Pre-production");
checkTranslations(resume.projects);
const pdf = readFileSync("public/Dvir_Haham_Pour_Resume.pdf");
assert.equal(
  createHash("sha256").update(pdf).digest("hex"),
  "e4ff3b5539ef1b10aabd2f10aa5d829527fd664d2a755bc725f9b99c485622b9",
  "The owner-supplied updated PDF must remain unchanged",
);
const contactSource = readFileSync("src/components/ContactForm.tsx", "utf8");
assert.ok(contactSource.includes('fetch("/api/contact"'));
assert.ok(!contactSource.includes("window.location"));
const { learningAreas, ragFlow } = load("src/data/aiEngineering.ts");
for (const text of [...learningAreas.flat(), ...ragFlow])
  assert.ok(en[text] && he[text], `Missing AI translation: ${text}`);
const { links } = load("src/data/portfolio.ts");
assert.equal(links.cv, "/Dvir_Haham_Pour_Resume.pdf");
assert.ok(
  (await import("node:fs")).readdirSync("public").includes(links.cv.slice(1)),
  "The resume filename must match its URL casing on case-sensitive hosts",
);
const whatsapp = new URL(links.whatsapp);
assert.equal(whatsapp.hostname, "wa.me");
assert.equal(whatsapp.pathname, "/972509507992");
assert.ok(whatsapp.searchParams.get("text").includes("Hi Dvir"));
assert.equal(links.github, "https://github.com/dvirhp");
assert.equal(links.linkedin, "https://www.linkedin.com/in/dvirhp/");
console.log(
  `Content checks passed: ${Object.keys(en).length} bilingual messages, four curated projects, three WebP assets, unchanged PDF, dates, and asynchronous contact submission.`,
);
// Ensure literal UI messages cannot silently fall back to English in Hebrew.
const { readdirSync } = await import('node:fs');
function checkUi(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) checkUi(path);
    else if (path.endsWith('.tsx')) {
      const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      function visit(node) {
        if (ts.isCallExpression(node) && node.expression.getText(source) === 'tr') {
          function message(node) {
            if (ts.isStringLiteral(node)) assert.ok(en[node.text] && he[node.text], `Missing UI translation in ${path}: ${node.text}`);
            else if (ts.isConditionalExpression(node)) { message(node.whenTrue); message(node.whenFalse); }
          }
          if (node.arguments[0]) message(node.arguments[0]);
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
}
checkUi('src');
