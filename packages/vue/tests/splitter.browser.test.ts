import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
} from '@/index';
import TestSplitter from './fixtures/TestSplitter.vue';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

const splitterComponents = {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
};

test('resizes with the keyboard and preserves trigger defaults', async () => {
  const { container } = render(TestSplitter);

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  await expect
    .element(page.locator('[data-slot="splitter-resize-trigger-indicator"]'))
    .toBeVisible();
  expect(trigger.getAttribute('aria-valuemin')).toBe('20');
  expect(trigger.getAttribute('aria-valuemax')).toBe('80');
  expect(trigger.getAttribute('tabindex')).toBe('0');

  const resize = page.getByRole('separator', { name: 'Resize panels' });
  await expect.element(resize).toHaveAttribute('aria-valuenow', '40');
  await page.getByRole('button', { name: 'A', exact: true }).press('Tab');
  await expect.element(resize).toBeFocused();
  await expect.element(resize).toHaveAttribute('data-focus');
  const panel = container.querySelector('[data-slot="splitter-panel"]')!;
  await expect.poll(() => panel.getBoundingClientRect().width).toBeGreaterThan(0);
  const initialWidth = panel.getBoundingClientRect().width;
  await resize.press('ArrowRight');
  await expect.element(resize).toHaveAttribute('aria-valuenow', '41');
  await expect.poll(() => panel.getBoundingClientRect().width).toBeGreaterThan(initialWidth);
  await expect.element(resize).toBeFocused();
  await expect
    .element(page.locator('[data-slot="splitter-resize-trigger-indicator"]'))
    .toHaveCSS('outline-width', '2px');
  await page.getByRole('button', { name: 'A', exact: true }).click();
  await expect.element(resize).not.toBeFocused();
  await resize.click();
  await expect.element(resize).toHaveAttribute('data-focus');
  await page.getByText('A', { exact: true }).hover();
  await expect
    .element(page.locator('[data-slot="splitter-resize-trigger-indicator"]'))
    .toHaveCSS('outline-style', 'none');
});

test('keeps custom trigger content and disabled behavior intact', async () => {
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels };
    },
    template: `
      <Splitter :panels="panels" :default-size="[40, 60]">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
          <span>Grip</span>
        </SplitterResizeTrigger>
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  await expect.element(page.getByText('Grip')).toBeVisible();
  expect(container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')).toBeNull();
  expect(trigger.hasAttribute('data-disabled')).toBe(true);
  expect(trigger.hasAttribute('tabindex')).toBe(false);
  const resize = page.getByRole('separator', { name: 'Disabled resize' });
  await resize.press('ArrowRight');
  await expect.element(resize).toHaveAttribute('aria-valuenow', '40');
});

test('keeps an asChild resize trigger as the interactive host', async () => {
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels };
    },
    template: `
      <Splitter :panels="panels" :default-size="[40, 60]">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger as-child id="a:b" aria-label="Resize panels">
          <button type="button">Resize panels</button>
        </SplitterResizeTrigger>
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  expect(trigger.tagName).toBe('BUTTON');
  expect(trigger.getAttribute('data-slot')).toBe('splitter-resize-trigger');
  expect(container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')).toBeNull();
  const resize = page.getByRole('separator', { name: 'Resize panels' });
  await resize.click();
  await expect.element(resize).toHaveAttribute('data-focus');
  await resize.press('ArrowRight');
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveAttribute('aria-valuenow', '41');
});

test('hydrates without replacing server hosts or ids and still resizes', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestSplitter));
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-scope="splitter"]')];
  const ids = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSplitter);
  try {
    app.mount(host);
    const trigger = page.getByRole('separator', { name: 'Resize panels' });
    await expect.element(trigger).toHaveAttribute('aria-valuenow', '40');
    const hydrated = [...host.querySelectorAll('[data-scope="splitter"]')];
    expect(hydrated).toHaveLength(parts.length);
    hydrated.forEach((element, index) => expect(element).toBe(parts[index]));
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(ids);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    await trigger.click();
    await expect.element(trigger).toHaveAttribute('data-focus');
    await trigger.press('ArrowRight');
    await expect.element(trigger).toHaveAttribute('aria-valuenow', '41');
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});