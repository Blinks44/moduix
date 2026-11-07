import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ActionsTimer from './timer/ActionsTimer.svelte';
import AsChildTimer from './timer/AsChildTimer.svelte';
import ProviderTimer from './timer/ProviderTimer.svelte';
import SegmentsTimer from './timer/SegmentsTimer.svelte';
import SeparatorTimer from './timer/SeparatorTimer.svelte';

test('renders the short root form with default segments, stable hooks, and Svelte refs', async () => {
  const { component, container } = render(SegmentsTimer, {
    props: { 'data-testid': 'timer', targetMs: 60000 },
  });

  const root = screen.getByTestId('timer');
  const area = screen.getByRole('timer');

  expect(component.getRefs().rootRef).toBe(root);
  expect(component.getRefs().segmentsRef).toBe(area);
  await expect.element(page.getByTestId('timer')).toHaveAttribute('data-slot', 'timer-root');
  await expect.element(page.getByRole('timer')).toHaveAttribute('data-slot', 'timer-area');
  await expect.element(page.getByRole('timer')).toHaveAttribute('aria-atomic', 'true');
  // The digits must not overlap when the area wraps onto several lines.
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(3);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(2);
  await expect.element(page.locator('[data-type="hours"]')).toBeAttached();
  await expect.element(page.locator('[data-type="minutes"]')).toBeAttached();
  await expect.element(page.locator('[data-type="seconds"]')).toBeAttached();
});

test('forwards area props and refs through custom segments', async () => {
  const { component, container } = render(SegmentsTimer, {
    props: {
      targetMs: 60000,
      segments: {
        'aria-label': 'Remaining time',
        'data-testid': 'custom-segments',
        separator: '·',
        types: ['minutes', 'seconds'],
      },
    },
  });
  const area = screen.getByTestId('custom-segments');

  expect(component.getRefs().segmentsRef).toBe(area);
  await expect
    .element(page.getByTestId('custom-segments'))
    .toHaveAttribute('aria-label', 'Remaining time');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  await expect.element(page.locator('[data-type="hours"]')).toHaveCount(0);
  await expect.element(page.getByTestId('custom-segments')).toContainText('·');
});

test('preserves initial time, custom ids, translations, and Ark runtime values', async () => {
  const { container } = render(SegmentsTimer, {
    props: {
      countdown: true,
      startMs: 3723456,
      ids: { root: 'countdown-root', area: 'countdown-area' },
      translations: { areaLabel: () => 'Time remaining' },
      segments: { types: ['hours', 'minutes', 'seconds', 'milliseconds'] },
    },
  });
  await expect
    .element(page.locator('[data-slot="timer-root"]'))
    .toHaveAttribute('id', 'countdown-root');
  await expect.element(page.getByRole('timer')).toHaveAttribute('id', 'countdown-area');
  await expect.element(page.getByRole('timer')).toHaveAttribute('aria-label', 'Time remaining');
  for (const [type, text, value] of [
    ['hours', '01', '1'],
    ['minutes', '02', '2'],
    ['seconds', '03', '3'],
    ['milliseconds', '456', '456'],
  ]) {
    const item = container.querySelector(`[data-type="${type}"]`);
    await expect.element(page.locator(`[data-type="${type}"]`)).toContainText(text);
    expect(item?.getAttribute('style')).toContain(`--value: ${value}`);
  }
});

test('renders a reactive snippet separator and preserves area attrs', async () => {
  const { component } = render(SeparatorTimer);
  expect([...screen.getByRole('timer')!.classList]).toEqual(
    expect.arrayContaining(['custom-area']),
  );
  await expect.element(page.getByTestId('separator-content')).toContainText('·');
  component.toggle();
  await expect.poll(() => screen.getByTestId('separator-content').tagName).toBe('STRONG');
  await expect.element(page.getByTestId('separator-content')).toContainText('/');
});

