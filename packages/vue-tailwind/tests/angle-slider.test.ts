import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  AngleSliderValueText,
  useAngleSlider,
} from '../src';

const angleSliderComponents: Record<string, any> = {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  AngleSliderValueText,
};

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

const ProviderAngleSlider = defineComponent({
  components: angleSliderComponents,
  setup() {
    const angleSlider = useAngleSlider({
      defaultValue: 45,
      name: 'provider-rotation',
      'aria-label': 'Provider rotation',
    });

    return { angleSlider };
  },
  template: `
    <AngleSliderRootProvider :value="angleSlider">
      <AngleSliderDial />
      <AngleSliderHiddenInput form="angle-form" />
    </AngleSliderRootProvider>
  `,
});

test('submits through explicit hidden inputs for root and RootProvider composition', () => {
  const { container } = render({
    components: { ...angleSliderComponents, ProviderAngleSlider },
    template: `
      <div>
        <form id="angle-form" />
        <AngleSlider :default-value="135" name="rotation" aria-label="Rotation">
          <AngleSliderDial />
          <AngleSliderHiddenInput form="angle-form" />
        </AngleSlider>
        <ProviderAngleSlider />
      </div>
    `,
  });

  const inputs = container.querySelectorAll<HTMLInputElement>('input[type="hidden"]');

  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveValue('135');
  expect(inputs[1]).toHaveValue('45');
  expect(inputs[0]).toHaveAttribute('form', 'angle-form');
  expect(inputs[1]).toHaveAttribute('form', 'angle-form');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
});

