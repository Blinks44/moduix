import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import AsChildAngleSlider from './angle-slider/AsChildAngleSlider.svelte';
import BoundAngleSlider from './angle-slider/BoundAngleSlider.svelte';
import FocusAngleSlider from './angle-slider/FocusAngleSlider.svelte';
import FormAngleSlider from './angle-slider/FormAngleSlider.svelte';
import KeyboardAngleSlider from './angle-slider/KeyboardAngleSlider.svelte';
import RootLabelAngleSlider from './angle-slider/RootLabelAngleSlider.svelte';

test('submits explicit root/provider inputs and keeps provider state connected', async () => {
  const { container } = render(FormAngleSlider);

  const inputs = container.querySelectorAll<HTMLInputElement>('input[type="hidden"]');
  expect(inputs).toHaveLength(2);
  for (const input of inputs) expect(input.getAttribute('form')).toBe('angle-form');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
  const thumb = page.getByRole('slider', { name: 'Provider rotation' });
  await expect
    .element(page.locator('[data-slot="angle-slider-root-provider"]').filter({ has: thumb }))
    .toHaveCount(1);
  await page.getByRole('button', { name: 'Set to 90 degrees' }).click();
  await expect.element(thumb).toHaveAttribute('aria-valuenow', '90');
  await expect.element(page.locator('input[name="provider-rotation"]')).toHaveValue('90');
});

test('preserves asChild hosts, refs, duplicate marks, and explicit input placement', () => {
  const { component, container } = render(AsChildAngleSlider);
  const { rootRef, controlRef, thumbRef } = component.getRefs();

  const root = container.querySelector('section')!;
  const thumb = container.querySelector('[role="slider"]')!;
  expect(root.getAttribute('data-slot')).toBe('angle-slider-root');
  expect(rootRef).toBe(root);
  expect(controlRef).toBe(container.querySelector('[data-slot="angle-slider-control"]'));
  expect(thumbRef).toBe(thumb);
  expect(root.querySelector('input[type="hidden"]')).not.toBeNull();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
});

test('preserves callback details, keyboard behavior, and read-only/disabled focusability', async () => {
  const changes: Array<{ value: number; valueAsDegree: string }> = [];
  render(KeyboardAngleSlider, { props: { changes } });

  const slider = page.getByRole('slider', { name: 'Rotation', exact: true });
  const readOnlySlider = page.getByRole('slider', { name: 'Read-only rotation' });
  const disabledSlider = page.getByRole('slider', { name: 'Disabled rotation' });
  await slider.focus();
  await slider.press('ArrowRight');
  await readOnlySlider.focus();
  await readOnlySlider.press('ArrowRight');
  await disabledSlider.press('ArrowRight');
  await expect
    .poll(() => changes)
    .toEqual([expect.objectContaining({ value: 1, valueAsDegree: '1deg' })]);
  await expect.element(readOnlySlider).toHaveAttribute('tabindex', '0');
  await expect.element(readOnlySlider).toHaveAttribute('data-readonly');
  await expect.element(readOnlySlider).toBeFocused();
  await expect.element(disabledSlider).not.toHaveAttribute('tabindex');
});

test('supports bind:value and notifies the callback once', async () => {
  const details: number[] = [];
  render(BoundAngleSlider, { props: { details } });

  const slider = page.getByRole('slider', { name: 'Rotation' });
  await slider.focus();
  await slider.press('ArrowRight');
  await expect.element(page.getByText('Angle: 46')).toBeVisible();
  await expect.poll(() => details).toEqual([46]);
});

test('focuses synchronously unless pointerdown is prevented, disabled, or read-only', async () => {
  const states = ['default', 'prevented', 'disabled', 'read-only'];
  const { container } = render(FocusAngleSlider);

  await expect
    .element(page.locator('[data-slot="angle-slider-control"]'))
    .toHaveCount(states.length);
  // Native dispatch keeps the focus assertion in the pointerdown call stack.
  for (const [index, control] of [
    ...container.querySelectorAll('[data-slot="angle-slider-control"]'),
  ].entries()) {
    control.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 }),
    );
    expect(document.activeElement === control.querySelector('[role="slider"]')).toBe(
      states[index] === 'default',
    );
  }
});

test('forwards the root aria-label to the thumb', async () => {
  render(RootLabelAngleSlider);

  await expect.element(page.getByRole('slider', { name: 'Rotation' })).toHaveCount(1);
});