import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildColorPicker from './color-picker/AsChildColorPicker.svelte';
import ClassColorPicker from './color-picker/ClassColorPicker.svelte';
import ControlledOpenColorPicker from './color-picker/ControlledOpenColorPicker.svelte';
import ControlledValueColorPicker from './color-picker/ControlledValueColorPicker.svelte';
import FormColorPicker from './color-picker/FormColorPicker.svelte';
import OpenChangeColorPicker from './color-picker/OpenChangeColorPicker.svelte';
import RefsColorPicker from './color-picker/RefsColorPicker.svelte';

test('submits through explicit Ark hidden inputs', async () => {
  const { container } = render(FormColorPicker);
  const inputs = container.querySelectorAll<HTMLInputElement>('input[tabindex="-1"]');

  expect(inputs).toHaveLength(2);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['accent', 'rgba(235, 94, 65, 1)'],
    ['provider-accent', 'rgba(37, 99, 235, 1)'],
  ]);
  const channel = page.getByRole('textbox').nth(0);
  await channel.fill('#16a34a');
  await channel.press('Enter');
  expect(new FormData(container.querySelector('form')!).get('accent')).toBe('rgba(22, 163, 74, 1)');
});

test('keeps an asChild host, ref, and explicit hidden input intact', async () => {
  const { component } = render(AsChildColorPicker);
  const root = screen.getByTestId('color-picker-root');

  expect(component.getRefs().rootRef).toBe(root);
  await expect
    .element(page.getByTestId('color-picker-root'))
    .toHaveAttribute('data-slot', 'color-picker-root');
  expect(root.querySelector('input[name="accent"]')).not.toBeNull();
  expect(new FormData(root.closest('form')!).get('accent')).toBe('rgba(235, 94, 65, 1)');
});

test('preserves Svelte refs through ordinary color picker parts', async () => {
  const { component } = render(RefsColorPicker);

  const { controlRef, rootRef, triggerRef } = component.getRefs();
  expect(rootRef!.getAttribute('data-slot')).toBe('color-picker-root');
  expect(controlRef!.getAttribute('data-slot')).toBe('color-picker-control');
  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Open' }));
});

test('preserves Ark open-change details and default trigger composition', async () => {
  const openStates: boolean[] = [];
  render(OpenChangeColorPicker, {
    props: { onOpenChange: (details: { open: boolean }) => openStates.push(details.open) },
  });

  expect(
    document.querySelector(
      '[data-slot="color-picker-trigger"] [data-slot="color-picker-value-swatch"]',
    ),
  ).not.toBeNull();

  await page.getByRole('button', { name: 'Color', exact: true }).click();
  await expect.poll(() => openStates).toEqual([true]);
  await expect.element(page.getByText('Content')).toBeFocused();
  await page.getByText('Content').press('Escape');
  await expect.poll(() => openStates).toEqual([true, false]);
});

test('supports controlled open state and forwards each open change once', async () => {
  const openChanges: boolean[] = [];
  render(ControlledOpenColorPicker, {
    props: { onOpenChange: (details: { open: boolean }) => openChanges.push(details.open) },
  });
  await expect.element(page.getByText('Closed')).toBeAttached();

  await page.getByRole('button', { name: 'Open color picker', exact: true }).click();
  await expect.element(page.getByText('Open')).toBeAttached();
  expect(openChanges).toEqual([true]);
});

test('keeps controlled value changes Ark-shaped through the context api', async () => {
  const onValueChange = rs.fn((details: { value: { toString: () => string } }) => details);
  render(ControlledValueColorPicker, { props: { onValueChange } });
  await expect.element(page.getByText('rgba(22, 163, 74, 1)')).toBeAttached();

  await page.getByRole('button', { name: 'Change color', exact: true }).click();

  await expect.element(page.getByText('rgba(147, 51, 234, 1)')).toBeAttached();
  await expect
    .poll(() => onValueChange.mock.calls.map(([details]) => details.value.toString()))
    .toEqual(['rgba(147, 51, 234, 1)']);
});

test('applies consumer classes alongside component defaults', async () => {
  const { container } = render(ClassColorPicker);
  const root = container.querySelector('[data-slot="color-picker-root"]');
  const control = container.querySelector('[data-slot="color-picker-control"]');
  const trigger = container.querySelector('[data-slot="color-picker-trigger"]');

  expect(root?.className.endsWith('consumer-root')).toBe(true);
  expect(control?.className.endsWith('consumer-control')).toBe(true);
  expect(trigger?.className.endsWith('consumer-trigger')).toBe(true);
});

test('forwards refs through ordinary Ark Svelte part paths', async () => {
  const { component } = render(RefsColorPicker);

  const { controlRef, rootRef, triggerRef } = component.getRefs();
  expect(rootRef!.getAttribute('data-slot')).toBe('color-picker-root');
  expect(controlRef!.getAttribute('data-slot')).toBe('color-picker-control');
  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Open' }));
});