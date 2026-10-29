import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/index';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

test('sizes the root with a class, centers the indicator, and never submits a form', async () => {
  const style = document.createElement('style');
  style.textContent = '.sized-root { height: 200px; }';
  document.head.append(style);
  let submits = 0;
  const { container } = render(
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submits += 1;
      }}
    >
      <Splitter panels={panels} defaultSize={[40, 60]} className="sized-root">
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
  style.remove();
});