test('preserves asChild composition, slots, refs, and explicit input placement', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();

  const { container } = render({
    components: angleSliderComponents,
    setup() {
      return { rootRef, controlRef, thumbRef };
    },
    template: `
      <AngleSlider ref="rootRef" as-child :default-value="90" aria-label="Direction">
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

  const root = rootRef.value?.$el as HTMLElement;
  const thumb = thumbRef.value?.$el as HTMLElement;

  expect(root).toBe(container.querySelector('section'));
  expect(root).toHaveAttribute('data-slot', 'angle-slider-root');
  expect(controlRef.value?.$el).toHaveAttribute('data-slot', 'angle-slider-control');
  expect(thumb).toBe(screen.getByRole('slider', { name: 'Direction' }));
  expect(root.querySelector('input[type="hidden"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
});

test('preserves Ark callback details, keyboard behavior, and non-interactive states', async () => {
  const changes: unknown[] = [];

  render({
    components: angleSliderComponents,
    setup() {
      return { changes };
    },
    template: `
      <div>
        <AngleSlider aria-label="Rotation" @value-change="changes.push($event)">
          <AngleSliderDial />
        </AngleSlider>
        <AngleSlider read-only aria-label="Read-only rotation" @value-change="changes.push($event)">
          <AngleSliderDial />
        </AngleSlider>
        <AngleSlider disabled aria-label="Disabled rotation" @value-change="changes.push($event)">
          <AngleSliderDial />
        </AngleSlider>
      </div>
    `,
  });

  const slider = screen.getByRole('slider', { name: 'Rotation' });
  const readOnlySlider = screen.getByRole('slider', { name: 'Read-only rotation' });
  const disabledSlider = screen.getByRole('slider', { name: 'Disabled rotation' });

  slider.focus();
  await fireEvent.focusIn(slider);
  await fireEvent.keyDown(slider, { key: 'ArrowRight' });
  readOnlySlider.focus();
  await fireEvent.focusIn(readOnlySlider);
  await fireEvent.keyDown(readOnlySlider, { key: 'ArrowRight' });
  await fireEvent.keyDown(disabledSlider, { key: 'ArrowRight' });

  await waitFor(() =>
    expect(changes).toEqual([expect.objectContaining({ value: 1, valueAsDegree: '1deg' })]),
  );
  expect(readOnlySlider).toHaveAttribute('tabindex', '0');
  expect(readOnlySlider).toHaveAttribute('data-readonly');
  expect(disabledSlider).not.toHaveAttribute('tabindex');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: angleSliderComponents,
    template: `
      <AngleSlider class="gap-0" aria-label="Rotation">
        <AngleSliderDial />
      </AngleSlider>
    `,
  });

  const root = screen
    .getByRole('slider', { name: 'Rotation' })
    .closest('[data-slot="angle-slider-root"]');
  expect(root).toHaveClass('gap-0');
  expect(root).not.toHaveClass('gap-3');
});

test('draws the circular track with a masked conic fill', () => {
  render({
    components: angleSliderComponents,
    template: `
      <AngleSlider aria-label="Rotation">
        <AngleSliderDial />
      </AngleSlider>
    `,
  });

  const control = screen.getByRole('slider', { name: 'Rotation' }).parentElement;

  expect(control).toHaveClass(
    'before:bg-[conic-gradient(from_0deg,var(--angle-slider-fill)_var(--angle,0deg),var(--color-muted)_var(--angle,0deg))]',
  );
  expect(control).toHaveClass(
    'before:[mask-image:radial-gradient(closest-side,transparent_calc(100%-0.5rem-1px),#000_calc(100%-0.5rem))]',
  );
  expect(control).toHaveClass('data-invalid:[--angle-slider-fill:var(--color-destructive)]');
});

test('mirrors the slider dragging ring through the pressed control state', () => {
  render({
    components: angleSliderComponents,
    template: `
      <AngleSlider :default-value="135" aria-label="Rotation">
        <AngleSliderDial />
      </AngleSlider>
    `,
  });

  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  expect(thumb).toHaveClass('before:-translate-x-1/2');
  expect(thumb).toHaveClass('before:-translate-y-1/2');
  expect(thumb).toHaveClass(
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:border-ring',
  );
  expect(thumb).toHaveClass(
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:shadow-md',
  );
});

test('supports v-model and notifies each Vue listener once', async () => {
  const details: number[] = [];
  const Harness = defineComponent({
    components: angleSliderComponents,
    setup() {
      const value = ref(45);

      return { details, value };
    },
    template: `
      <AngleSlider v-model="value" aria-label="Rotation" @value-change="details.push($event.value)">
        <AngleSliderDial />
      </AngleSlider>
      <output>Angle: {{ value }}</output>
    `,
  });

  render(Harness);
  const slider = screen.getByRole('slider', { name: 'Rotation' });

  slider.focus();
  await fireEvent.focusIn(slider);
  await fireEvent.keyDown(slider, { key: 'ArrowRight' });

  await waitFor(() => expect(screen.getByText('Angle: 46')).toBeInTheDocument());
  expect(details).toEqual([46]);
});

test('focuses the thumb synchronously on left pointer down and respects prevented and non-interactive states', async () => {
  const preventPointerDown = (event: PointerEvent) => {
    event.preventDefault();
  };

  const { container } = render({
    components: angleSliderComponents,
    template: `
      <AngleSlider :default-value="45" aria-label="Rotation">
        <AngleSliderDial />
      </AngleSlider>
    `,
  });
  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  await fireEvent.pointerDown(container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(thumb).toHaveFocus();

  thumb.blur();
  const prevented = render({
    components: angleSliderComponents,
    setup() {
      return { preventPointerDown };
    },
    template: `
      <AngleSlider :default-value="45" aria-label="Rotation">
        <AngleSliderDial @pointerdown="preventPointerDown" />
      </AngleSlider>
    `,
  });
  await fireEvent.pointerDown(
    prevented.container.querySelector('[data-slot="angle-slider-control"]')!,
    {
      button: 0,
    },
  );
  expect(thumb).not.toHaveFocus();

  const disabled = render({
    components: angleSliderComponents,
    template: `
      <AngleSlider :default-value="45" aria-label="Disabled rotation" disabled>
        <AngleSliderDial />
      </AngleSlider>
    `,
  });
  await fireEvent.pointerDown(
    disabled.container.querySelector('[data-slot="angle-slider-control"]')!,
    {
      button: 0,
    },
  );
  expect(screen.getByRole('slider', { name: 'Disabled rotation' })).not.toHaveFocus();
});

const ProviderConnectionHarness = defineComponent({
  components: angleSliderComponents,
  setup() {
    const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

    return { angleSlider };
  },
  template: `
    <div>
      <AngleSliderRootProvider :value="angleSlider">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial />
        <AngleSliderHiddenInput />
      </AngleSliderRootProvider>
      <button type="button" @click="angleSlider.setValue(90)">Set to 90 degrees</button>
    </div>
  `,
});

test('keeps provider and context composition connected', async () => {
  render(ProviderConnectionHarness);

  const thumb = screen.getByRole('slider', { name: 'Rotation' });
  const hiddenInput = document.querySelector<HTMLInputElement>('input[type="hidden"]');

  expect(thumb.closest('[data-slot="angle-slider-root-provider"]')).toBeInTheDocument();
  expect(hiddenInput).toHaveValue('45');

  await fireEvent.click(screen.getByRole('button', { name: 'Set to 90 degrees' }));

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '90'));
  expect(hiddenInput).toHaveValue('90');
});

test('renders the public anatomy on the server', async () => {
  const App = defineComponent({
    components: angleSliderComponents,
    setup() {
      return { markerValues };
    },
    template: `
      <AngleSlider :default-value="135" aria-label="Rotation">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial>
          <AngleSliderMarks :values="markerValues" />
        </AngleSliderDial>
        <AngleSliderHiddenInput />
      </AngleSlider>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="angle-slider-root"');
  expect(html).toContain('data-slot="angle-slider-control"');
  expect(html).toContain('data-slot="angle-slider-value-text"');
  expect(html).toContain('data-slot="angle-slider-marker"');
  expect(html).toContain('aria-label="Rotation"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});