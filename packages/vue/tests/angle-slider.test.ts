import type { UseAngleSliderReturn } from '@ark-ui/vue/angle-slider';
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
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  useAngleSlider,
} from '../src';

const angleSliderComponents: Record<string, any> = {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
};

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

const ProviderAngleSlider = defineComponent({
  components: angleSliderComponents,
  setup(): { angleSlider: UseAngleSliderReturn } {
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

const HiddenInputsHarness = defineComponent({
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

test('submits through explicit hidden inputs for root and RootProvider composition', () => {
  const { container } = render(HiddenInputsHarness);

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

const asChildRootRef = ref<ComponentPublicInstance>();
const asChildControlRef = ref<ComponentPublicInstance>();
const asChildThumbRef = ref<ComponentPublicInstance>();

const AsChildHarness = defineComponent({
  components: {
    ...angleSliderComponents,
  },
  setup() {
    return { asChildControlRef, asChildRootRef, asChildThumbRef };
  },
  template: `
    <AngleSlider ref="asChildRootRef" as-child :default-value="90" aria-label="Direction">
      <section>
        <AngleSliderControl ref="asChildControlRef">
          <AngleSliderMarks :values="[0, 90, 90, 180]" />
          <AngleSliderThumb ref="asChildThumbRef" />
        </AngleSliderControl>
        <AngleSliderHiddenInput />
      </section>
    </AngleSlider>
  `,
});

test('preserves asChild composition, slots, refs, and explicit input placement', () => {
  const { container } = render(AsChildHarness);

  const root = asChildRootRef.value?.$el as HTMLElement;
  const thumb = asChildThumbRef.value?.$el as HTMLElement;

  expect(root).toBe(container.querySelector('section'));
  expect(root).toHaveAttribute('data-slot', 'angle-slider-root');
  expect(asChildControlRef.value?.$el).toHaveAttribute('data-slot', 'angle-slider-control');
  expect(thumb).toBe(screen.getByRole('slider', { name: 'Direction' }));
  expect(root.querySelector('input[type="hidden"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
});

const keyboardChanges: unknown[] = [];

const KeyboardHarness = defineComponent({
  components: angleSliderComponents,
  setup() {
    return { changes: keyboardChanges };
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

test('preserves Ark callback details, keyboard behavior, and non-interactive states', async () => {
  render(KeyboardHarness);

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
    expect(keyboardChanges).toEqual([expect.objectContaining({ value: 1, valueAsDegree: '1deg' })]),
  );
  expect(readOnlySlider).toHaveAttribute('tabindex', '0');
  expect(readOnlySlider).toHaveAttribute('data-readonly');
  expect(disabledSlider).not.toHaveAttribute('tabindex');
});

const vModelDetails: number[] = [];

const VModelHarness = defineComponent({
  components: angleSliderComponents,
  setup() {
    const value = ref(45);

    return { details: vModelDetails, value };
  },
  template: `
    <div>
      <AngleSlider v-model="value" aria-label="Rotation" @value-change="details.push($event.value)">
        <AngleSliderDial />
      </AngleSlider>
      <output>Angle: {{ value }}</output>
    </div>
  `,
});

test('supports v-model and notifies each Vue listener once', async () => {
  render(VModelHarness);

  const slider = screen.getByRole('slider', { name: 'Rotation' });

  slider.focus();
  await fireEvent.focusIn(slider);
  await fireEvent.keyDown(slider, { key: 'ArrowRight' });

  await waitFor(() => expect(screen.getByText('Angle: 46')).toBeInTheDocument());
  expect(vModelDetails).toEqual([46]);
});

const preventPointerDown = (event: PointerEvent) => {
  event.preventDefault();
};

const PointerDownHarness = defineComponent({
  components: angleSliderComponents,
  template: `
    <AngleSlider :default-value="45" aria-label="Rotation">
      <AngleSliderDial />
    </AngleSlider>
  `,
});

const PreventedPointerDownHarness = defineComponent({
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

const DisabledPointerDownHarness = defineComponent({
  components: angleSliderComponents,
  template: `
    <AngleSlider :default-value="45" aria-label="Disabled rotation" disabled>
      <AngleSliderDial />
    </AngleSlider>
  `,
});

test('focuses the thumb synchronously on left pointer down and respects prevented and non-interactive states', async () => {
  const { container } = render(PointerDownHarness);
  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  await fireEvent.pointerDown(container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(thumb).toHaveFocus();

  thumb.blur();
  const prevented = render(PreventedPointerDownHarness);
  await fireEvent.pointerDown(
    prevented.container.querySelector('[data-slot="angle-slider-control"]')!,
    { button: 0 },
  );
  expect(thumb).not.toHaveFocus();

  const disabled = render(DisabledPointerDownHarness);
  await fireEvent.pointerDown(
    disabled.container.querySelector('[data-slot="angle-slider-control"]')!,
    { button: 0 },
  );
  expect(screen.getByRole('slider', { name: 'Disabled rotation' })).not.toHaveFocus();
});

const ProviderConnectionHarness = defineComponent({
  components: {
    ...angleSliderComponents,
  },
  setup(): { angleSlider: UseAngleSliderReturn } {
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

const SsrHarness = defineComponent({
  components: {
    ...angleSliderComponents,
  },
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

test('renders the public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrHarness));
  expect(html).toContain('data-slot="angle-slider-root"');
  expect(html).toContain('data-slot="angle-slider-control"');
  expect(html).toContain('data-slot="angle-slider-value-text"');
  expect(html).toContain('data-slot="angle-slider-marker"');
  expect(html).toContain('aria-label="Rotation"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrHarness);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});