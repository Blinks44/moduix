import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import AnatomySlider from './slider/AnatomySlider.svelte';
import AsChildSlider from './slider/AsChildSlider.svelte';
import BoundSlider from './slider/BoundSlider.svelte';
import ClassesSlider from './slider/ClassesSlider.svelte';
import DraggingSlider from './slider/DraggingSlider.svelte';
import KeyboardSlider from './slider/KeyboardSlider.svelte';
import LayoutSlider from './slider/LayoutSlider.svelte';
import ProviderSlider from './slider/ProviderSlider.svelte';

function rect(selector: string, root: ParentNode = document) {
  return root.querySelector(selector)!.getBoundingClientRect();
}

function pressThumb(thumb: Element) {
  const box = thumb.getBoundingClientRect();
  thumb.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      button: 0,
      clientX: box.left + box.width / 2,
      clientY: box.top + box.height / 2,
      isPrimary: true,
      pointerId: 1,
    }),
  );
}

test('preserves anatomy, attrs, refs, and explicit/generated form inputs', async () => {
  const { component, container } = render(AnatomySlider);
  const { rootRef, thumbRef } = component.getRefs();

  const root = container.querySelector('[data-slot="slider-root"]')!;
  const thumb = root.querySelector('[role="slider"]')!;
  const input = root.querySelector<HTMLInputElement>('input[hidden]')!;
  expect(root.getAttribute('data-scope')).toBe('slider');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.querySelector('[data-slot="slider-control"]')?.getAttribute('data-probe')).toBe(
    'control',
  );
  expect(rootRef).toBe(root);
  expect(thumbRef).toBe(thumb);
  expect(thumb.getAttribute('data-slot')).toBe('slider-thumb');
  expect(input.value).toBe('40');
  expect(input.getAttribute('form')).toBe('slider-form');
  expect(container.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(3);
  expect(container.querySelectorAll('input[hidden]')).toHaveLength(3);
  await expect.element(page.getByRole('slider')).toHaveCount(3);
  await expect
    .poll(() => Array.from(new FormData(container.querySelector('form')!).entries()))
    .toEqual([
      ['volume', '40'],
      ['range[]', '20'],
      ['range[]', '80'],
    ]);
});

test('preserves keyboard behavior and read-only/disabled focusability', async () => {
  const changes: Array<{ value: number[] }> = [];
  render(KeyboardSlider, { props: { changes } });

  const slider = page.getByRole('slider', { name: 'Volume', exact: true });
  const readOnlySlider = page.getByRole('slider', { name: 'Read-only volume' });
  const disabledSlider = page.getByRole('slider', { name: 'Disabled volume' });
  await slider.press('ArrowRight');
  await readOnlySlider.press('ArrowRight');
  await expect.element(readOnlySlider).toBeFocused();
  await disabledSlider.press('ArrowRight');
  await expect.poll(() => changes).toEqual([expect.objectContaining({ value: [1] })]);
  await expect.element(readOnlySlider).toHaveAttribute('tabindex', '0');
  await expect
    .element(page.locator('[data-slot="slider-root"]').filter({ has: readOnlySlider }))
    .toHaveAttribute('data-readonly');
  await expect.element(disabledSlider).not.toHaveAttribute('tabindex');
});

test('supports bind:value without remounting thumbs and emits one detail per interaction', async () => {
  const details: number[][] = [];
  const { container } = render(BoundSlider, { props: { details } });

  const thumb = container.querySelector('[role="slider"]')!;
  await page.getByRole('slider', { name: 'Volume' }).press('ArrowRight');
  await expect.element(page.getByText('Value: 41')).toBeVisible();
  await expect.poll(() => details).toEqual([[41]]);
  await expect
    .element(page.getByRole('slider', { name: 'Volume' }))
    .toHaveAttribute('aria-valuenow', '41');
  expect(container.querySelector('[role="slider"]')).toBe(thumb);
});

test('preserves asChild hosts, Svelte refs, and explicit input placement', () => {
  const { component, container } = render(AsChildSlider);
  const { rootRef, controlRef, thumbRef } = component.getRefs();

  const root = container.querySelector('[data-slot="slider-root"]')!;
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;
  expect(root.tagName).toBe('SECTION');
  expect(rootRef).toBe(root);
  expect(controlRef?.getAttribute('data-slot')).toBe('slider-control');
  expect(thumb.tagName).toBe('SPAN');
  expect(thumbRef).toBe(thumb);
  expect(thumb.getAttribute('role')).toBe('slider');
  expect(thumb.querySelector('input[hidden]')).not.toBeNull();
});

test('keeps RootProvider, Context, and useSliderContext connected', async () => {
  render(ProviderSlider);

  await expect.element(page.getByText('Hook: 40 / Dragging: false')).toBeVisible();
  await expect.element(page.getByText('Slot: 40')).toBeVisible();
  await expect.element(page.locator('[data-slot="slider-root-provider"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Set to 80' }).click();
  await expect.element(page.getByText('Hook: 80 / Dragging: false')).toBeVisible();
  await expect.element(page.getByText('Slot: 80')).toBeVisible();
  await expect.element(page.locator('input[hidden]')).toHaveValue('80');
});

test('forwards consumer classes to every styled part', () => {
  const { container } = render(ClassesSlider);

  for (const part of ['root', 'label', 'control', 'track', 'range', 'thumb']) {
    const element = container.querySelector(`[data-slot="slider-${part}"]`)!;
    expect(element.classList.contains(`consumer-${part}`)).toBe(true);
  }
});

test('places label and value text on one row above the control', async () => {
  render(LayoutSlider);

  await expect.element(page.locator('[data-slot="slider-control"]')).toBeVisible();
  const root = rect('[data-slot="slider-root"]');
  const label = rect('[data-slot="slider-label"]');
  const valueText = rect('[data-slot="slider-value-text"]');
  const control = rect('[data-slot="slider-control"]');
  expect(valueText.top).toBe(label.top);
  expect(Math.abs(valueText.right - root.right)).toBeLessThanOrEqual(1);
  expect(control.top).toBeGreaterThanOrEqual(label.bottom);
  expect(control.width).toBe(root.width);
});

test('keeps the dragging indicator next to the thumb in both orientations', async () => {
  const { container } = render(DraggingSlider);

  await expect.element(page.getByRole('slider', { name: 'vertical' })).toBeVisible();
  const [horizontal, vertical] = container.querySelectorAll('[data-slot="slider-root"]');
  pressThumb(horizontal!.querySelector('[data-slot="slider-thumb"]')!);
  pressThumb(vertical!.querySelector('[data-slot="slider-thumb"]')!);
  await expect
    .poll(() => container.querySelectorAll('[data-slot="slider-dragging-indicator"]:not([hidden])'))
    .toHaveLength(2);
  const horizontalThumb = rect('[data-slot="slider-thumb"]', horizontal!);
  const horizontalIndicator = rect('[data-slot="slider-dragging-indicator"]', horizontal!);
  const verticalThumb = rect('[data-slot="slider-thumb"]', vertical!);
  const verticalIndicator = rect('[data-slot="slider-dragging-indicator"]', vertical!);
  expect(horizontalIndicator.bottom).toBeLessThanOrEqual(horizontalThumb.top);
  expect(verticalIndicator.left).toBeGreaterThanOrEqual(verticalThumb.right);
  expect(verticalIndicator.height).toBe(horizontalIndicator.height);
  expect(
    Math.abs(
      verticalIndicator.top +
        verticalIndicator.height / 2 -
        (verticalThumb.top + verticalThumb.height / 2),
    ),
  ).toBeLessThanOrEqual(1);
});