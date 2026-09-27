import { parseDate } from '@ark-ui/vue/date-picker';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  DatePicker,
  DatePickerContext,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerRangeField,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerYearSelect,
  Field,
  Fieldset,
  useDatePicker,
} from '../src';
import styles from '../src/components/date-picker/DatePicker.module.css';

const datePickerComponents = {
  DatePicker,
  DatePickerContext,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerRangeField,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerYearSelect,
  Field,
  Fieldset,
};

const translations = {
  clearTrigger: 'Clear localized date',
  content: 'Calendar',
  dayCell: () => 'Date',
  monthSelect: 'Month',
  nextTrigger: () => 'Next',
  placeholder: () => ({ day: 'dd', month: 'mm', year: 'yyyy' }),
  presetTrigger: () => 'Preset',
  prevTrigger: () => 'Previous',
  trigger: (open: boolean) => (open ? 'Close localized calendar' : 'Open localized calendar'),
  viewTrigger: () => 'Change view',
  yearSelect: 'Year',
};

const date = (value: string) => parseDate(value);

test('renders Ark month and year primitives as native selects', () => {
  render(
    defineComponent({
      components: datePickerComponents,
      template: `
        <DatePicker :default-value="[date]">
          <DatePickerMonthSelect aria-label="Month" />
          <DatePickerYearSelect aria-label="Year" />
        </DatePicker>
      `,
      setup: () => ({ date: date('2026-06-22') }),
    }),
  );

  const monthSelect = screen.getByRole('combobox', { name: 'Month' });
  const yearSelect = screen.getByRole('combobox', { name: 'Year' });

  expect(monthSelect.tagName).toBe('SELECT');
  expect(monthSelect.querySelectorAll('option')).toHaveLength(12);
  expect(yearSelect.tagName).toBe('SELECT');
  expect(yearSelect.querySelector('option[value="2026"]')).not.toBeNull();
});

const DatePickerPopup = defineComponent({
  components: datePickerComponents,
  template: `
    <DatePickerPositioner>
      <DatePickerContent data-testid="date-picker-content">
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  `,
});

test('keeps Ark localization and convenience field labels', () => {
  render(
    defineComponent({
      components: datePickerComponents,
      template: `
        <DatePicker :default-value="[date]" :translations="translations">
          <DatePickerLabel>Localized date</DatePickerLabel>
          <DatePickerField clear-label="Remove date" trigger-label="Open date picker" />
        </DatePicker>
      `,
      setup: () => ({ date: date('2026-06-22'), translations }),
    }),
  );

  expect(screen.getByRole('textbox', { name: 'Localized date' })).toHaveAttribute(
    'placeholder',
    'mm/dd/yyyy',
  );
  expect(screen.getByRole('button', { name: 'Remove date' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Open date picker' })).toBeVisible();
});

test('preserves native form values and range input indexes', () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    setup: () => ({ start: date('2026-06-22'), end: date('2026-06-26') }),
    template: `
      <form>
        <DatePicker
          name="travel-date"
          selection-mode="range"
          :default-value="[start, end]"
        >
          <DatePickerLabel>Travel dates</DatePickerLabel>
          <DatePickerRangeField
            :start-input-props="{ index: 1 }"
            :end-input-props="{ index: 0 }"
          />
        </DatePicker>
      </form>
    `,
  });

  const { container } = render(Harness);
  const inputs = screen.getAllByRole('textbox');
  expect(inputs).toHaveLength(2);
  expect(inputs.map((input) => input.getAttribute('data-index'))).toEqual(['0', '1']);
  expect(inputs.map((input) => input.getAttribute('value'))).toEqual(['06/22/2026', '06/26/2026']);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['travel-date', '06/22/2026'],
    ['travel-date', '06/26/2026'],
  ]);
});

test('applies date range presets through the Ark trigger', async () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template: `
      <DatePicker selection-mode="range" default-open>
        <DatePickerRangeField />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePicker>
    `,
  });

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: /select/ }));

  await waitFor(() => {
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('value'))).toEqual([
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
    ]);
  });
});