test('preserves Ark action visibility and native button semantics', async () => {
  render(ActionsTimer);

  const startLocator = page.getByText('Start', { exact: true });
  await expect.element(startLocator).toHaveAttribute('type', 'button');
  await expect.element(page.getByText('Pause')).toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset')).toHaveAttribute('hidden');
  await expect.element(page.getByText('Pause')).not.toBeVisible();
  await expect.element(page.getByText('Reset')).not.toBeVisible();

  await startLocator.press('Enter');

  await expect.element(startLocator).toHaveAttribute('hidden');
  await expect.element(page.getByText('Pause')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset')).not.toHaveAttribute('hidden');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect.element(page.getByText('Pause', { exact: true })).toHaveAttribute('hidden');
  await expect.element(startLocator).toHaveAttribute('hidden');
  await page.getByRole('button', { name: 'Reset', exact: true }).press('Enter');
  await expect.element(startLocator).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset', { exact: true })).toHaveAttribute('hidden');
  await expect.element(page.getByRole('timer')).toContainText('00:00:00');
});

test('keeps RootProvider and context hook state connected', async () => {
  render(ProviderTimer);

  await expect.element(page.getByRole('status').nth(0)).toContainText('Idle');
  await expect.element(page.getByTestId('timer-context')).toHaveText('Idle');

  await page.getByRole('button', { name: 'Start provider timer', exact: true }).click();

  await expect.element(page.getByRole('status').nth(0)).toContainText('Running');
  await expect.element(page.getByTestId('timer-context')).toHaveText('Running');
});

test('preserves semantic replacement hosts and refs with asChild', async () => {
  const { component } = render(AsChildTimer);

  const root = screen.getByTestId('timer-section');
  const area = screen.getByTestId('timer-area-host');
  const action = screen.getByTestId('start-link');

  expect(root.tagName).toBe('SECTION');
  const rootLocator = page.getByTestId('timer-section');
  await expect.element(rootLocator).toHaveAttribute('data-scope', 'timer');
  await expect.element(rootLocator).toHaveAttribute('data-part', 'root');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'timer-root');
  expect(component.getRefs().rootRef).toBe(root);
  expect(area.tagName).toBe('ARTICLE');
  await expect.element(page.getByTestId('timer-area-host')).toHaveAttribute('data-part', 'area');
  await expect
    .element(page.getByTestId('timer-area-host'))
    .toHaveAttribute('data-slot', 'timer-area');
  expect(component.getRefs().areaRef).toBe(area);
  expect(action.tagName).toBe('A');
  await expect
    .element(page.getByTestId('start-link'))
    .toHaveAttribute('data-part', 'action-trigger');
  await expect
    .element(page.getByTestId('start-link'))
    .toHaveAttribute('data-slot', 'timer-action-trigger');
  expect(component.getRefs().actionRef).toBe(action);
});

test('keeps TimerSegments reactive when its types change', async () => {
  const { container, rerender } = render(SegmentsTimer, {
    props: { targetMs: 60000, segments: { types: ['minutes'] } },
  });

  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(1);

  await rerender({ segments: { types: ['minutes', 'seconds'] } });

  await expect.poll(() => container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  await expect
    .poll(() => container.querySelectorAll('[data-slot="timer-separator"]'))
    .toHaveLength(1);
});

test('forwards root lifecycle callbacks through the transparent wrapper', async () => {
  const ticks: unknown[] = [];
  const completed: unknown[] = [];

  const { unmount } = render(SegmentsTimer, {
    props: {
      autoStart: true,
      interval: 1,
      startMs: 0,
      targetMs: 10,
      onTick: (details) => ticks.push(details),
      onComplete: () => completed.push(true),
    },
  });

  await expect.poll(() => ticks.length).toBeGreaterThan(0);
  await expect
    .poll(() => ticks[0])
    .toEqual({
      value: expect.any(Number),
      time: expect.objectContaining({ seconds: expect.any(Number) }),
      formattedTime: expect.objectContaining({ seconds: expect.any(String) }),
    });
  await expect.poll(() => completed).toEqual([true]);
  unmount();
});