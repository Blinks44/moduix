import { CalendarDate } from '@internationalized/date';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrDateInput from './fixtures/SsrDateInput.vue';

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

test('submits through explicit Ark hidden inputs', async () => {
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
  await page.getByRole('spinbutton').nth(0).press('ArrowUp');
  expect(new FormData(form).get('check-in[0]')).toBe('7/22/2026');
});

test('keeps explicit inputs inside an asChild root and forwards refs', async () => {
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
  await expect
    .element(page.locator('[data-slot="date-input-root"]'))
    .toHaveAttribute('data-slot', 'date-input-root');
  expect(root.querySelector('input[type="hidden"]')!.getAttribute('name')).toBe('release-date');
});

test('preserves Ark segment semantics, styling hooks, consumer attrs, and part refs', async () => {
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

  expect(root!.getAttribute('data-slot')).toBe('date-input-root');
  expect(root!.getAttribute('data-scope')).toBe('date-input');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(root!.classList.contains('consumer-root')).toBe(true);
  expect(controlRef.value?.$el).toBe(control);
  expect(control!.getAttribute('data-part')).toBe('control');
  expect(control!.hasAttribute('data-invalid')).toBe(true);
  expect(control!.getAttribute('data-slot')).toBe('date-input-control');
  expect(segmentRef.value?.$el).toBe(segment);
  expect(segment!.getAttribute('data-part')).toBe('segment');
  expect(segment!.getAttribute('data-slot')).toBe('date-input-segment');
  expect(screen.getAllByRole('spinbutton')).toHaveLength(3);
});

test('supports controlled v-model and preserves Ark value details', async () => {
  const values: DateInputDateValue[][] = [];
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
  await page.getByRole('button', { name: 'Change date', exact: true }).click();

  await expect.element(page.getByText('2026-07-04')).toBeAttached();
  expect(values.map((value) => value.map((date) => date.toString()))).toEqual([['2026-07-04']]);
});

test('exposes reactive state through useDateInputContext', async () => {
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

  await expect.element(page.getByRole('status')).toContainText('6/22/2026');
});

test('hydrates date-input without replacing server hosts or IDs and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrDateInput));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverParts.length).toBeGreaterThan(0);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const app = createSSRApp(SsrDateInput);
  try {
    app.mount(host);
    expect(host.querySelectorAll('[data-slot="date-input-root"]')).toHaveLength(1);
    expect(host.querySelectorAll('[data-slot="date-input-segment"]')).toHaveLength(5);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    await page.getByRole('spinbutton').nth(0).press('ArrowUp');
    await expect.element(page.locator('input[name="hydrated-date"]')).toHaveValue('7/22/2026');
  } finally {
    app.unmount();
    host.remove();
  }
});