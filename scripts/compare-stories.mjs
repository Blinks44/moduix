// Screenshots built playground stories and compares every adapter with React CSS Modules.
// Usage: pnpm run compare:stories [--open] [component...]   (run build:storybook in the playgrounds first)
// --open opens the overlay of each story (hover for tooltips and hover cards, click on the first
// visible button otherwise) and captures the viewport instead of the initial full page.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import pixelmatch from 'pixelmatch';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import { playgrounds, servePlaygrounds, storyIds } from './playgrounds.mjs';

const reference = 'react';
const maxDiffRatio = 0.001;
const skipped = new Set([
  // CSS Modules style these demos through component variables and Tailwind through utilities.
  'components-angleslider--custom-styling',
  'components-marquee--custom-styling',
  'components-pagination--custom-styles',
  'components-tagsinput--custom-styling',
  // Ark Vue renders the key separator without the trailing space that Ark React and Solid keep.
  'utilities-jsontreeview--basic',
  'utilities-jsontreeview--compact-previews',
]);
// Skipped only with --open.
const openSkipped = new Set([
  // CSS Modules restyle the open panel through a class and Tailwind through utilities.
  'components-floatingpanel--custom-styling',
]);
const args = process.argv.slice(2);
const open = args.includes('--open');
const outDir = '.local/story-diffs';
const stories = storyIds(
  reference,
  args.filter((arg) => arg !== '--open'),
).filter((id) => !skipped.has(id) && !(open && openSkipped.has(id)));
const server = await servePlaygrounds();

const viewport = { width: 1024, height: 768 };
const browser = await chromium.launch();
const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });

async function screenshot(page, playground, id) {
  await page.setViewportSize(viewport);
  await page.goto(server.storyUrl(playground, id));
  await page.waitForSelector('#storybook-root > *', { state: 'attached' });
  await page.addStyleTag({
    content:
      // The playground name badge differs by design, so it is hidden.
      'body::before { display: none !important; } *, ::before, ::after { animation: none !important; transition: none !important; caret-color: transparent !important; }',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  if (open) {
    const trigger = page.locator('#storybook-root button:enabled:visible').first();
    if (await trigger.count()) {
      if (/^components-(tooltip|hovercard)--/.test(id)) await trigger.hover();
      else {
        await trigger.click();
        // The pointer must not rest over the layer, where hover-revealed parts differ by timing.
        await page.mouse.move(0, 0);
      }
    }
    // The carousel scrolls smoothly after the click and needs longer to settle.
    await page.waitForTimeout(id.startsWith('components-carousel--') ? 2000 : 500);
    return PNG.sync.read(await page.screenshot());
  }
  // A full-page capture of an overflowing story widens the viewport mid-shot, and vw-based layouts
  // such as Sidebar may or may not reflow in time. Resize first and let observers settle.
  await page.setViewportSize(
    await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    })),
  );
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
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