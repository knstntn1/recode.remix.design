import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const distDir = new URL("dist/", root);
const indexPath = new URL("dist/index.html", root);
const forbiddenSource = "experimente.joachim-wedekind.de/wp-content";

const failures = [];

if (!existsSync(indexPath)) {
  failures.push("dist/index.html is missing. Run npm run build first.");
} else {
  const html = await readFile(indexPath, "utf8");
  for (const expected of [
    "Recode.Remix.Design",
    "ComputingEducation 2026",
    "https://computingeducation.de/impressum/",
    "Alle Arbeiten",
    "/exponate/schotter/",
  ]) {
    if (!html.includes(expected)) {
      failures.push(`dist/index.html does not contain: ${expected}`);
    }
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

if (existsSync(distDir)) {
  for (const file of await collectFiles(distDir.pathname)) {
    const contents = await readFile(file, "utf8");
    if (contents.includes(forbiddenSource)) {
      failures.push(`${file} references ${forbiddenSource}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Static output verification passed.");
