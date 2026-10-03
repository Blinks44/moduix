import { parseDate } from '@ark-ui/vue/date-picker';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  DatePicker,
  DatePickerClearTrigger,
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

const datePickerComponents = {
  DatePicker,
  DatePickerClearTrigger,
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

test.each([false, true])(
  'keeps clear-trigger accessible names reactive (asChild=%s)',
  async (asChild) => {
    const label = ref('Clear initial date');
    const labelledby = ref<string | undefined>();
    render(
      defineComponent({
        components: datePickerComponents,
        setup: () => ({ asChild, label, labelledby, value: date('2026-06-22') }),
        template: `
      <DatePicker :default-value="[value]">
        <span id="clear-date-label">Clear labelled date</span>
        <DatePickerClearTrigger :as-child="asChild" :aria-label="label" :aria-labelledby="labelledby">
          <button v-if="asChild" type="button">Clear</button>
        </DatePickerClearTrigger>
      </DatePicker>
    `,
      }),
    );
    expect(screen.getByRole('button', { name: 'Clear initial date' })).toBeVisible();
    label.value = 'Clear updated date';
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Clear updated date' })).toBeVisible(),
    );
    labelledby.value = 'clear-date-label';
    await waitFor(() => {
      const clear = screen.getByRole('button', { name: 'Clear labelled date' });
      expect(clear).toHaveAttribute('aria-labelledby', 'clear-date-label');
    });
  },
);

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
  expect(monthSelect).toHaveClass('appearance-none');
  expect(monthSelect).toHaveClass(
    '[font-family:inherit]',
    '[font-size:var(--moduix-date-picker-select-font-size,var(--moduix-text-sm))]',
    '[line-height:var(--moduix-date-picker-select-line-height,var(--moduix-line-height-text-sm))]',
  );
  expect(monthSelect.querySelectorAll('option')).toHaveLength(12);
  expect(yearSelect.tagName).toBe('SELECT');
  expect(yearSelect).toHaveClass('appearance-none');
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
  expect(trigger.className).toBe('');
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

test('applies Tailwind defaults before consumer classes', () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template:
      '<DatePicker class="custom-root"><DatePickerLabel>Release date</DatePickerLabel><DatePickerField /></DatePicker>',
  });

  render(Harness);
  const root = screen
    .getByRole('textbox', { name: 'Release date' })
    .closest('[data-slot="date-picker-root"]');
  expect(root).toHaveClass('custom-root');
  expect(root).toHaveClass('group/date-picker');
});

const fixedPropTypes: Extract<
  | keyof InstanceType<typeof DatePickerField>['$props']
  | keyof InstanceType<typeof DatePickerRangeField>['$props']
  | keyof InstanceType<typeof DatePickerDayTable>['$props'],
  'asChild'
> extends never
  ? true
  : false = true;
const fixedSlotTypes: Extract<
  | keyof InstanceType<typeof DatePickerField>['$slots']
  | keyof InstanceType<typeof DatePickerRangeField>['$slots']
  | keyof InstanceType<typeof DatePickerDayTable>['$slots'],
  'default'
> extends never
  ? true
  : false = true;

test('excludes unsupported composition props and slots on fixed sugar', () => {
  expect(fixedPropTypes).toBe(true);
  expect(fixedSlotTypes).toBe(true);
});

test.each([
  { component: 'DatePickerField', count: 1 },
  { component: 'DatePickerRangeField', count: 2 },
])('preserves fixed $component anatomy when JavaScript passes asChild', ({ component, count }) => {
  render({
    components: datePickerComponents,
    template: `
      <DatePicker :default-value="[date]" :translations="translations">
        <DatePickerLabel>Fixed date</DatePickerLabel>
        <${component} :as-child="true" data-testid="fixed-control">
          <button>Ignored content</button>
        </${component}>
      </DatePicker>
    `,
    setup: () => ({ date: date('2026-06-22'), translations }),
  });
  expect(screen.getByTestId('fixed-control').tagName).toBe('DIV');
  expect(screen.getAllByRole('textbox')).toHaveLength(count);
  expect(screen.queryByText('Ignored content')).toBeNull();
  expect(screen.getByRole('button', { name: 'Clear localized date' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Open localized calendar' })).toBeVisible();
  expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('placeholder'))).toEqual(
    Array(count).fill('mm/dd/yyyy'),
  );
});

test('preserves the fixed day table despite unsupported JavaScript composition', async () => {
  render({
    components: datePickerComponents,
    template: `
      <DatePicker default-open :portalled="false">
        <DatePickerPositioner><DatePickerContent><DatePickerView view="day">
          <DatePickerDayTable :as-child="true" :show-header="false" show-week-numbers data-testid="fixed-table">
            <span>Ignored table content</span>
          </DatePickerDayTable>
        </DatePickerView></DatePickerContent></DatePickerPositioner>
      </DatePicker>
    `,
  });
  expect((await screen.findByTestId('fixed-table')).tagName).toBe('TABLE');
  expect(screen.getAllByRole('columnheader', { hidden: true })).toHaveLength(8);
  expect(screen.queryByText('Ignored table content')).toBeNull();
});

test.each(['DatePickerField', 'DatePickerRangeField'])(
  'keeps %s convenience props reactive and consumer overrides last',
  async (component) => {
    const placeholder = ref('Convenience placeholder');
    const clearLabel = ref('Convenience clear');
    const triggerLabel = ref('Convenience trigger');
    const overrides = ref(false);
    render(
      defineComponent({
        components: datePickerComponents,
        setup: () => ({
          placeholder,
          clearLabel,
          triggerLabel,
          overrides,
          date: date('2026-06-22'),
        }),
        template: `
        <DatePicker :default-value="[date]">
          <${component}
            :placeholder="placeholder" :start-placeholder="placeholder" :end-placeholder="placeholder"
            :clear-label="clearLabel" :trigger-label="triggerLabel"
            :input-props="overrides ? { placeholder: 'Override placeholder' } : undefined"
            :start-input-props="overrides ? { placeholder: 'Override placeholder', index: 1 } : undefined"
            :end-input-props="overrides ? { placeholder: 'Override placeholder', index: 0 } : undefined"
            :clear-trigger-props="overrides ? { 'aria-label': 'Override clear' } : undefined"
            :trigger-props="overrides ? { 'aria-label': 'Override trigger' } : undefined"
          />
        </DatePicker>
      `,
      }),
    );
    expect(screen.getByRole('button', { name: 'Convenience clear' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Convenience trigger' })).toBeVisible();
    placeholder.value = 'Updated placeholder';
    clearLabel.value = 'Updated clear';
    triggerLabel.value = 'Updated trigger';
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Updated clear' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Updated trigger' })).toBeVisible();
      for (const input of screen.getAllByRole('textbox'))
        expect(input).toHaveAttribute('placeholder', 'Updated placeholder');
    });
    overrides.value = true;
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Override clear' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Override trigger' })).toBeVisible();
      for (const input of screen.getAllByRole('textbox'))
        expect(input).toHaveAttribute('placeholder', 'Override placeholder');
    });
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('data-index'))).toEqual(
      component === 'DatePickerRangeField' ? ['0', '1'] : ['0'],
    );
  },
);