import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const manifestPath = new URL("src/data/exhibit-manifest.json", root);
const exhibitionPath = new URL("src/data/exhibition.json", root);
const dataDir = new URL("src/data/", root);
const forbiddenSourcePattern = /joachim-wedekind\.de\/wp-content/;
const failures = [];

async function readJson(url, label) {
  if (!existsSync(url)) {
    failures.push(`${label} is missing.`);
    return null;
  }

  try {
    return JSON.parse(await readFile(url, "utf8"));
  } catch (error) {
    failures.push(`${label} is not valid JSON: ${error.message}`);
    return null;
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

function requireContent(page, label) {
  if (!page?.contentHtml || page.contentHtml.trim().length === 0) {
    failures.push(`${label} has empty contentHtml.`);
  }
}

function verifyMedia(page, label) {
  if (!Array.isArray(page?.media)) {
    failures.push(`${label} media must be an array.`);
    return;
  }

  for (const media of page.media) {
    if (media.sourceUrl) {
      failures.push(`${label} media contains sourceUrl metadata.`);
    }
    if (!media.localPath?.startsWith("/assets/recode-remix-design/")) {
      failures.push(`${label} has invalid media localPath: ${media.localPath}`);
      continue;
    }

    const publicPath = new URL(`public${media.localPath}`, root);
    if (!existsSync(publicPath)) {
      failures.push(`${label} references missing local asset: ${media.localPath}`);
    }
  }
}

const manifest = await readJson(manifestPath, "src/data/exhibit-manifest.json");
if (manifest) {
  if (!Array.isArray(manifest.exhibits) || manifest.exhibits.length !== 17) {
    failures.push("src/data/exhibit-manifest.json must contain exactly 17 exhibits.");
  }

  const slugs = new Set();
  for (const exhibit of manifest.exhibits || []) {
    if (slugs.has(exhibit.slug)) {
      failures.push(`Duplicate exhibit slug: ${exhibit.slug}`);
    }
    slugs.add(exhibit.slug);
  }

  const fiveHundred = manifest.exhibits?.find((exhibit) => exhibit.title === "500 Linien");
  if (!fiveHundred || fiveHundred.slug !== "500-linien" || fiveHundred.sourcePageId !== 625) {
    failures.push("500 Linien must use slug 500-linien and sourcePageId 625.");
  }
}

const exhibition = await readJson(exhibitionPath, "src/data/exhibition.json");
requireContent(exhibition, "src/data/exhibition.json");
verifyMedia(exhibition, "src/data/exhibition.json");

for (const exhibit of manifest?.exhibits || []) {
  const exhibitPath = new URL(`src/data/exhibits/${exhibit.slug}.json`, root);
  const page = await readJson(exhibitPath, `src/data/exhibits/${exhibit.slug}.json`);
  requireContent(page, `src/data/exhibits/${exhibit.slug}.json`);
  verifyMedia(page, `src/data/exhibits/${exhibit.slug}.json`);
}

if (existsSync(dataDir)) {
  for (const file of await collectFiles(dataDir.pathname)) {
    const contents = await readFile(file, "utf8");
    if (forbiddenSourcePattern.test(contents)) {
      failures.push(`${file} contains a Joachim-Wedekind wp-content media URL`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Migration verification passed.");
