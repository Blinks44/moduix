// Screenshots built playground stories and compares every adapter with React CSS Modules.
// Usage: pnpm run compare:stories [component...]   (run build:storybook in the playgrounds first)
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import pixelmatch from 'pixelmatch';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const reference = 'react';
const maxDiffRatio = 0.001;
// Story ids, or id prefixes for a whole component.
const skipped = [
  // CSS Modules style these demos through component variables and Tailwind through utilities.
  'components-angleslider--custom-styling',
  'components-marquee--custom-styling',
  'components-pagination--custom-styles',
  'components-tagsinput--custom-styling',
  // Solid applies `multiple` after inserting options, so the first option starts selected.
  'components-nativeselect--multiple',
  // The sidebar converts its default width to a percentage of a container measured on mount.
  'components-sidebar--',
  // Ark Vue renders the key separator without the trailing space that Ark React and Solid keep.
  'utilities-jsontreeview--basic',
  'utilities-jsontreeview--compact-previews',
];
const outDir = '.stories-diff';
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};

const playgrounds = readdirSync('playgrounds').filter((name) =>
  existsSync(join('playgrounds', name, 'storybook-static/index.json')),
);
const components = process.argv.slice(2);
const index = JSON.parse(
  readFileSync(`playgrounds/${reference}/storybook-static/index.json`, 'utf8'),
);
const stories = Object.values(index.entries)
  .filter((entry) => entry.type === 'story')
  .map((entry) => entry.id)
  .filter((id) => !skipped.some((skip) => id.startsWith(skip)))
  .filter(
    (id) => !components.length || components.some((name) => id.startsWith(`components-${name}--`)),
  );

const server = createServer((request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, 'http://x').pathname)).replace(
    /^(\.\.[/\\])+/,
    '',
  );
  const file = join('playgrounds', path);
  if (!existsSync(file)) return response.writeHead(404).end();
  response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  response.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1024, height: 768 },
  reducedMotion: 'reduce',
});

async function screenshot(page, playground, id) {
  await page.goto(`${origin}/${playground}/storybook-static/iframe.html?id=${id}&viewMode=story`);
  await page.waitForSelector('#storybook-root > *', { state: 'attached' });
  await page.addStyleTag({
    content:
      // The playground name badge differs by design, so it is hidden.
      'body::before { display: none !important; } *, ::before, ::after { animation: none !important; transition: none !important; caret-color: transparent !important; }',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  return PNG.sync.read(await page.screenshot({ fullPage: true }));
}

rmSync(outDir, { recursive: true, force: true });
// All playgrounds share one origin, so state a story persists must not leak into the next one.
await context.addInitScript(() => localStorage.clear());
const pages = await Promise.all(playgrounds.map(() => context.newPage()));
const failures = [];

for (const id of stories) {
  const shots = await Promise.all(
    playgrounds.map((playground, i) => screenshot(pages[i], playground, id)),
  );
  const expected = shots[playgrounds.indexOf(reference)];
  playgrounds.forEach((playground, i) => {
    if (playground === reference) return;
    const actual = shots[i];
    let reason = '';
    if (actual.width !== expected.width || actual.height !== expected.height) {
      reason = `size ${actual.width}x${actual.height}, expected ${expected.width}x${expected.height}`;
    } else {
      const diff = new PNG({ width: expected.width, height: expected.height });
      const changed = pixelmatch(
        expected.data,
        actual.data,
        diff.data,
        expected.width,
        expected.height,
        { threshold: 0.1 },
      );
      if (changed / (expected.width * expected.height) <= maxDiffRatio) return;
      reason = `${changed} pixels differ`;
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, `${id}.${playground}.diff.png`), PNG.sync.write(diff));
      writeFileSync(join(outDir, `${id}.${playground}.png`), PNG.sync.write(actual));
      writeFileSync(join(outDir, `${id}.${reference}.png`), PNG.sync.write(expected));
    }
    failures.push(`${id} [${playground}]: ${reason}`);
  });
}

await browser.close();
server.close();
console.log(`${stories.length} stories compared across ${playgrounds.join(', ')}.`);
if (failures.length) {
  console.error(`${failures.length} mismatches (diffs in ${outDir}/):\n${failures.join('\n')}`);
  process.exit(1);
}