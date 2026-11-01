// Runs axe-core on every built playground story and fails on accessibility violations.
// Usage: pnpm run check:a11y [component...]   (run build:storybook in the playgrounds first)
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import { playgrounds, servePlaygrounds, storyIds } from './playgrounds.mjs';

const components = process.argv.slice(2);
const server = await servePlaygrounds();

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const failures = [];
let checked = 0;

await Promise.all(
  playgrounds.map(async (playground) => {
    const page = await context.newPage();
    for (const id of storyIds(playground, components)) {
      await page.goto(server.storyUrl(playground, id));
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