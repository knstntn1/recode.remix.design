import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { load } from "cheerio";

const root = new URL("..", import.meta.url);
const distDir = new URL("dist/", root);
const manifest = JSON.parse(await readFile(new URL("src/data/exhibit-manifest.json", root), "utf8"));
const forbiddenSourcePattern = /joachim-wedekind\.de\/wp-content/;
const failures = [];

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

function builtPagePath(pathname) {
  if (pathname === "/") {
    return new URL("dist/index.html", root);
  }

  const clean = pathname.replace(/^\/|\/$/g, "");
  return new URL(`dist/${clean}/index.html`, root);
}

function builtAssetPath(pathname) {
  return new URL(`dist${pathname}`, root);
}

function checkAnchor(html, hash, label) {
  if (!hash) {
    return;
  }
  const id = decodeURIComponent(hash.slice(1));
  if (!id) {
    return;
  }
  const $ = load(html);
  if ($(`#${id}`).length === 0 && $(`[name="${id}"]`).length === 0) {
    failures.push(`${label} references missing anchor #${id}`);
  }
}

for (const page of [
  { label: "homepage", path: "dist/index.html" },
  ...manifest.exhibits.map((exhibit) => ({
    label: exhibit.title,
    path: `dist/exponate/${exhibit.slug}/index.html`,
  })),
]) {
  const pageUrl = new URL(page.path, root);
  if (!existsSync(pageUrl)) {
    failures.push(`${page.label} missing at ${page.path}`);
  }
}

const files = existsSync(distDir) ? await collectFiles(distDir.pathname) : [];
for (const file of files) {
  const contents = await readFile(file, "utf8");
  if (forbiddenSourcePattern.test(contents)) {
    failures.push(`${file} contains a Joachim-Wedekind wp-content media URL`);
  }

  if (extname(file) !== ".html") {
    continue;
  }

  const html = contents;
  const $ = load(html);
  const refs = [];

  $("[href]").each((_, element) => refs.push($(element).attr("href")));
  $("[src]").each((_, element) => refs.push($(element).attr("src")));
  $("[srcset]").each((_, element) => {
    for (const part of ($(element).attr("srcset") || "").split(",")) {
      refs.push(part.trim().split(/\s+/)[0]);
    }
  });

  for (const ref of refs.filter(Boolean)) {
    if (ref.startsWith("#") || ref.startsWith("mailto:") || ref.startsWith("tel:")) {
      checkAnchor(html, ref, file);
      continue;
    }

    let url;
    try {
      url = new URL(ref, "https://gallery.computingeducation.de");
    } catch {
      failures.push(`${file} has invalid reference: ${ref}`);
      continue;
    }

    if (url.origin !== "https://gallery.computingeducation.de") {
      continue;
    }

    if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/_astro/")) {
      if (!existsSync(builtAssetPath(url.pathname))) {
        failures.push(`${file} references missing asset ${url.pathname}`);
      }
      continue;
    }

    const target = builtPagePath(url.pathname);
    if (!existsSync(target)) {
      failures.push(`${file} references missing page ${url.pathname}`);
      continue;
    }

    if (url.hash) {
      const targetHtml = await readFile(target, "utf8");
      checkAnchor(targetHtml, url.hash, `${file} -> ${url.pathname}${url.hash}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Build output verification passed for ${manifest.exhibits.length} exhibits.`);
