import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
} from '../src';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

test('resizes with the keyboard and preserves trigger defaults', async () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">
        <button type="button">A</button>
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

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
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
        <span>Grip</span>
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  await expect.element(page.getByText('Grip')).toBeVisible();
  expect(container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')).toBeNull();
  expect(trigger.hasAttribute('data-disabled')).toBe(true);
  expect(trigger.hasAttribute('tabindex')).toBe(false);
  const resize = page.getByRole('separator', { name: 'Disabled resize' });
  await resize.press('ArrowRight');
  await expect.element(resize).toHaveAttribute('aria-valuenow', '40');
});

test('forwards refs to every styled part', () => {
  const rootRef = createRef<HTMLDivElement>();
  const panelRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const indicatorRef = createRef<HTMLDivElement>();

  const { container } = render(
    <Splitter ref={rootRef} panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel ref={panelRef} id="a">
        A
      </SplitterPanel>
      <SplitterResizeTrigger ref={triggerRef} id="a:b" aria-label="Resize panels">
        <SplitterResizeTriggerIndicator ref={indicatorRef} />
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  expect(container.querySelectorAll('[data-slot^="splitter-"]')).toHaveLength(5);
  expect(rootRef.current).toBe(container.querySelector('[data-slot="splitter-root"]'));
  expect(panelRef.current).toBe(container.querySelector('[data-slot="splitter-panel"]'));
  expect(triggerRef.current).toBe(container.querySelector('[data-slot="splitter-resize-trigger"]'));
  expect(indicatorRef.current).toBe(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  );
});

test('keeps an asChild resize trigger as the interactive host', async () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger asChild id="a:b" aria-label="Resize panels">
        <button type="button">Resize panels</button>
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

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