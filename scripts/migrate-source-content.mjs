import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const sourceOrigin = "http://experimente.joachim-wedekind.de";
const rootDir = fileURLToPath(new URL("..", import.meta.url));
const manifestPath = new URL("../src/data/exhibit-manifest.json", import.meta.url);
const exhibitionPath = new URL("../src/data/exhibition.json", import.meta.url);
const exhibitsDir = new URL("../src/data/exhibits/", import.meta.url);
const assetsDir = new URL("../public/assets/recode-remix-design/", import.meta.url);
const publicAssetPrefix = "/assets/recode-remix-design";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function decodeHtml(value) {
  return load("<span></span>")("<span>").html(value || "").text();
}

function normalizeUrl(value) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim().replace(/&amp;/g, "&");
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("mailto:")) {
    return null;
  }

  try {
    return new URL(trimmed, sourceOrigin);
  } catch {
    return null;
  }
}

function isSourceMediaUrl(url) {
  return url.hostname.endsWith("joachim-wedekind.de") && url.pathname.includes("/wp-content/uploads/");
}

function localAssetFor(url) {
  const relative = decodeURIComponent(url.pathname.split("/wp-content/uploads/")[1]);
  const localPath = `${publicAssetPrefix}/${relative}`;
  const filesystemPath = join(rootDir, "public", localPath);
  return { localPath, filesystemPath };
}

function addUniqueBy(items, item, key) {
  if (!items.some((existing) => existing[key] === item[key])) {
    items.push(item);
  }
}

function parseSrcset(value) {
  return value.split(",").map((part) => {
    const trimmed = part.trim();
    const firstSpace = trimmed.search(/\s/);
    if (firstSpace === -1) {
      return { url: trimmed, descriptor: "" };
    }
    return {
      url: trimmed.slice(0, firstSpace),
      descriptor: trimmed.slice(firstSpace).trim(),
    };
  }).filter((entry) => entry.url);
}

async function downloadMedia(media) {
  for (const item of media) {
    await mkdir(dirname(item.filesystemPath), { recursive: true });
    const bytes = await fetchBuffer(item.sourceUrl);
    await writeFile(item.filesystemPath, bytes);
  }
}

async function migratePage(pageConfig) {
  const page = await fetchJson(`${sourceOrigin}/wp-json/wp/v2/pages/${pageConfig.sourcePageId}`);
  const $ = load(page.content.rendered, { decodeEntities: false });
  const media = [];
  const externalLinks = [];

  function registerMedia(sourceUrl) {
    const url = normalizeUrl(sourceUrl);
    if (!url || !isSourceMediaUrl(url)) {
      return null;
    }

    const asset = localAssetFor(url);
    addUniqueBy(media, {
      sourceUrl: url.toString(),
      localPath: asset.localPath,
      filesystemPath: asset.filesystemPath,
    }, "sourceUrl");

    return asset.localPath;
  }

  $("[src], [href], [data-src], [data-large-file], [data-orig-file]").each((_, element) => {
    const node = $(element);
    for (const attribute of ["src", "href", "data-src", "data-large-file", "data-orig-file"]) {
      const value = node.attr(attribute);
      const url = normalizeUrl(value);
      if (!url) {
        continue;
      }

      if (isSourceMediaUrl(url)) {
        const localPath = registerMedia(url.toString());
        node.attr(attribute, localPath);
      } else if (attribute === "href" && url.origin !== sourceOrigin) {
        addUniqueBy(externalLinks, {
          href: url.toString(),
          text: node.text().trim(),
        }, "href");
      }
    }
  });

  $("[srcset]").each((_, element) => {
    const node = $(element);
    const rewritten = parseSrcset(node.attr("srcset")).map((entry) => {
      const url = normalizeUrl(entry.url);
      if (!url || !isSourceMediaUrl(url)) {
        return `${entry.url}${entry.descriptor ? ` ${entry.descriptor}` : ""}`;
      }

      const localPath = registerMedia(url.toString());
      return `${localPath}${entry.descriptor ? ` ${entry.descriptor}` : ""}`;
    });
    node.attr("srcset", rewritten.join(", "));
  });

  await downloadMedia(media);

  return {
    title: pageConfig.title || decodeHtml(page.title.rendered),
    slug: pageConfig.slug,
    sourceUrl: pageConfig.sourceUrl,
    sourcePageId: page.id,
    sourceSlug: page.slug,
    sourceTitle: decodeHtml(page.title.rendered),
    contentHtml: $.html(),
    media: media.map(({ localPath }) => ({ localPath })),
    externalLinks,
  };
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

await mkdir(dirname(exhibitionPath.pathname), { recursive: true });
await mkdir(exhibitsDir, { recursive: true });
await mkdir(assetsDir, { recursive: true });
await rm(exhibitsDir, { recursive: true, force: true });
await mkdir(exhibitsDir, { recursive: true });

const exhibition = await migratePage({
  title: "Recode.Remix.Design",
  slug: "recode-remix-design",
  sourceUrl: manifest.source.sourceUrl,
  sourcePageId: manifest.source.sourcePageId,
});
await writeFile(exhibitionPath, `${JSON.stringify(exhibition, null, 2)}\n`);

for (const exhibit of manifest.exhibits) {
  const migrated = await migratePage(exhibit);
  const target = new URL(`../src/data/exhibits/${exhibit.slug}.json`, import.meta.url);
  await writeFile(target, `${JSON.stringify(migrated, null, 2)}\n`);
}

console.log(`Migrated exhibition content and ${manifest.exhibits.length} exhibits.`);
