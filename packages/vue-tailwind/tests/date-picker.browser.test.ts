import { parseDate } from '@ark-ui/vue/date-picker';
import { page } from '@rstest/browser';
import { afterEach, expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref, shallowRef } from 'vue';
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
  DatePickerValueText,
  DatePickerYearSelect,
  Field,
  Fieldset,
  useDatePicker,
} from '../src';
import SsrDatePicker from './fixtures/SsrDatePicker.vue';

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
  DatePickerValueText,
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

afterEach(() => {
  rs.restoreAllMocks();
});

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
    await expect
      .element(page.getByRole('button', { name: 'Clear initial date', exact: true }))
      .toBeVisible();
    label.value = 'Clear updated date';
    await expect
      .element(page.getByRole('button', { name: 'Clear updated date', exact: true }))
      .toBeVisible();
    labelledby.value = 'clear-date-label';
    await expect
      .element(page.getByRole('button', { name: 'Clear labelled date', exact: true }))
      .toBeAttached();

    await expect
      .element(page.getByRole('button', { name: 'Clear labelled date', exact: true }))
      .toHaveAttribute('aria-labelledby', 'clear-date-label');
  },
);

test.each(['DatePickerMonthSelect', 'DatePickerYearSelect'])(
  'preserves reactive native select attributes and ref for %s',
  async (component) => {
    const multiple = ref(false);
    const size = ref<string | number>();
    const selectRef = ref<ComponentPublicInstance>();
    render({
      components: datePickerComponents,
      setup: () => ({ multiple, size, selectRef, date: date('2026-06-22') }),
      template: `
        <DatePicker :default-value="[date]">
          <${component} ref="selectRef" :multiple="multiple" :size="size"
            class="consumer-select" style="color: red" aria-label="Date navigation"
            name="navigation" data-testid="navigation-select" />
        </DatePicker>
      `,
    });
    const select = screen.getByTestId('navigation-select');
    expect(select.tagName).toBe('SELECT');
    expect(selectRef.value?.$el).toBe(select);
    await expect
      .element(page.getByTestId('navigation-select'))
      .toHaveAttribute('name', 'navigation');
    expect(select!.classList.contains('consumer-select')).toBe(true);
    await expect
      .element(page.getByTestId('navigation-select'))
      .toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('multiple');
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('size');
    multiple.value = true;
    await expect.element(page.getByTestId('navigation-select')).toHaveAttribute('multiple');
    await expect
      .poll(() => [...select!.classList])
      .toEqual(expect.arrayContaining(['h-auto', 'appearance-auto']));
    await expect
      .poll(() => [...select.nextElementSibling!.classList])
      .toEqual(expect.arrayContaining(['hidden']));
    size.value = '4';
    multiple.value = false;
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('multiple');
    await expect.element(page.getByTestId('navigation-select')).toHaveAttribute('size', '4');
    await expect
      .poll(() => [...select!.classList])
      .toEqual(expect.arrayContaining(['h-auto', 'appearance-auto']));
    await expect
      .poll(() => [...select.nextElementSibling!.classList])
      .toEqual(expect.arrayContaining(['hidden']));
    size.value = 1;
    await expect.element(page.getByTestId('navigation-select')).toHaveAttribute('size', '1');
    await expect.poll(() => select!.classList.contains('h-auto')).toBe(false);
    await expect.poll(() => select.nextElementSibling!.classList.contains('hidden')).toBe(false);
    size.value = undefined;
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('size');
    expect(screen.getByRole('combobox', { name: 'Date navigation' })).toBe(select);
    expect(selectRef.value?.$el).toBe(select);
    expect(select.querySelectorAll('option').length).toBeGreaterThan(0);
  },
);

