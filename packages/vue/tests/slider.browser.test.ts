import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Slider,
  SliderContext,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
  useSliderContext,
} from '../src';
import styles from '../src/components/slider/Slider.module.css';
import TestSlider from './fixtures/TestSlider.vue';

const sliderComponents = {
  Slider,
  SliderContext,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
};

test('preserves anatomy, attrs, refs, and explicit/generated form inputs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components: sliderComponents,
    setup: () => ({ rootRef, thumbRef }),
    template: `
      <form id="slider-form" />
      <Slider ref="rootRef" :default-value="[40]" name="volume" data-probe="root">
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderControl data-probe="control">
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb ref="thumbRef" :index="0" aria-label="Volume">
            <SliderHiddenInput form="slider-form" />
          </SliderThumb>
        </SliderControl>
      </Slider>
      <Slider :default-value="[20, 80]" name="range" form="slider-form">
        <SliderLabel>Range</SliderLabel>
        <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
      </Slider>
    `,
  });
  const root = container.querySelector('[data-slot="slider-root"]')!;
  const thumb = root.querySelector('[role="slider"]')!;
  const input = root.querySelector<HTMLInputElement>('input[hidden]')!;

  expect(root.getAttribute('data-scope')).toBe('slider');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.querySelector('[data-slot="slider-control"]')?.getAttribute('data-probe')).toBe(
    'control',
  );
  expect(rootRef.value?.$el).toBe(root);
  expect(thumbRef.value?.$el).toBe(thumb);
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
  render({
    components: sliderComponents,
    setup: () => ({ changes }),
    template: `
      <Slider @value-change="changes.push($event)">
        <SliderLabel>Volume</SliderLabel>
        <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
      </Slider>
      <Slider read-only @value-change="changes.push($event)">
        <SliderLabel>Read-only volume</SliderLabel>
        <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
      </Slider>
      <Slider disabled @value-change="changes.push($event)">
        <SliderLabel>Disabled volume</SliderLabel>
        <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
      </Slider>
    `,
  });
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

test('supports v-model without remounting thumbs and emits one detail per interaction', async () => {
  const details: number[][] = [];
  const { container } = render({
    components: sliderComponents,
    setup: () => ({ details, value: ref([40]) }),
    template: `
      <Slider v-model="value" @value-change="details.push($event.value)">
        <SliderLabel>Volume</SliderLabel>
        <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
      </Slider>
      <output>Value: {{ value.join(', ') }}</output>
    `,
  });
  const thumb = container.querySelector('[role="slider"]')!;

  await page.getByRole('slider', { name: 'Volume' }).press('ArrowRight');

  await expect.element(page.getByText('Value: 41')).toBeVisible();
  await expect.poll(() => details).toEqual([[41]]);
  await expect
    .element(page.getByRole('slider', { name: 'Volume' }))
    .toHaveAttribute('aria-valuenow', '41');
  expect(container.querySelector('[role="slider"]')).toBe(thumb);
});

test('preserves asChild hosts, Vue refs, slots, and explicit input placement', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components: sliderComponents,
    setup() {
      return { controlRef, rootRef, thumbRef };
    },
    template: `
      <Slider ref="rootRef" as-child :default-value="[40]">
        <section>
          <SliderControl ref="controlRef">
            <SliderTrack><SliderRange /></SliderTrack>
            <SliderThumb ref="thumbRef" as-child :index="0" aria-label="Volume">
              <span><SliderHiddenInput /></span>
            </SliderThumb>
          </SliderControl>
        </section>
      </Slider>
    `,
  });

  const root = container.querySelector('[data-slot="slider-root"]')!;
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(controlRef.value?.$el.getAttribute('data-slot')).toBe('slider-control');
  expect(thumb.tagName).toBe('SPAN');
  expect(thumbRef.value?.$el).toBe(thumb);
  expect(thumb.getAttribute('role')).toBe('slider');
  expect(thumb.querySelector('input[hidden]')).not.toBeNull();
});

const SliderStatus = defineComponent({
  components: { SliderLabel },
  setup() {
    return { slider: useSliderContext() };
  },
  template: `
    <SliderLabel>Hook: {{ slider.value.join(', ') }} / Dragging: {{ String(slider.dragging) }}</SliderLabel>
  `,
});

test('keeps RootProvider, Context, and useSliderContext connected', async () => {
  render({
    components: { ...sliderComponents, SliderStatus },
    setup: () => ({ slider: useSlider({ defaultValue: [40], name: 'provider-volume' }) }),
    template: `
      <div>
        <SliderRootProvider :value="slider">
          <SliderStatus />
          <SliderContext v-slot="context">
            <output>Slot: {{ context.value.join(', ') }}</output>
          </SliderContext>
          <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
        </SliderRootProvider>
        <button type="button" @click="slider.setValue([80])">Set to 80</button>
      </div>
    `,
  });

  await expect.element(page.getByText('Hook: 40 / Dragging: false')).toBeVisible();
  await expect.element(page.getByText('Slot: 40')).toBeVisible();
  await expect.element(page.locator('[data-slot="slider-root-provider"]')).toHaveCount(1);

  await page.getByRole('button', { name: 'Set to 80' }).click();
  await expect.element(page.getByText('Hook: 80 / Dragging: false')).toBeVisible();
  await expect.element(page.getByText('Slot: 80')).toBeVisible();
  await expect.element(page.locator('input[hidden]')).toHaveValue('80');
});

test('hydrates without replacing server hosts or ids and still handles keyboard input', async () => {
  const markup = await renderToString(createSSRApp(TestSlider));
  const host = document.createElement('div');
  host.innerHTML = markup;
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-scope="slider"]')];
  const serverIds = parts.map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSlider);
  try {
    app.mount(host);
    const slider = page.getByRole('slider', { name: 'Hydrated volume' });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');
    const hydratedParts = [...host.querySelectorAll('[data-scope="slider"]')];
    expect(hydratedParts.map((element) => element.id)).toEqual(serverIds);
    hydratedParts.forEach((element, index) => expect(element).toBe(parts[index]));
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();

    await slider.press('ArrowRight');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '51');
    await expect.element(page.locator('[data-slot="slider-value-text"]')).toHaveText('51');
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('applies CSS Module defaults and keeps consumer classes last', () => {
  const { container } = render({
    components: sliderComponents,
    template: `
      <Slider class="consumer-root" :default-value="[40]">
        <SliderLabel class="consumer-label">Volume</SliderLabel>
        <SliderControl class="consumer-control">
          <SliderTrack class="consumer-track">
            <SliderRange class="consumer-range" />
          </SliderTrack>
          <SliderThumb class="consumer-thumb" :index="0" aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    `,
  });

  for (const [part, defaultClass] of Object.entries({
    root: styles.root,
    label: styles.label,
    control: styles.control,
    track: styles.track,
    range: styles.range,
    thumb: styles.thumb,
  })) {
    const classes = [...container.querySelector(`[data-slot="slider-${part}"]`)!.classList];
    expect(classes).toEqual(expect.arrayContaining([defaultClass, `consumer-${part}`]));
    expect(classes.at(-1)).toBe(`consumer-${part}`);
  }
});