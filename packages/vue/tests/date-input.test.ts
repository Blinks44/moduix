import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  DateInput,
  DateInputContext,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
  DateInputSegments,
  DateInputSeparator,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '../src';

const dateInputComponents = {
  DateInput,
  DateInputContext,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
  DateInputSegments,
  DateInputSeparator,
} as unknown as Record<string, Component>;

const ProviderDateInput = defineComponent({
  components: dateInputComponents,
  setup() {
    return {
      dateInput: useDateInput({
        defaultValue: [new CalendarDate(2026, 6, 22)],
        name: 'report-date',
      }),
    };
  },
  template: `
    <DateInputRootProvider :value="dateInput">
      <DateInputLabel>Report date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput name="report-date" />
    </DateInputRootProvider>
  `,
});

test('submits through explicit Ark hidden inputs', () => {
  const { container } = render({
    components: { ...dateInputComponents, ProviderDateInput },
    template: `
      <form>
        <DateInput
          selection-mode="range"
          :default-value="[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]"
        >
          <DateInputLabel>Travel dates</DateInputLabel>
          <DateInputControl>
            <DateInputSegments :index="0" />
            <DateInputSeparator>to</DateInputSeparator>
            <DateInputSegments :index="1" />
          </DateInputControl>
          <DateInputHiddenInput :index="0" name="check-in" />
          <DateInputHiddenInput :index="1" name="check-out" />
        </DateInput>
        <ProviderDateInput />
      </form>
    `,
    setup() {
      return { CalendarDate };
    },
  });

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="hidden"]')).toHaveLength(3);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['check-in[0]', '6/22/2026'],
    ['check-out[1]', '6/26/2026'],
    ['report-date', '6/22/2026'],
  ]);
});

test('keeps explicit inputs inside an asChild root and forwards refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: dateInputComponents,
    setup() {
      return { rootRef, releaseDate: [new CalendarDate(2026, 6, 22)] };
    },
    template: `
      <form>
        <DateInput
          ref="rootRef"
          as-child
          :default-value="releaseDate"
          name="release-date"
        >
          <fieldset>
            <DateInputLabel>Release date</DateInputLabel>
            <DateInputControl>
              <DateInputSegments />
            </DateInputControl>
            <DateInputHiddenInput name="release-date" />
          </fieldset>
        </DateInput>
      </form>
    `,
  });

  const { container } = render(Harness);

  const root = container.querySelector('[data-slot="date-input-root"]')!;
  expect(root.tagName).toBe('FIELDSET');
  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'date-input-root');
  expect(root.querySelector('input[type="hidden"]')).toHaveAttribute('name', 'release-date');
});

test('preserves Ark segment semantics, styling hooks, consumer attrs, and part refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const controlRef = ref<ComponentPublicInstance | null>(null);
  const segmentRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: dateInputComponents,
    setup() {
      return {
        controlRef,
        rootRef,
        segmentRef,
        defaultValue: [new CalendarDate(2026, 6, 22)],
      };
    },
    template: `
      <DateInput
        ref="rootRef"
        invalid
        class="consumer-root"
        data-slot="consumer-slot"
        data-probe="root"
        :default-value="defaultValue"
        name="release-date"
      >
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl ref="controlRef">
          <DateInputSegmentGroup>
            <DateInputSegmentContext v-slot="segment">
              <DateInputSegment ref="segmentRef" :segment="segment" />
            </DateInputSegmentContext>
          </DateInputSegmentGroup>
        </DateInputControl>
      </DateInput>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const control = controlRef.value?.$el as HTMLElement;
  const segment = segmentRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'date-input-root');
  expect(root).toHaveAttribute('data-scope', 'date-input');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveClass('consumer-root');
  expect(controlRef.value?.$el).toBe(control);
  expect(control).toHaveAttribute('data-part', 'control');
  expect(control).toHaveAttribute('data-invalid');
  expect(control).toHaveAttribute('data-slot', 'date-input-control');
  expect(segmentRef.value?.$el).toBe(segment);
  expect(segment).toHaveAttribute('data-part', 'segment');
  expect(segment).toHaveAttribute('data-slot', 'date-input-segment');
  expect(screen.getAllByRole('spinbutton')).toHaveLength(3);
});

test('supports controlled v-model and preserves Ark value details', async () => {
  const values: string[][] = [];
  const Harness = defineComponent({
    components: dateInputComponents,
    setup() {
      const value = ref<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);
      const nextValue = [new CalendarDate(2026, 7, 4)];
      return { nextValue, value, values };
    },
    template: `
      <DateInput v-model="value" @value-change="values.push($event.value)">
        <DateInputLabel>Controlled date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputContext v-slot="dateInput">
          <button type="button" @click="dateInput.setValue(nextValue)">Change date</button>
        </DateInputContext>
      </DateInput>
      <output>{{ value[0]?.toString() }}</output>
    `,
  });

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Change date' }));

  await waitFor(() => expect(screen.getByText('2026-07-04')).toBeInTheDocument());
  expect(values.map((value) => value.map((date) => date.toString()))).toEqual([['2026-07-04']]);
});

test('exposes reactive state through useDateInputContext', () => {
  const DateInputStatus = defineComponent({
    setup() {
      const dateInput = useDateInputContext();
      return { dateInput };
    },
    template: '<output>{{ dateInput.valueAsString[0] }}</output>',
  });
  const Harness = defineComponent({
    components: { ...dateInputComponents, DateInputStatus },
    setup() {
      return { defaultValue: [new CalendarDate(2026, 6, 22)] };
    },
    template: `
      <DateInput :default-value="defaultValue">
        <DateInputStatus />
      </DateInput>
    `,
  });

  render(Harness);

  expect(screen.getByRole('status')).toHaveTextContent('6/22/2026');
});

test('renders and hydrates the public anatomy without changing generated ids', async () => {
  const App = defineComponent({
    components: dateInputComponents,
    setup() {
      return { defaultValue: [new CalendarDate(2026, 6, 22)] };
    },
    template: `
      <DateInput invalid :default-value="defaultValue">
        <DateInputLabel>Hydrated date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput name="hydrated-date" />
      </DateInput>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="date-input-root"');
  expect(html).toContain('data-slot="date-input-control"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="date-input-root"]')).toHaveLength(1);
  expect(host.querySelectorAll('[data-slot="date-input-segment"]')).toHaveLength(5);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});