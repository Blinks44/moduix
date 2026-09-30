import type { UseSliderReturn } from '@ark-ui/vue/slider';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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
import styles from '../src/components/slider/Slider.module.css';

const sliderComponents: Record<string, any> = {
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
};

test('renders Ark anatomy, forwards attrs and refs, and submits explicit hidden inputs', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: sliderComponents,
    setup() {
      return { rootRef, thumbRef };
    },
    template: `
      <form id="slider-form" />
      <Slider
        ref="rootRef"
        :default-value="[40]"
        name="volume"
        aria-label="Volume"
        data-probe="root"
      >
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderControl data-probe="control">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb ref="thumbRef" :index="0" aria-label="Volume">
            <SliderHiddenInput form="slider-form" />
          </SliderThumb>
        </SliderControl>
      </Slider>
    `,
  });

  const { container } = render(Harness);
  const root = rootRef.value?.$el as HTMLElement;
  const thumb = container.querySelector<HTMLElement>('[role="slider"]')!;
  const input = container.querySelector<HTMLInputElement>('input[hidden]');

  expect(root).toHaveAttribute('data-scope', 'slider');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'slider-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(rootRef.value?.$el).toBe(root);
  expect(thumbRef.value?.$el).toBe(thumb);
  expect(thumb).toHaveAttribute('data-slot', 'slider-thumb');
  expect(input).toHaveValue('40');
  expect(input).toHaveAttribute('form', 'slider-form');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['volume', '40'],
  ]);
});

test('keeps generated thumbs mounted for every slider value', () => {
  const { container } = render({
    components: sliderComponents,
    template: `
      <Slider :default-value="[20, 80]" aria-label="Range">
        <SliderControl>
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
    `,
  });

  expect(container.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(2);
  expect(container.querySelectorAll('input[hidden]')).toHaveLength(2);
  expect(screen.getAllByRole('slider', { hidden: true })).toHaveLength(2);
});

test('preserves keyboard behavior and readOnly and disabled focusability', async () => {
  const changes: unknown[] = [];
  render({
    components: sliderComponents,
    setup() {
      return { changes };
    },
    template: `
      <div>
        <Slider aria-label="Volume" @value-change="changes.push($event)">
          <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
        </Slider>
        <Slider read-only aria-label="Read-only volume" @value-change="changes.push($event)">
          <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
        </Slider>
        <Slider disabled aria-label="Disabled volume" @value-change="changes.push($event)">
          <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
        </Slider>
      </div>
    `,
  });

  const [slider, readOnlySlider, disabledSlider] = screen.getAllByRole('slider', { hidden: true });

  slider.focus();
  await fireEvent.focusIn(slider);
  await fireEvent.keyDown(slider, { key: 'ArrowRight' });
  readOnlySlider.focus();
  await fireEvent.focusIn(readOnlySlider);
  await fireEvent.keyDown(readOnlySlider, { key: 'ArrowRight' });
  await fireEvent.keyDown(disabledSlider, { key: 'ArrowRight' });

  await waitFor(() => expect(changes).toEqual([expect.objectContaining({ value: [1] })]));
  expect(readOnlySlider).toHaveAttribute('tabindex', '0');
  expect(readOnlySlider.closest('[data-slot="slider-root"]')).toHaveAttribute('data-readonly');
  expect(disabledSlider).not.toHaveAttribute('tabindex');
});

test('supports v-model and forwards one Ark value-change detail per interaction', async () => {
  const details: number[][] = [];
  const Harness = defineComponent({
    components: sliderComponents,
    setup() {
      return { details, value: ref([40]) };
    },
    template: `
      <Slider v-model="value" aria-label="Volume" @value-change="details.push($event.value)">
        <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
      </Slider>
      <output>Value: {{ value.join(', ') }}</output>
    `,
  });

  render(Harness);
  const slider = screen.getByRole('slider', { hidden: true });
  slider.focus();
  await fireEvent.focusIn(slider);
  await fireEvent.keyDown(slider, { key: 'ArrowRight' });

  await waitFor(() => expect(screen.getByText('Value: 41')).toBeInTheDocument());
  expect(details).toEqual([[41]]);
});

test('preserves asChild hosts, Vue refs, slots, and explicit input placement', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: sliderComponents,
    setup() {
      return { controlRef, rootRef, thumbRef };
    },
    template: `
      <Slider ref="rootRef" as-child :default-value="[40]" aria-label="Volume">
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

  const { container } = render(Harness);
  const root = container.querySelector('[data-slot="slider-root"]')!;
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(controlRef.value?.$el).toHaveAttribute('data-slot', 'slider-control');
  expect(thumb.tagName).toBe('SPAN');
  expect(thumbRef.value?.$el).toBe(thumb);
  expect(thumb).toHaveAttribute('role', 'slider');
  expect(thumb.querySelector('input[hidden]')).toBeInTheDocument();
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
  const Harness = defineComponent({
    components: { ...sliderComponents, SliderStatus },
    setup(): { slider: UseSliderReturn } {
      return { slider: useSlider({ defaultValue: [40], name: 'provider-volume' }) };
    },
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

  render(Harness);
  expect(screen.getByText('Hook: 40 / Dragging: false')).toBeInTheDocument();
  expect(screen.getByText('Slot: 40')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="slider-root-provider"]')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Set to 80' }));
  await waitFor(() => expect(screen.getByText('Hook: 80 / Dragging: false')).toBeInTheDocument());
  expect(screen.getByText('Slot: 80')).toBeInTheDocument();
  expect(document.querySelector('input[hidden]')).toHaveValue('80');
});

test('renders and hydrates stable public anatomy through Vue SSR', async () => {
  const Harness = defineComponent({
    components: sliderComponents,
    setup() {
      return { markerValues: [0, 50, 100] };
    },
    template: `
      <Slider id="slider-ssr" :default-value="[50]" aria-label="Hydrated volume">
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumbs />
        </SliderControl>
        <SliderMarkerGroup>
          <SliderMarker v-for="value in markerValues" :key="value" :value="value">{{ value }}</SliderMarker>
        </SliderMarkerGroup>
      </Slider>
    `,
  });

  const html = await renderToString(createSSRApp(Harness));
  expect(html).toContain('data-slot="slider-root"');
  expect(html).toContain('data-slot="slider-control"');
  expect(html).toContain('data-slot="slider-value-text"');
  expect(html).toContain('data-slot="slider-marker"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(Harness);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="slider-root"]')).toHaveLength(1);
  expect(host.querySelector('[data-slot="slider-root"]')).toHaveAttribute('id', serverIds[0]);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});

test('applies CSS Module defaults and keeps consumer classes last', () => {
  const { container } = render({
    components: sliderComponents,
    template: `
      <Slider class="consumer-root" :default-value="[40]" aria-label="Volume">
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

  expect(container.querySelector('[data-slot="slider-root"]')).toHaveClass(
    styles.root,
    'consumer-root',
  );
  expect(container.querySelector('[data-slot="slider-label"]')).toHaveClass(
    styles.label,
    'consumer-label',
  );
  expect(container.querySelector('[data-slot="slider-control"]')).toHaveClass(
    styles.control,
    'consumer-control',
  );
  expect(container.querySelector('[data-slot="slider-track"]')).toHaveClass(
    styles.track,
    'consumer-track',
  );
  expect(container.querySelector('[data-slot="slider-range"]')).toHaveClass(
    styles.range,
    'consumer-range',
  );
  expect(container.querySelector('[data-slot="slider-thumb"]')).toHaveClass(
    styles.thumb,
    'consumer-thumb',
  );
});