import { LocaleProvider } from '@ark-ui/vue/locale';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Slider,
  SliderContext,
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
  useSliderContext,
} from '../src';
import TestSlider from './fixtures/TestSlider.vue';

const sliderComponents = {
  Slider,
  SliderContext,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
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

test('uses Tailwind-owned visual defaults and lets consumer utilities win', async () => {
  const { container } = render({
    components: sliderComponents,
    template: `
      <Slider class="w-64" :default-value="[40]">
        <SliderLabel class="text-primary">Volume</SliderLabel>
        <SliderControl class="min-h-6">
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb class="border-primary" :index="0" aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
        <SliderMarkerGroup>
          <SliderMarker :value="0" class="text-primary">0</SliderMarker>
        </SliderMarkerGroup>
      </Slider>
    `,
  });

  const root = container.querySelector('[data-slot="slider-root"]')!;
  const label = container.querySelector('[data-slot="slider-label"]')!;
  const control = container.querySelector('[data-slot="slider-control"]')!;
  const track = container.querySelector('[data-slot="slider-track"]')!;
  const range = container.querySelector('[data-slot="slider-range"]')!;
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;
  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['group', 'grid', 'w-64']));
  expect([...root.classList]).not.toContain('w-full');
  expect([...label.classList]).toContain('text-primary');
  expect([...control.classList]).toContain('min-h-6');
  expect([...control.classList]).not.toContain('min-h-5');
  expect([...track.classList]).toEqual(expect.arrayContaining(['h-1.5', 'bg-muted', 'ring-1']));
  expect([...range.classList]).toEqual(expect.arrayContaining(['h-full', 'bg-primary']));
  expect([...thumb.classList]).toEqual(
    expect.arrayContaining(['size-4', 'border-primary', 'bg-background']),
  );
  expect([...marker.classList]).toEqual(
    expect.arrayContaining(['before:size-1', 'before:bg-border', 'text-primary']),
  );
  await expect.element(page.locator('[data-slot="slider-root"]')).toHaveCSS('width', '256px');
  await expect
    .element(page.locator('[data-slot="slider-control"]'))
    .toHaveCSS('min-height', '24px');
  await expect.element(page.locator('[data-slot="slider-track"]')).toHaveCSS('height', '6px');
  await expect.element(page.getByRole('slider', { name: 'Volume' })).toHaveCSS('width', '16px');
  expect(getComputedStyle(marker, '::before').width).toBe('4px');
});

test('fills the container width by default', async () => {
  render({
    components: sliderComponents,
    template: `
      <div style="width: 20rem">
        <Slider :default-value="[40]" data-testid="slider-root">
          <SliderControl>
            <SliderTrack><SliderRange /></SliderTrack>
            <SliderThumb :index="0" aria-label="Volume"><SliderHiddenInput /></SliderThumb>
          </SliderControl>
        </Slider>
      </div>
    `,
  });
  await nextTick();

  expect(screen.getByTestId('slider-root').offsetWidth).toBe(320);
});

function rect(selector: string, root: ParentNode = document) {
  return root.querySelector(selector)!.getBoundingClientRect();
}

function markerDotCenter(marker: Element) {
  const dot = getComputedStyle(marker, '::before');
  const translateX = new DOMMatrix(dot.transform === 'none' ? undefined : dot.transform).m41;

  return parseFloat(dot.left) + parseFloat(dot.marginLeft) + parseFloat(dot.width) / 2 + translateX;
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

const sliderLayoutComponents = {
  ...sliderComponents,
  LocaleProvider,
  SliderDraggingIndicator,
  SliderMarker,
  SliderMarkerGroup,
};

test('places label and value text on one row above the control', async () => {
  render({
    components: sliderLayoutComponents,
    template: `
      <div style="width: 20rem">
        <Slider :default-value="[40]">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
          <SliderControl>
            <SliderTrack><SliderRange /></SliderTrack>
            <SliderThumbs />
          </SliderControl>
        </Slider>
      </div>
    `,
  });
  await nextTick();

  const root = rect('[data-slot="slider-root"]');
  const label = rect('[data-slot="slider-label"]');
  const valueText = rect('[data-slot="slider-value-text"]');
  const control = rect('[data-slot="slider-control"]');

  expect(valueText.top).toBe(label.top);
  expect(Math.abs(valueText.right - root.right)).toBeLessThanOrEqual(1);
  expect(control.top).toBeGreaterThanOrEqual(label.bottom);
  expect(control.width).toBe(root.width);
});

test('reserves room for marker labels and centers marker dots in RTL', async () => {
  const { container } = render({
    components: sliderLayoutComponents,
    template: `
      <LocaleProvider locale="ar">
        <div style="width: 20rem">
          <Slider :default-value="[40]">
            <SliderControl>
              <SliderTrack><SliderRange /></SliderTrack>
              <SliderThumbs />
            </SliderControl>
            <SliderMarkerGroup>
              <SliderMarker :value="50">50</SliderMarker>
            </SliderMarkerGroup>
          </Slider>
          <p>After</p>
        </div>
      </LocaleProvider>
    `,
  });
  await nextTick();

  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  expect(marker.getAttribute('dir')).toBe('rtl');
  expect(rect('p', container).top).toBeGreaterThanOrEqual(marker.getBoundingClientRect().bottom);
  expect(Math.abs(markerDotCenter(marker) - marker.clientWidth / 2)).toBeLessThanOrEqual(0.5);
});

test('keeps the dragging indicator next to the thumb in both orientations', async () => {
  const { container } = render({
    components: sliderLayoutComponents,
    template: `
      <Slider
        v-for="orientation in ['horizontal', 'vertical']"
        :key="orientation"
        :default-value="[40]"
        :orientation="orientation"
      >
        <SliderControl>
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb :index="0" :aria-label="orientation">
            <SliderDraggingIndicator>40</SliderDraggingIndicator>
          </SliderThumb>
        </SliderControl>
      </Slider>
    `,
  });
  await nextTick();
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