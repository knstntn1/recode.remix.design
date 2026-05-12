import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { load } from "cheerio";

const checkOnly = process.argv.includes("--check");
const sourceOrigin = "http://experimente.joachim-wedekind.de";
const mainPageId = 590;
const outputPath = new URL("../src/data/exhibit-manifest.json", import.meta.url);
const expectedTitles = [
  "Schotter",
  "Boxes",
  "500 Linien",
  "Quadrate",
  "Binary Rhythm",
  "Grid Based Systems",
  "Inequality",
  "Permutationen",
  "Labyrinth",
  "Random Windows",
  "n-Ecken",
  "Kraftlinien",
  "Komputerstrukturen",
  "Farbzentren",
  "Punkt.Linie.Flaeche",
  "Fraktale",
  "Sinus Addition",
];

const titleAliases = new Map([
  ["Punkt.Linie.Fläche", "Punkt.Linie.Flaeche"],
]);

const slugByTitle = new Map([
  ["Schotter", "schotter"],
  ["Boxes", "boxes"],
  ["500 Linien", "500-linien"],
  ["Quadrate", "quadrate"],
  ["Binary Rhythm", "binary-rhythm"],
  ["Grid Based Systems", "grid-based-systems"],
  ["Inequality", "inequality"],
  ["Permutationen", "permutationen"],
  ["Labyrinth", "labyrinth"],
  ["Random Windows", "random-windows"],
  ["n-Ecken", "n-ecken"],
  ["Kraftlinien", "kraftlinien"],
  ["Komputerstrukturen", "komputerstrukturen"],
  ["Farbzentren", "farbzentren"],
  ["Punkt.Linie.Flaeche", "punkt-linie-flaeche"],
  ["Fraktale", "fraktale"],
  ["Sinus Addition", "sinus-addition"],
]);

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function normalizeTitle(title) {
  return titleAliases.get(title) || title;
}

function decodeHtml(value) {
  return load("<span></span>")("<span>").html(value).text();
}

function sourceUrlFromHref(href) {
  return new URL(href.replace(/&amp;/g, "&"), sourceOrigin).toString();
}

async function resolveSourcePage(sourceUrl) {
  const url = new URL(sourceUrl);
  const pageId = url.searchParams.get("page_id");

  if (pageId) {
    const page = await fetchJson(`${sourceOrigin}/wp-json/wp/v2/pages/${pageId}`);
    return page;
  }

  const wpSlug = url.pathname.replace(/^\/|\/$/g, "");
  const pages = await fetchJson(`${sourceOrigin}/wp-json/wp/v2/pages?slug=${encodeURIComponent(wpSlug)}`);
  if (!pages[0]) {
    throw new Error(`No REST page found for ${sourceUrl}`);
  }
  return pages[0];
}

const mainPage = await fetchJson(`${sourceOrigin}/wp-json/wp/v2/pages/${mainPageId}`);
const $ = load(mainPage.content.rendered);
const links = $("a").toArray().map((element) => {
  const link = $(element);
  return {
    href: link.attr("href"),
    text: link.text().trim(),
  };
}).filter((link) => link.href && link.text);

const exhibitLinks = links.map((link) => ({
  title: normalizeTitle(link.text),
  sourceUrl: sourceUrlFromHref(link.href),
})).filter((link) => expectedTitles.includes(link.title));

const foundTitles = exhibitLinks.map((link) => link.title);
const missingTitles = expectedTitles.filter((title) => !foundTitles.includes(title));
if (missingTitles.length > 0) {
  throw new Error(`Missing exhibit links: ${missingTitles.join(", ")}`);
}

const duplicateTitles = foundTitles.filter((title, index) => foundTitles.indexOf(title) !== index);
if (duplicateTitles.length > 0) {
  throw new Error(`Duplicate exhibit links: ${[...new Set(duplicateTitles)].join(", ")}`);
}

const exhibits = [];
for (const expectedTitle of expectedTitles) {
  const link = exhibitLinks.find((item) => item.title === expectedTitle);
  const page = await resolveSourcePage(link.sourceUrl);
  const slug = slugByTitle.get(expectedTitle);

  exhibits.push({
    order: exhibits.length + 1,
    title: expectedTitle,
    slug,
    sourceUrl: link.sourceUrl,
    sourcePageId: page.id,
    sourceSlug: page.slug,
    sourceTitle: decodeHtml(page.title.rendered),
  });
}

const manifest = {
  source: {
    title: decodeHtml(mainPage.title.rendered),
    sourceUrl: `${sourceOrigin}/recode-remix-design/`,
    sourcePageId: mainPage.id,
    sourceSlug: mainPage.slug,
  },
  exhibits,
};

const serialized = `${JSON.stringify(manifest, null, 2)}\n`;

if (checkOnly) {
  if (!existsSync(outputPath)) {
    throw new Error("src/data/exhibit-manifest.json does not exist.");
  }
  const existing = await readFile(outputPath, "utf8");
  if (existing !== serialized) {
    throw new Error("src/data/exhibit-manifest.json is out of date. Run npm run inventory:source.");
  }
  console.log("Source inventory check passed.");
} else {
  await mkdir(dirname(outputPath.pathname), { recursive: true });
  await writeFile(outputPath, serialized);
  console.log(`Wrote ${exhibits.length} exhibits to src/data/exhibit-manifest.json.`);
}