test('inherits Field and Fieldset state on the editable input', () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template: `
      <Field disabled invalid read-only>
        <DatePicker><DatePickerLabel>Scheduled date</DatePickerLabel><DatePickerField /></DatePicker>
      </Field>
      <Fieldset invalid>
        <DatePicker><DatePickerLabel>Fieldset date</DatePickerLabel><DatePickerField /></DatePicker>
      </Fieldset>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Scheduled date' });
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('textbox', { name: 'Fieldset date' })).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('preserves portalling, root refs, and open-change details', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const openStates: boolean[] = [];
  const Harness = defineComponent({
    components: { ...datePickerComponents, DatePickerPopup },
    setup: () => ({ rootRef, openStates }),
    template: `
      <DatePicker
        ref="rootRef"
        @open-change="openStates.push($event.open)"
      >
        <DatePickerLabel>Published date</DatePickerLabel>
        <DatePickerField trigger-label="Open date picker" />
        <DatePickerPopup />
      </DatePicker>
    `,
  });

  const { container } = render(Harness);
  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'date-picker-root');
  expect(screen.queryByTestId('date-picker-content')).toBeNull();

  await fireEvent.click(screen.getByRole('button', { name: 'Open date picker' }));
  const content = await screen.findByTestId('date-picker-content');
  expect(container.contains(content)).toBe(false);
  expect(document.body).toContainElement(content);
  expect(openStates).toEqual([true]);

  await fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(openStates).toEqual([true, false]));
});

test('keeps controlled values, context, and RootProvider state consumer-owned', async () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    setup() {
      const value = ref([date('2026-06-22')]);
      const datePicker = useDatePicker({
        defaultValue: [date('2026-07-01')],
        name: 'provider-date',
      });
      return { datePicker, setValue: () => (value.value = [date('2026-06-23')]), value };
    },
    template: `
      <DatePicker v-model="value">
        <DatePickerLabel>Controlled date</DatePickerLabel>
        <DatePickerField />
        <DatePickerContext v-slot="context"><output data-testid="controlled-date-value">{{ context.value[0]?.toString() }}</output></DatePickerContext>
      </DatePicker>
      <button type="button" @click="setValue">Set controlled date</button>
      <DatePickerRootProvider :value="datePicker" data-testid="provider-date-picker">
        <DatePickerLabel>Provider date</DatePickerLabel><DatePickerField />
      </DatePickerRootProvider>
      <button type="button" @click="datePicker.clearValue()">Clear provider date</button>
    `,
  });

  render(Harness);
  expect(screen.getByRole('textbox', { name: 'Controlled date' })).toHaveValue('06/22/2026');
  expect(screen.getByRole('textbox', { name: 'Provider date' })).toHaveValue('07/01/2026');
  expect(screen.getByTestId('provider-date-picker')).toHaveAttribute(
    'data-slot',
    'date-picker-root-provider',
  );

  await fireEvent.click(screen.getByRole('button', { name: 'Set controlled date' }));
  await waitFor(() => {
    expect(screen.getByRole('textbox', { name: 'Controlled date' })).toHaveValue('06/23/2026');
    expect(screen.getByTestId('controlled-date-value')).toHaveTextContent('2026-06-23');
  });

  await fireEvent.click(screen.getByRole('button', { name: 'Clear provider date' }));
  await waitFor(() =>
    expect(screen.getByRole('textbox', { name: 'Provider date' })).toHaveValue(''),
  );
});

test('renders and selects years in a year-only picker', async () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    setup: () => ({ date: date('2026-01-01') }),
    template: `
      <DatePicker
        :default-value="[date]"
        default-open
        default-view="year"
        :format="(value) => String(value.year)"
        min-view="year"
        max-view="year"
      >
        <DatePickerLabel>Year</DatePickerLabel>
        <DatePickerField placeholder="yyyy" />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="year">
              <DatePickerContext v-slot="datePicker">
                <DatePickerTable :columns="4">
                  <DatePickerTableBody>
                    <DatePickerTableRow
                      v-for="(years, rowIndex) in datePicker.getYearsGrid({ columns: 4 })"
                      :key="rowIndex"
                    >
                      <DatePickerTableCell
                        v-for="year in years"
                        :key="year.value"
                        :disabled="year.disabled"
                        :value="year.value"
                      >
                        <DatePickerTableCellTrigger>{{ year.label }}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    </DatePickerTableRow>
                  </DatePickerTableBody>
                </DatePickerTable>
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePicker>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Year' });
  expect(input).toHaveValue('2026');
  expect(screen.getByRole('button', { name: '2020' })).toBeVisible();

  const years = screen.getAllByRole('button', { name: /^\d{4}$/ });
  expect(years.length).toBeGreaterThan(0);

  await fireEvent.click(years[0]);
  await waitFor(() => {
    expect(input).toHaveValue('2020');
  });
});

test('preserves semantic hosts and refs through Ark asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: datePickerComponents,
    setup: () => ({ rootRef }),
    template: `
      <DatePicker ref="rootRef" as-child :default-value="[date]">
        <section aria-label="Date picker"><DatePickerLabel>Release date</DatePickerLabel><DatePickerField /></section>
      </DatePicker>
    `,
    data: () => ({ date: date('2026-06-22') }),
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Date picker' });
  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'date-picker-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('composes styled trigger parts through asChild', () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template:
      '<DatePicker><DatePickerTrigger as-child><button type="button">Open calendar</button></DatePickerTrigger></DatePicker>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open calendar' });
  expect(trigger).toHaveAttribute('data-slot', 'date-picker-trigger');
  expect(trigger).not.toHaveClass(styles.trigger);
});

test('renders a stable public anatomy through SSR and hydration', async () => {
  const App = defineComponent({
    components: datePickerComponents,
    setup: () => ({ date: date('2026-06-22') }),
    template: `
      <DatePicker :default-value="[date]">
        <DatePickerLabel>Release date</DatePickerLabel><DatePickerField />
      </DatePicker>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="date-picker-root"');
  expect(html).toContain('data-slot="date-picker-input"');

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