test('preserves default value text and reactive scoped-slot rendering', async () => {
  const warn = rs.spyOn(console, 'warn');
  const custom = ref(false);
  const value = shallowRef([date('2026-06-22'), date('2026-06-26')]);
  render({
    components: datePickerComponents,
    setup: () => ({ custom, value }),
    template: `
      <DatePicker v-model="value" selection-mode="multiple">
        <DatePickerValueText placeholder="Pick a date" separator=" | ">
          <template v-if="custom" #default="entry">
            <button type="button" @click="entry.remove()">
              Remove {{ entry.index }}: {{ entry.valueAsString }} (day {{ entry.value.day }})
            </button>
          </template>
        </DatePickerValueText>
      </DatePicker>
    `,
  });
  const defaultText = screen.getByText('06/22/2026 | 06/26/2026');
  expect(defaultText.tagName).toBe('SPAN');
  await expect
    .element(page.getByText('06/22/2026 | 06/26/2026'))
    .toHaveAttribute('data-slot', 'date-picker-value-text');
  custom.value = true;

  await page.getByRole('button', { name: 'Remove 0: 06/22/2026 (day 22)', exact: true }).click();
  await expect.poll(() => value.value).toHaveLength(1);
  await expect
    .element(page.getByRole('button', { name: 'Remove 0: 06/26/2026 (day 26)', exact: true }))
    .toBeVisible();
  custom.value = false;
  expect((await screen.findByText('06/26/2026')).tagName).toBe('SPAN');
  value.value = [];
  await expect.element(page.getByText('Pick a date')).toBeAttached();
  custom.value = true;
  await expect.element(page.getByText('Pick a date')).toBeAttached();
  await expect.poll(() => screen.queryByRole('button', { name: /^Remove/ })).toBeNull();
  expect(warn).not.toHaveBeenCalled();
});

test('renders Ark month and year primitives as native selects', async () => {
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
  expect(monthSelect!.classList.contains('appearance-none')).toBe(true);
  expect([...monthSelect!.classList]).toEqual(
    expect.arrayContaining([
      '[font-family:inherit]',
      '[font-size:var(--moduix-date-picker-select-font-size,var(--moduix-text-sm))]',
      '[line-height:var(--moduix-date-picker-select-line-height,var(--moduix-line-height-text-sm))]',
    ]),
  );
  expect(monthSelect.querySelectorAll('option')).toHaveLength(12);
  expect(yearSelect.tagName).toBe('SELECT');
  expect(yearSelect!.classList.contains('appearance-none')).toBe(true);
  expect(yearSelect.querySelector('option[value="2026"]')).not.toBeNull();
});

test('keeps Ark localization and convenience field labels', async () => {
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

  await expect
    .element(page.getByRole('textbox', { name: 'Localized date', exact: true }))
    .toHaveAttribute('placeholder', 'mm/dd/yyyy');
  await expect
    .element(page.getByRole('button', { name: 'Remove date', exact: true }))
    .toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Open date picker', exact: true }))
    .toBeVisible();
});

test('preserves native form values and range input indexes', async () => {
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
  await page.getByRole('button', { name: /select/, exact: true }).click();

  await expect
    .poll(() => screen.getAllByRole('textbox').map((input) => input.getAttribute('value')))
    .toEqual([
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
    ]);
});

