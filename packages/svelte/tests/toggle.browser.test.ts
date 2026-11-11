import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as toggleEntry from '@/components/toggle';
import * as toggleSource from '@/components/toggle/Toggle.svelte';
import AnatomyHarness from './toggle/AnatomyHarness.svelte';
import ContextHarness from './toggle/ContextHarness.svelte';
import ControlledHarness from './toggle/ControlledHarness.svelte';
import IndicatorAsChildHarness from './toggle/IndicatorAsChildHarness.svelte';
import KeyboardHarness from './toggle/KeyboardHarness.svelte';
import ReactiveHarness from './toggle/ReactiveHarness.svelte';

test('preserves the Ark button contract, Svelte refs, fallback snippet, and styled icon snippets', async () => {
  const { component } = render(AnatomyHarness);

  const toggle = screen.getByTestId('toggle');
  const indicator = document.querySelector<HTMLElement>('[data-slot="toggle-indicator"]')!;
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(toggle);
  expect(refs.indicatorRef).toBe(indicator);
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('type', 'button');
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('aria-pressed', 'true');
  expect(toggle.dataset).toMatchObject({ scope: 'toggle', part: 'root' });
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('data-state', 'on');
  expect(toggle.dataset).toMatchObject({ slot: 'toggle-root', variant: 'default', size: 'md' });
  expect(indicator.dataset).toMatchObject({ part: 'indicator', slot: 'toggle-indicator' });
  await expect.element(page.getByLabel('On icon')).toBeVisible();
  expect(screen.queryByLabelText('Off icon')).toBeNull();
  await expect.element(page.getByTestId('context-state')).toContainText('On');
});

test('keeps controlled state, context, disabled, and asChild behavior Ark-shaped', async () => {
  const changes: boolean[] = [];
  const { component } = render(ControlledHarness, { props: { changes } });

  await expect
    .element(page.getByRole('button', { name: 'Disabled', exact: true }))
    .toHaveAttribute('aria-pressed', 'false');

  await page.getByRole('button', { name: 'Disabled', exact: true }).click();

  await expect
    .element(page.getByRole('button', { name: 'Enabled' }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect.element(page.getByText('Enabled')).toBeVisible();
  expect(changes).toEqual([true]);
  expect(component.getPressed()).toBe(true);

  const disabledToggle = screen.getByRole('button', { name: 'Disabled toggle' });
  const customToggle = screen.getByRole('button', { name: 'Custom toggle' });
  const disabledToggleLocator = page.getByRole('button', { name: 'Disabled toggle' });
  await expect.element(disabledToggleLocator).toBeDisabled();
  await expect.element(disabledToggleLocator).toHaveAttribute('data-disabled');
  disabledToggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await expect.element(disabledToggleLocator).toHaveAttribute('aria-pressed', 'false');
  expect(customToggle.tagName).toBe('BUTTON');
  await expect
    .element(page.getByRole('button', { name: 'Custom toggle' }))
    .toHaveAttribute('aria-pressed', 'true');
  expect(customToggle.getAttribute('data-slot')).toBe('toggle-root');
  expect(component.getRefs().rootRef).toBe(customToggle);
});

test('preserves ToggleIndicator asChild composition', async () => {
  render(IndicatorAsChildHarness);

  const indicator = screen.getByTestId('indicator-host');

  expect(indicator.tagName).toBe('SPAN');
  expect(indicator.dataset).toMatchObject({ part: 'indicator', slot: 'toggle-indicator' });
  await expect.element(page.getByTestId('indicator-host')).toContainText('On');
});

test('supports native button keyboard activation', async () => {
  render(KeyboardHarness);

  await page.getByRole('button', { name: 'Before' }).press('Tab');

  const toggle = page.getByRole('button', { name: 'Notifications' });
  await expect.element(toggle).toBeFocused();
  await toggle.press('Space');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.press('Enter');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
});

test('reactively preserves attributes, visual props, fallback snippets and single native listeners', async () => {
  const clicks = rs.fn();
  const changes = rs.fn();
  const submit = rs.fn();
  const { component } = render(ReactiveHarness, { props: { clicks, changes, submit } });

  const toggle = screen.getByRole('button', { name: 'Favorite' });
  const indicator = toggle.querySelector('[data-slot="toggle-indicator"]')!;
  await expect.element(page.getByText('Off')).toBeVisible();
  expect(indicator.classList.contains('consumer-indicator')).toBe(true);
  expect(toggle.classList.contains('consumer-toggle')).toBe(true);
  expect(toggle.classList.contains('conditional-class')).toBe(true);
  expect(toggle.dataset).toMatchObject({ slot: 'toggle-root', size: 'md' });

  await page.getByRole('button', { name: 'Favorite' }).click();

  expect(component.getPressed()).toBe(true);
  expect(clicks).toHaveBeenCalledTimes(1);
  expect(changes).toHaveBeenCalledExactlyOnceWith(true);
  expect(submit).not.toHaveBeenCalled();
  await expect.element(page.getByText('On')).toBeVisible();
  expect(screen.queryByText('Off')).toBeNull();

  component.update();

  await expect.poll(() => toggle.dataset.size).toBe('icon-lg');
  expect(toggle.dataset.variant).toBe('ghost');
  expect(toggle.classList.contains('updated-toggle')).toBe(true);
  expect(screen.getByRole('button', { name: 'Saved' })).toBe(toggle);
  await expect.element(page.getByRole('button', { name: 'Saved' })).toBeDisabled();
  toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  expect(changes).toHaveBeenCalledTimes(1);

  component.setPressed(false);

  await expect.element(page.getByText('Off')).toBeVisible();
  expect(toggle.querySelector('[data-slot="toggle-indicator"]')).toBe(indicator);
});

// Svelte 5 lets a child override an unbound prop locally, so a parent value is not strictly
// authoritative as in Vue. The callback still fires once and later parent updates win.
test('forwards a context setPressed request to the callback and follows parent updates', async () => {
  const changes = rs.fn();
  const { component } = render(ContextHarness, { props: { changes } });

  await page.getByText('Enable').click();

  expect(changes).toHaveBeenCalledExactlyOnceWith(true);
  await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'true');

  component.setPressed(true);
  component.setPressed(false);

  await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
});

test('keeps toggleVariants out of package and registry source entry points', () => {
  expect('toggleVariants' in toggleEntry).toBe(false);
  expect('toggleVariants' in toggleSource).toBe(false);
});