import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './toggle-group/AsChildHarness.svelte';
import ContextHarness from './toggle-group/ContextHarness.svelte';
import ControlledHarness from './toggle-group/ControlledHarness.svelte';
import DeselectableHarness from './toggle-group/DeselectableHarness.svelte';
import DisabledHarness from './toggle-group/DisabledHarness.svelte';
import KeyboardHarness from './toggle-group/KeyboardHarness.svelte';
import MultipleHarness from './toggle-group/MultipleHarness.svelte';
import ProviderHarness from './toggle-group/ProviderHarness.svelte';
import ProviderStyleHarness from './toggle-group/ProviderStyleHarness.svelte';
import ReactiveHarness from './toggle-group/ReactiveHarness.svelte';

test('supports controlled bind:value and fires the change callback once', async () => {
  const changes: string[][] = [];
  const { component } = render(ControlledHarness, { props: { changes } });

  await page.getByRole('radio', { name: 'Center' }).click();

  await expect.element(page.getByText('Selected: center')).toBeAttached();
  expect(component.getValue()).toEqual(['center']);
  expect(changes).toEqual([['center']]);
});

test('keeps visual hooks owned, inherits visual props, and preserves reactive attrs', async () => {
  const { component } = render(ReactiveHarness);
  const root = screen.getByRole('radiogroup');
  const left = screen.getByRole('radio', { name: 'Left' });
  const center = screen.getByRole('radio', { name: 'Center' });

  expect(root.dataset).toMatchObject({ slot: 'toggle-group-root', variant: 'outline', size: 'sm' });
  expect(root.classList.contains('consumer-root')).toBe(true);
  expect(left?.classList.contains('consumer-item')).toBe(true);
  expect(left.dataset).toMatchObject({
    slot: 'toggle-group-item',
    variant: 'ghost',
    size: 'icon-md',
  });
  expect(center.dataset).toMatchObject({ variant: 'outline', size: 'sm' });

  component.update();

  await expect.poll(() => root.dataset.size).toBe('lg');
  expect(root.dataset).toMatchObject({ variant: 'ghost', size: 'lg' });
  expect(root.classList.contains('updated-root')).toBe(true);
  expect(center.dataset).toMatchObject({ variant: 'ghost', size: 'lg' });
});

test('supports disabled state', async () => {
  render(DisabledHarness);

  await expect.element(page.getByRole('radio', { name: 'Left' })).toBeDisabled();
});

test('supports semantic asChild hosts with refs', async () => {
  const { component } = render(AsChildHarness);
  const root = screen.getByRole('radiogroup', { name: 'Custom alignment' });
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('toggle-group-root');
  expect(component.getRefs().rootRef).toBe(root);
  expect(item.tagName).toBe('BUTTON');
  expect(item.getAttribute('data-slot')).toBe('toggle-group-item');
  expect(component.getRefs().itemRef).toBe(item);
});

test('keeps RootProvider and useToggleGroupContext composition connected', async () => {
  render(ProviderHarness);
  const left = screen.getByRole('radio', { name: 'Selected left' });

  expect(left.hasAttribute('data-selected')).toBe(true);
  await page.getByRole('radio', { name: 'Center' }).click();
  await expect.element(page.getByRole('radio', { name: 'left' })).toBeAttached();
  expect(screen.getByRole('radiogroup').getAttribute('data-slot')).toBe(
    'toggle-group-root-provider',
  );
});

test('exposes the public ToggleGroupContext render snippet', async () => {
  render(ContextHarness);

  await expect.element(page.getByTestId('context-value')).toContainText('left');
  await page.getByRole('radio', { name: 'Center' }).click();
  await expect.element(page.getByTestId('context-value')).toContainText('center');
});

test('supports native keyboard activation', async () => {
  render(KeyboardHarness, { props: { defaultValue: [] } });

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const left = page.getByRole('radio', { name: 'Left' });

  await expect.element(left).toBeFocused();
  await left.press('Space');
  await expect.element(left).toHaveAttribute('data-state', 'on');
});

test('preserves omitted focus defaults and explicit keyboard options', async () => {
  const { component } = render(KeyboardHarness);

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const left = page.getByRole('radio', { name: 'Left' });

  await expect.element(left).toBeFocused();
  await expect.element(left).toHaveAttribute('tabindex', '0');
  const right = page.getByRole('radio', { name: 'Right' });

  await expect.element(right).toHaveAttribute('tabindex', '-1');
  await right.click();
  await right.press('ArrowRight');
  await expect.element(left).toBeFocused();
  component.setFocus({ loopFocus: false, orientation: 'horizontal' });
  await right.click();
  await right.press('ArrowRight');
  await expect.element(right).toBeFocused();
  component.setFocus({ loopFocus: false, orientation: 'vertical' });
  await right.press('Home');
  await expect.element(left).toBeFocused();
  await left.press('ArrowDown');
  await expect.element(right).toBeFocused();
  await right.press('End');
  await expect.element(right).toBeFocused();
});

test('preserves multiple selection and a non-deselectable single group', async () => {
  const changes: string[][] = [];
  const { unmount } = render(MultipleHarness, { props: { changes } });
  await expect.element(page.getByRole('group', { name: 'Formatting' })).toBeAttached();

  await expect
    .element(page.getByRole('button', { name: 'Bold' }))
    .toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Italic' }).click();
  await expect
    .element(page.getByRole('button', { name: 'Bold' }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Italic' }))
    .toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Bold' }).click();
  expect(changes).toEqual([['bold', 'italic'], ['italic']]);
  unmount();
  render(DeselectableHarness);

  await page.getByRole('radio', { name: 'Left' }).click();
  await expect
    .element(page.getByRole('radio', { name: 'Left' }))
    .toHaveAttribute('aria-checked', 'true');
});

test('keeps provider host refs, styles, and reactive visual inheritance', async () => {
  const { component } = render(ProviderStyleHarness);
  const root = screen.getByRole('radiogroup', { name: 'Provider' });
  const left = screen.getByRole('radio', { name: 'Left' });

  expect(root.tagName).toBe('SECTION');
  expect(component.getRefs().rootRef).toBe(root);
  expect(left.dataset).toMatchObject({ variant: 'outline', size: 'sm' });

  component.update();

  await expect.poll(() => root.getAttribute('data-variant')).toBe('ghost');
  expect(left.dataset).toMatchObject({ variant: 'ghost', size: 'lg' });
});