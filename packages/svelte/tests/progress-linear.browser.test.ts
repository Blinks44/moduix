import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AnatomyHarness from './progress-linear/AnatomyHarness.svelte';
import BindHarness from './progress-linear/BindHarness.svelte';
import BoundsHarness from './progress-linear/BoundsHarness.svelte';
import IndeterminateHarness from './progress-linear/IndeterminateHarness.svelte';
import PartsAsChildHarness from './progress-linear/PartsAsChildHarness.svelte';
import ProviderHarness from './progress-linear/ProviderHarness.svelte';
import RootAsChildHarness from './progress-linear/RootAsChildHarness.svelte';
import SweepHarness from './progress-linear/SweepHarness.svelte';
import ValueAsChildHarness from './progress-linear/ValueAsChildHarness.svelte';
import ValueTextHarness from './progress-linear/ValueTextHarness.svelte';

function sweepEdges(name: string) {
  const track = screen.getByRole('progressbar', { name });
  const range = track.querySelector<HTMLElement>('[data-part="range"]')!;
  const [animation] = range.getAnimations();
  const duration = Number(animation!.effect!.getComputedTiming().duration);
  animation!.pause();
  const frames = [0, duration - 1].map((time) => {
    animation!.currentTime = time;
    return range.getBoundingClientRect();
  });
  return { track: track.getBoundingClientRect(), start: frames[0]!, end: frames[1]! };
}

test('updates fallback and consumer value text without losing attributes or refs', async () => {
  const clicks: MouseEvent[] = [];
  const { component } = render(ValueTextHarness, {
    props: { onclick: (event: MouseEvent) => clicks.push(event) },
  });

  const valueLocator = page.getByTestId('value');
  await expect.element(valueLocator).toContainText('42%');

  component.setValue(75);
  await expect.element(valueLocator).toContainText('75%');

  component.setCustom(true);
  await expect.element(valueLocator).toContainText('Uploaded');

  component.setText('');
  await expect.poll(() => screen.getByTestId('value').textContent).toBe('');

  component.setCustom(false);
  await expect.element(valueLocator).toContainText('75%');
  await valueLocator.click();

  component.setValue(null);
  await expect.poll(() => screen.getByTestId('value').textContent).toBe('');
  const host = screen.getByTestId('value');
  expect(component.getRefs().valueRef).toBe(host);
  expect(host.getAttribute('data-slot')).toBe('progress-linear-value-text');
  await expect.element(valueLocator).toHaveAttribute('aria-live', 'polite');
  await expect.element(valueLocator).toHaveAttribute('title', 'Upload progress');
  expect(host.classList.contains('consumer-value')).toBe(true);
  expect(clicks).toHaveLength(1);
});

test('preserves the consumer value text host and ref with asChild', async () => {
  const { component } = render(ValueAsChildHarness);

  const host = screen.getByTestId('value');

  expect(host.tagName).toBe('OUTPUT');
  expect(component.getRefs().valueRef).toBe(host);
  const value = page.getByTestId('value');
  expect(host.getAttribute('data-slot')).toBe('progress-linear-value-text');
  expect(host.classList.contains('consumer-value')).toBe(true);
  await expect.element(value).toHaveAttribute('title', 'Upload progress');

  component.setText('Complete');

  await expect.element(value).toContainText('Complete');
  expect(screen.getByTestId('value')).toBe(host);
  expect(component.getRefs().valueRef).toBe(host);
});

test('preserves semantic root composition with asChild', () => {
  const { component } = render(RootAsChildHarness);

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(component.getRefs().rootRef).toBe(root);
  expect(root.dataset).toMatchObject({ slot: 'progress-linear-root', scope: 'progress' });
});

test('preserves asChild composition on the track and range parts', () => {
  render(PartsAsChildHarness);

  const progressbar = screen.getByRole('progressbar', { name: 'Export status' });
  const range = progressbar.querySelector('[data-part="range"]');

  expect(progressbar.tagName).toBe('OUTPUT');
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  expect(range?.tagName).toBe('SPAN');
  expect(range?.getAttribute('data-slot')).toBe('progress-linear-range');
});

test('renders an indeterminate linear progressbar without an ARIA value', async () => {
  render(IndeterminateHarness);

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
});

// Pauses the indeterminate animation at its first and last frame and reads the range position.
test('sweeps the indeterminate range from the start edge to the end edge', async () => {
  render(SweepHarness);

  await expect.element(page.getByRole('progressbar', { name: 'Sweep rtl' })).toBeAttached();
  const ltr = sweepEdges('Sweep horizontal');
  expect(ltr.start.right).toBeLessThanOrEqual(ltr.track.left + 1);
  expect(ltr.end.left).toBeGreaterThanOrEqual(ltr.track.right - 1);

  const rtl = sweepEdges('Sweep rtl');
  expect(rtl.start.left).toBeGreaterThanOrEqual(rtl.track.right - 1);
  expect(rtl.end.right).toBeLessThanOrEqual(rtl.track.left + 1);

  const vertical = sweepEdges('Sweep vertical');
  expect(vertical.start.width).toBeCloseTo(vertical.track.width, 0);
  expect(vertical.start.top).toBeGreaterThanOrEqual(vertical.track.bottom - 1);
  expect(vertical.end.bottom).toBeLessThanOrEqual(vertical.track.top + 1);
});

test('preserves custom bounds and accessible value text', async () => {
  render(BoundsHarness);

  const progressbar = page.getByRole('progressbar', { name: 'Request migration' });
  await expect.element(progressbar).toHaveAttribute('aria-valuemin', '200');
  await expect.element(progressbar).toHaveAttribute('aria-valuemax', '800');
  await expect.element(progressbar).toHaveAttribute('aria-valuenow', '420');
  await expect
    .element(page.getByText('420 of 800 requests completed'))
    .toHaveAttribute('aria-live', 'polite');
});

test('supports controlled bind:value and context access', async () => {
  render(BindHarness);

  await page.getByRole('button', { name: 'Set progress' }).click();

  await expect.element(page.getByText('Current value: 75')).toBeAttached();
  await expect
    .element(page.getByRole('progressbar', { name: 'Upload status' }))
    .toHaveAttribute('aria-valuenow', '75');
});

test('connects provider, context, hook, and state views', async () => {
  render(ProviderHarness);

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-linear-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getAllByText('58')).toHaveLength(2);
  await expect.element(page.getByText('Transfer in progress')).toBeAttached();
  await expect.element(page.getByText('Export complete')).toHaveAttribute('hidden');
});

test('renders the linear Ark anatomy with stable hooks and an accessible name', async () => {
  const { component } = render(AnatomyHarness);

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(root.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-linear-root',
    state: 'loading',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(refs.trackRef).toBe(progressbar);
  expect(range.getAttribute('data-slot')).toBe('progress-linear-range');
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});