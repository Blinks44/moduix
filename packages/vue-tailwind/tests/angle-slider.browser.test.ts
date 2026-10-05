import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  useAngleSlider,
} from '../src';
import TestAngleSlider from './fixtures/TestAngleSlider.vue';
import TestAngleSliderRootLabel from './fixtures/TestAngleSliderRootLabel.vue';

const components = {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
};

test('submits explicit root/provider inputs and keeps provider state connected', async () => {
  const { container } = render({
    components,
    setup: () => ({ angleSlider: useAngleSlider({ defaultValue: 45, name: 'provider-rotation' }) }),
    template: `
      <form id="angle-form" />
      <AngleSlider :default-value="135" name="rotation">
        <AngleSliderDial />
        <AngleSliderHiddenInput form="angle-form" />
      </AngleSlider>
      <AngleSliderRootProvider :value="angleSlider">
        <AngleSliderLabel>Provider rotation</AngleSliderLabel>
        <AngleSliderDial />
        <AngleSliderHiddenInput form="angle-form" />
      </AngleSliderRootProvider>
      <button type="button" @click="angleSlider.setValue(90)">Set to 90 degrees</button>
    `,
  });
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

test('preserves asChild hosts, slots, refs, duplicate marks, and explicit input placement', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components,
    setup: () => ({ rootRef, controlRef, thumbRef }),
    template: `
      <AngleSlider ref="rootRef" as-child :default-value="90">
        <section>
          <AngleSliderControl ref="controlRef">
            <AngleSliderMarks :values="[0, 90, 90, 180]" />
            <AngleSliderThumb ref="thumbRef" />
          </AngleSliderControl>
          <AngleSliderHiddenInput />
        </section>
      </AngleSlider>
    `,
  });
  const root = container.querySelector('section')!;
  const thumb = container.querySelector('[role="slider"]')!;
  expect(root.getAttribute('data-slot')).toBe('angle-slider-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(controlRef.value?.$el).toBe(container.querySelector('[data-slot="angle-slider-control"]'));
  expect(thumbRef.value?.$el).toBe(thumb);
  expect(root.querySelector('input[type="hidden"]')).not.toBeNull();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
});

test('preserves callback details, keyboard behavior, and read-only/disabled focusability', async () => {
  const changes: Array<{ value: number; valueAsDegree: string }> = [];
  render({
    components,
    setup: () => ({ changes }),
    template: `
      <AngleSlider @value-change="changes.push($event)">
        <AngleSliderLabel>Rotation</AngleSliderLabel><AngleSliderDial />
      </AngleSlider>
      <AngleSlider read-only @value-change="changes.push($event)">
        <AngleSliderLabel>Read-only rotation</AngleSliderLabel><AngleSliderDial />
      </AngleSlider>
      <AngleSlider disabled @value-change="changes.push($event)">
        <AngleSliderLabel>Disabled rotation</AngleSliderLabel><AngleSliderDial />
      </AngleSlider>
    `,
  });
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

test('supports v-model and notifies each Vue listener once', async () => {
  const details: number[] = [];
  render({
    components,
    setup: () => ({ details, value: ref(45) }),
    template: `
      <AngleSlider v-model="value" @value-change="details.push($event.value)">
        <AngleSliderLabel>Rotation</AngleSliderLabel><AngleSliderDial />
      </AngleSlider>
      <output>Angle: {{ value }}</output>
    `,
  });
  const slider = page.getByRole('slider', { name: 'Rotation' });
  await slider.focus();
  await slider.press('ArrowRight');
  await expect.element(page.getByText('Angle: 46')).toBeVisible();
  await expect.poll(() => details).toEqual([46]);
});

test('focuses synchronously unless pointerdown is prevented, disabled, or read-only', async () => {
  const states = ['default', 'prevented', 'disabled', 'read-only'];
  const { container } = render({
    components,
    setup: () => ({ states }),
    template: `
      <AngleSlider v-for="state in states" :key="state" :default-value="45" :disabled="state === 'disabled'" :read-only="state === 'read-only'">
        <AngleSliderDial @pointerdown="state === 'prevented' && $event.preventDefault()" />
      </AngleSlider>
    `,
  });
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

test('hydrates without replacing server hosts or ids and still handles keyboard input', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestAngleSlider));
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-scope="angle-slider"]')];
  const ids = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestAngleSlider);
  try {
    app.mount(host);
    const slider = page.getByRole('slider', { name: 'Rotation' });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '135');
    const hydrated = [...host.querySelectorAll('[data-scope="angle-slider"]')];
    expect(hydrated).toHaveLength(parts.length);
    hydrated.forEach((element, index) => expect(element).toBe(parts[index]));
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(ids);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    await slider.focus();
    await slider.press('ArrowRight');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '136');
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

// Existing Ark Vue root-name regression; re-enable after the upstream fix.
test.skip('forwards the root aria-label to the thumb in client and server renders', async () => {
  render(TestAngleSliderRootLabel);
  await expect.element(page.getByRole('slider', { name: 'Rotation' })).toHaveCount(1);
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestAngleSliderRootLabel));
  expect(host.querySelector('[role="slider"]')?.getAttribute('aria-label')).toBe('Rotation');
});

test('preserves Tailwind overrides, masked fill, and pressed thumb styling', async () => {
  const { container } = render({
    components,
    template: `
      <AngleSlider class="gap-0" :default-value="135" invalid><AngleSliderDial /></AngleSlider>
    `,
  });
  const root = container.querySelector('[data-slot="angle-slider-root"]')!;
  const control = container.querySelector('[data-slot="angle-slider-control"]')!;
  const thumb = container.querySelector('[role="slider"]')!;
  await expect.element(page.locator('[data-slot="angle-slider-root"]')).toHaveCSS('gap', '0px');
  expect(root.classList.contains('gap-0')).toBe(true);
  expect(root.classList.contains('gap-3')).toBe(false);
  const track = getComputedStyle(control, '::before');
  expect(track.backgroundImage).toContain('conic-gradient');
  expect(track.backgroundImage).toContain('135deg');
  expect(track.maskImage).toContain('radial-gradient');
  expect(track.maskImage).toContain('calc(100% - 9px)');
  expect(track.maskImage).toContain('calc(100% - 8px)');
  const controlStyle = getComputedStyle(control);
  expect(controlStyle.getPropertyValue('--angle-slider-fill').trim()).toBe(
    controlStyle.getPropertyValue('--color-destructive').trim(),
  );
  expect(getComputedStyle(thumb, '::before').translate).toBe('-50% -50%');
  for (const token of [
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:border-ring',
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:shadow-md',
  ])
    expect(thumb.classList.contains(token)).toBe(true);
});