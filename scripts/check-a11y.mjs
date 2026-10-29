// Runs axe-core on every built playground story and fails on accessibility violations.
// Usage: pnpm run check:a11y [component...]   (run build:storybook in the playgrounds first)
import AxeBuilder from '@axe-core/playwright';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

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
const context = await browser.newContext({ reducedMotion: 'reduce' });
const failures = [];
let checked = 0;

await Promise.all(
  playgrounds.map(async (playground) => {
    const index = JSON.parse(
      readFileSync(`playgrounds/${playground}/storybook-static/index.json`, 'utf8'),
    );
    const stories = Object.values(index.entries)
      .filter((entry) => entry.type === 'story')
      .map((entry) => entry.id)
      .filter(
        (id) =>
          !components.length || components.some((name) => id.startsWith(`components-${name}--`)),
      );
    const page = await context.newPage();
    for (const id of stories) {
      await page.goto(
        `${origin}/${playground}/storybook-static/iframe.html?id=${id}&viewMode=story`,
      );
      await page.waitForSelector('#storybook-root > *', { state: 'attached' });
      // Embedded iframes are third-party pages, such as the YouTube player in Aspect Ratio.
      const { violations } = await new AxeBuilder({ page })
        .include('#storybook-root')
        .exclude('iframe')
        .analyze();
      checked++;
      for (const violation of violations) {
        // WCAG 1.4.3 exempts text of inactive components, which axe cannot recognize.
        const nodes = violation.nodes.filter(
          (node) => violation.id !== 'color-contrast' || !node.html.includes('data-disabled'),
        );
        if (!nodes.length) continue;
        const targets = nodes.map((node) => node.target.join(' ')).join(', ');
        failures.push(`${id} [${playground}]: ${violation.id} (${violation.impact}) ${targets}`);
      }
    }
  }),
);

await browser.close();
server.close();
console.log(`${checked} stories checked across ${playgrounds.join(', ')}.`);
if (failures.length) {
  console.error(`${failures.length} violations:\n${failures.sort().join('\n')}`);
  process.exit(1);
}