test('inherits Field and Fieldset state on the editable input', async () => {
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

  await expect
    .element(page.getByRole('textbox', { name: 'Scheduled date', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('textbox', { name: 'Scheduled date', exact: true }))
    .toHaveAttribute('readonly');
  await expect
    .element(page.getByRole('textbox', { name: 'Scheduled date', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByRole('textbox', { name: 'Fieldset date', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
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
  expect(rootRef.value!.$el.getAttribute('data-slot')).toBe('date-picker-root');
  expect(screen.queryByTestId('date-picker-content')).toBeNull();

  await page.getByRole('button', { name: 'Open date picker', exact: true }).click();
  const content = await screen.findByTestId('date-picker-content');
  expect(container.contains(content)).toBe(false);
  expect(document.body!.contains(content)).toBe(true);
  expect(openStates).toEqual([true]);

  await page.getByTestId('date-picker-content').press('Escape');
  await expect.poll(() => openStates).toEqual([true, false]);
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
  await expect
    .element(page.getByRole('textbox', { name: 'Controlled date', exact: true }))
    .toHaveValue('06/22/2026');
  await expect
    .element(page.getByRole('textbox', { name: 'Provider date', exact: true }))
    .toHaveValue('07/01/2026');
  await expect
    .element(page.getByTestId('provider-date-picker'))
    .toHaveAttribute('data-slot', 'date-picker-root-provider');

  await page.getByRole('button', { name: 'Set controlled date', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'Controlled date', exact: true }))
    .toHaveValue('06/23/2026');
  await expect.element(page.getByTestId('controlled-date-value')).toContainText('2026-06-23');

  await page.getByRole('button', { name: 'Clear provider date', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'Provider date', exact: true }))
    .toHaveValue('');
});

test('renders and selects years in a year-only picker', async () => {
  const onValueChange = rs.fn();
  const Harness = defineComponent({
    components: datePickerComponents,
    setup: () => ({
      date: date('2026-01-01'),
      format: (value: { year: number }) => String(value.year),
      onValueChange,
    }),
    template: `
      <DatePicker
        id="year-picker"
        :default-value="[date]"
        default-view="year"
        :format="format"
        min-view="year"
        max-view="year"
        @value-change="onValueChange"
      >
        <DatePickerLabel>Year</DatePickerLabel>
        <DatePickerField placeholder="yyyy" trigger-label="Open years" />
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

  await expect
    .element(page.getByRole('textbox', { name: 'Year', exact: true }))
    .toHaveValue('2026');
  await page.getByRole('button', { name: 'Open years', exact: true }).click();
  await expect.element(page.getByRole('button', { name: '2020', exact: true })).toBeVisible();
  await expect.element(page.getByRole('button', { name: '2026', exact: true })).toBeFocused();

  await page.getByRole('button', { name: '2020', exact: true }).click();
  await expect
    .poll(() => onValueChange)
    .toHaveBeenCalledWith(expect.objectContaining({ valueAsString: ['2020'] }));
  await expect
    .element(page.getByRole('textbox', { name: 'Year', exact: true }))
    .toHaveValue('2020');
});

test('preserves semantic hosts and refs through Ark asChild', async () => {
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
  await expect
    .element(page.getByRole('region', { name: 'Date picker', exact: true }))
    .toHaveAttribute('data-slot', 'date-picker-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('composes styled trigger parts through asChild', async () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template:
      '<DatePicker><DatePickerTrigger as-child><button type="button">Open calendar</button></DatePickerTrigger></DatePicker>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open calendar' });
  await expect
    .element(page.getByRole('button', { name: 'Open calendar', exact: true }))
    .toHaveAttribute('data-slot', 'date-picker-trigger');
  expect(trigger.className).toBe('');
});

test('hydrates date-picker without replacing server hosts or IDs and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrDatePicker));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverParts.length).toBeGreaterThan(0);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const app = createSSRApp(SsrDatePicker);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    expect(
      host.querySelector('[data-slot="date-picker-month-select"]')?.querySelectorAll('option'),
    ).toHaveLength(12);
    await expect
      .element(page.locator('[data-slot="date-picker-value-text"]'))
      .toContainText('06/22/2026');
    await page.locator('[data-slot="date-picker-clear-trigger"]').click();
    await expect
      .element(page.getByRole('textbox', { name: 'Release date', exact: true }))
      .toHaveValue('');
  } finally {
    app.unmount();
    host.remove();
  }
});

test('applies Tailwind defaults before consumer classes', async () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template:
      '<DatePicker class="custom-root"><DatePickerLabel>Release date</DatePickerLabel><DatePickerField /></DatePicker>',
  });

  render(Harness);
  const root = screen
    .getByRole('textbox', { name: 'Release date' })
    .closest('[data-slot="date-picker-root"]');
  expect(root!.classList.contains('custom-root')).toBe(true);
  expect(root!.classList.contains('group/date-picker')).toBe(true);
});

test.each([
  { component: 'DatePickerField', count: 1 },
  { component: 'DatePickerRangeField', count: 2 },
])(
  'preserves fixed $component anatomy when JavaScript passes asChild',
  async ({ component, count }) => {
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
    await expect
      .element(page.getByRole('button', { name: 'Clear localized date', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Open localized calendar', exact: true }))
      .toBeVisible();
    expect(
      screen.getAllByRole('textbox').map((input) => input.getAttribute('placeholder')),
    ).toEqual(Array(count).fill('mm/dd/yyyy'));
  },
);

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
    await expect
      .element(page.getByRole('button', { name: 'Convenience clear', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Convenience trigger', exact: true }))
      .toBeVisible();
    placeholder.value = 'Updated placeholder';
    clearLabel.value = 'Updated clear';
    triggerLabel.value = 'Updated trigger';
    await expect
      .element(page.getByRole('button', { name: 'Updated clear', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Updated trigger', exact: true }))
      .toBeVisible();
    for (const input of screen.getAllByRole('textbox'))
      await expect.poll(() => input!.getAttribute('placeholder')).toBe('Updated placeholder');
    overrides.value = true;
    await expect
      .element(page.getByRole('button', { name: 'Override clear', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Override trigger', exact: true }))
      .toBeVisible();
    for (const input of screen.getAllByRole('textbox'))
      await expect.poll(() => input!.getAttribute('placeholder')).toBe('Override placeholder');
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('data-index'))).toEqual(
      component === 'DatePickerRangeField' ? ['0', '1'] : ['0'],
    );
  },
);