import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/index';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

test('sizes the root with a class, centers the indicator, and never submits a form', async () => {
  let submits = 0;
  const { container } = render(
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submits += 1;
      }}
    >
      <Splitter panels={panels} defaultSize={[40, 60]} className="h-50">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    </form>,
  );

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;
  const indicator = container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')!;
  const triggerBox = trigger.getBoundingClientRect();
  const indicatorBox = indicator.getBoundingClientRect();

  expect(
    Math.abs(triggerBox.left + triggerBox.width / 2 - (indicatorBox.left + indicatorBox.width / 2)),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(triggerBox.top + triggerBox.height / 2 - (indicatorBox.top + indicatorBox.height / 2)),
  ).toBeLessThanOrEqual(1);
  expect(trigger.getAttribute('type')).toBe('button');
  await page.getByRole('separator', { name: 'Resize panels' }).click();
  expect(submits).toBe(0);
});

test('lets consumer utilities replace fixed defaults', async () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]} className="h-64 w-96 border-2 bg-muted">
      <SplitterPanel id="a" className="min-h-0 p-6">
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" className="w-2 min-w-2" />
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  const root = container.querySelector('[data-slot="splitter-root"]')!;
  const panel = container.querySelector('[data-slot="splitter-panel"]')!;
  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  expect([...root.classList]).toEqual(
    expect.arrayContaining(['h-64', 'w-96', 'border-2', 'bg-muted']),
  );
  expect([...panel.classList]).toEqual(expect.arrayContaining(['min-h-0', 'p-6']));
  expect([...trigger.classList]).toEqual(expect.arrayContaining(['w-2', 'min-w-2']));
  await expect.element(page.locator('[data-slot="splitter-root"]')).toHaveCSS('height', '256px');
  await expect.element(page.locator('[data-slot="splitter-root"]')).toHaveCSS('width', '384px');
  await expect
    .element(page.locator('[data-slot="splitter-panel"]').first())
    .toHaveCSS('padding', '24px');
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveCSS('width', '8px');
});