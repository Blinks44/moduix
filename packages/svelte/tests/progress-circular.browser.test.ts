import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AnatomyHarness from './progress-circular/AnatomyHarness.svelte';
import BindHarness from './progress-circular/BindHarness.svelte';
import ContextHarness from './progress-circular/ContextHarness.svelte';
import IndeterminateHarness from './progress-circular/IndeterminateHarness.svelte';
import ProviderHarness from './progress-circular/ProviderHarness.svelte';
import RootAsChildHarness from './progress-circular/RootAsChildHarness.svelte';
import ValueAsChildHarness from './progress-circular/ValueAsChildHarness.svelte';
import ValueTextHarness from './progress-circular/ValueTextHarness.svelte';

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
  expect(host.getAttribute('data-slot')).toBe('progress-circular-value-text');
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
  expect(host.getAttribute('data-slot')).toBe('progress-circular-value-text');
  expect(host.classList.contains('consumer-value')).toBe(true);
  await expect.element(value).toHaveAttribute('title', 'Upload progress');

  component.setText('Complete');

  await expect.element(value).toContainText('Complete');
  expect(screen.getByTestId('value')).toBe(host);
  expect(component.getRefs().valueRef).toBe(host);
});

test('renders the circular Ark anatomy with stable hooks and an accessible name', async () => {
  const { component } = render(AnatomyHarness);

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;

  expect(root.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-circular-root',
    state: 'loading',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-circular-circle');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(refs.circleRef).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="circle-track"]')?.getAttribute('data-slot')).toBe(
    'progress-circular-circle-track',
  );
  expect(progressbar.querySelector('[data-part="circle-range"]')?.getAttribute('data-slot')).toBe(
    'progress-circular-circle-range',
  );
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});

test('preserves semantic root composition with asChild', () => {
  const { component } = render(RootAsChildHarness);

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(component.getRefs().rootRef).toBe(root);
  expect(root.dataset).toMatchObject({ slot: 'progress-circular-root', scope: 'progress' });
});

test('renders an indeterminate circular progressbar without an ARIA value', async () => {
  render(IndeterminateHarness);

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
  const arc = screen
    .getByRole('progressbar', { name: 'Preparing report' })
    .querySelector<SVGCircleElement>('[data-part="circle-range"]')!;
  const arcStyle = getComputedStyle(arc);
  // The indeterminate range is a spinning arc, not a dot.
  expect(arcStyle.animationName).toBe('moduix-progress-circular-indeterminate');
  expect(Number.parseFloat(arcStyle.strokeDasharray) / arc.getTotalLength()).toBeGreaterThan(0.2);
});

test('supports context updates from the public hook', async () => {
  render(ContextHarness);

  await page.getByRole('button', { name: 'Set progress' }).click();

  await expect.element(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
});

test('supports bind:value updates from the Svelte parent', async () => {
  render(BindHarness);

  await page.getByRole('button', { name: 'Set progress' }).click();

  await expect.element(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
});

test('keeps flat provider, context, and hook exports', async () => {
  render(ProviderHarness);

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-circular-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getAllByText('58')).toHaveLength(2);
});