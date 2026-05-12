import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("src/data/exhibit-manifest.json", root), "utf8"));
const failures = [];

async function readBuiltPage(path, label) {
  const url = new URL(path, root);
  if (!existsSync(url)) {
    failures.push(`${label} is missing at ${path}`);
    return "";
  }
  return readFile(url, "utf8");
}

const homeHtml = await readBuiltPage("dist/index.html", "homepage");
for (const exhibit of manifest.exhibits) {
  const href = `/exponate/${exhibit.slug}/`;
  if (!homeHtml.includes(`href="${href}"`)) {
    failures.push(`homepage does not link to ${href}`);
  }
}

for (const [index, exhibit] of manifest.exhibits.entries()) {
  const pageHtml = await readBuiltPage(`dist/exponate/${exhibit.slug}/index.html`, exhibit.title);
  if (!pageHtml) {
    continue;
  }

  if (!pageHtml.includes(exhibit.title)) {
    failures.push(`${exhibit.slug} page does not contain title ${exhibit.title}`);
  }
  if (!pageHtml.includes('href="/#exponate"')) {
    failures.push(`${exhibit.slug} page does not link back to overview`);
  }

  const previous = manifest.exhibits[index - 1];
  if (previous && !pageHtml.includes(`href="/exponate/${previous.slug}/"`)) {
    failures.push(`${exhibit.slug} page does not link to previous exhibit ${previous.slug}`);
  }

  const next = manifest.exhibits[index + 1];
  if (next && !pageHtml.includes(`href="/exponate/${next.slug}/"`)) {
    failures.push(`${exhibit.slug} page does not link to next exhibit ${next.slug}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Exhibition page verification passed for ${manifest.exhibits.length} exhibits.`);
