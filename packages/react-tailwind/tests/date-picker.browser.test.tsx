import { type DateValue } from '@ark-ui/react/date-picker';
import { CalendarDate } from '@internationalized/date';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createElement, createRef, useState } from 'react';
import {
  DatePicker,
  Field,
  Fieldset,
  useDatePicker,
  DatePickerRootProvider,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerField,
  DatePickerRangeField,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerDayTable,
  DatePickerMonthSelect,
  DatePickerYearSelect,
} from '../src';

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

test('renders Ark month and year primitives as native selects', async () => {
  render(
    <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DatePickerMonthSelect aria-label="Month" />
      <DatePickerYearSelect aria-label="Year" />
    </DatePicker>,
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

function DatePickerPopup() {
  return (
    <DatePickerPositioner>
      <DatePickerContent data-testid="date-picker-content">
        <DatePickerView view="day">
          <DatePickerDayTable />
        </DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  );
}

test('keeps Field labels and placeholders owned by Ark localization', async () => {
  render(
    <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]} translations={translations}>
      <DatePickerLabel>Localized date</DatePickerLabel>
      <DatePickerField />
    </DatePicker>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Localized date', exact: true }))
    .toHaveAttribute('placeholder', 'mm/dd/yyyy');
  await expect
    .element(page.getByRole('button', { name: 'Clear localized date', exact: true }))
    .toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Open localized calendar', exact: true }))
    .toBeVisible();
});

test('preserves custom Field labels and native form values', async () => {
  const { container } = render(
    <form>
      <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
        <DatePickerLabel>Release date</DatePickerLabel>
        <DatePickerField
          clearLabel="Remove release date"
          placeholder="YYYY-MM-DD"
          triggerLabel="Choose release date"
        />
      </DatePicker>
    </form>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Release date', exact: true }))
    .toHaveAttribute('placeholder', 'YYYY-MM-DD');
  await expect
    .element(page.getByRole('button', { name: 'Remove release date', exact: true }))
    .toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Choose release date', exact: true }))
    .toBeVisible();
  expect(new FormData(container.querySelector('form')!).get('release-date')).toBe('06/22/2026');
});

test('keeps convenience-field input indexes and range form values Ark-shaped', async () => {
  const { container } = render(
    <form>
      <DatePicker
        selectionMode="range"
        defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
        name="travel-date"
      >
        <DatePickerLabel>Travel dates</DatePickerLabel>
        <DatePickerRangeField endInputProps={{ index: 0 }} startInputProps={{ index: 1 }} />
      </DatePicker>
    </form>,
  );

  const inputs = screen.getAllByRole('textbox');

  expect(inputs).toHaveLength(2);
  expect(inputs.map((input) => input.getAttribute('data-index'))).toEqual(['0', '1']);
  expect(inputs.map((input) => input.getAttribute('value'))).toEqual(['06/22/2026', '06/26/2026']);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['travel-date', '06/22/2026'],
    ['travel-date', '06/26/2026'],
  ]);
});

test('keeps Field state on its editable input', async () => {
  render(
    <>
      <Field disabled invalid readOnly>
        <DatePicker>
          <DatePickerLabel>Scheduled date</DatePickerLabel>
          <DatePickerField />
        </DatePicker>
      </Field>
      <Fieldset invalid>
        <DatePicker>
          <DatePickerLabel>Fieldset date</DatePickerLabel>
          <DatePickerField />
        </DatePicker>
      </Fieldset>
    </>,
  );

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

test('preserves portalling, root refs, and Ark open-change details', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const openStates: boolean[] = [];
  const { container } = render(
    <DatePicker ref={rootRef} onOpenChange={(details) => openStates.push(details.open)}>
      <DatePickerLabel>Published date</DatePickerLabel>
      <DatePickerField triggerLabel="Open date picker" />
      <DatePickerPopup />
    </DatePicker>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('date-picker-root');
  expect(screen.queryByTestId('date-picker-content')).toBeNull();

  await page.getByRole('button', { name: 'Open date picker', exact: true }).click();

  const content = await screen.findByTestId('date-picker-content');
  expect(container.contains(content)).toBe(false);
  expect(document.body!.contains(content)).toBe(true);
  expect(openStates).toEqual([true]);

  await page.getByTestId('date-picker-content').press('Escape');
  await expect.poll(() => openStates).toEqual([true, false]);
});

test('keeps controlled root values and RootProvider state consumer-owned', async () => {
  function ControlledDatePicker() {
    const [value, setValue] = useState<DateValue[]>([new CalendarDate(2026, 6, 22)]);
    const datePicker = useDatePicker({
      defaultValue: [new CalendarDate(2026, 7, 1)],
      name: 'provider-date',
    });

    return (
      <>
        <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
          <DatePickerLabel>Controlled date</DatePickerLabel>
          <DatePickerField />
          <DatePickerContext>
            {(datePicker) => (
              <output data-testid="controlled-date-value">{datePicker.value[0]?.toString()}</output>
            )}
          </DatePickerContext>
        </DatePicker>
        <button type="button" onClick={() => setValue([new CalendarDate(2026, 6, 23)])}>
          Set controlled date
        </button>
        <DatePickerRootProvider value={datePicker} data-testid="provider-date-picker">
          <DatePickerLabel>Provider date</DatePickerLabel>
          <DatePickerField />
        </DatePickerRootProvider>
        <button type="button" onClick={() => datePicker.clearValue()}>
          Clear provider date
        </button>
      </>
    );
  }

  render(<ControlledDatePicker />);

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
  render(
    <DatePicker
      defaultValue={[new CalendarDate(2026, 1, 1)]}
      defaultView="year"
      format={(date) => String(date.year)}
      minView="year"
      maxView="year"
    >
      <DatePickerLabel>Year</DatePickerLabel>
      <DatePickerField placeholder="yyyy" triggerLabel="Open years" />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="year">
            <DatePickerContext>
              {(datePicker) => (
                <DatePickerTable columns={4}>
                  <DatePickerTableBody>
                    {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                      <DatePickerTableRow key={rowIndex}>
                        {years.map((year) => (
                          <DatePickerTableCell
                            key={year.value}
                            disabled={year.disabled}
                            value={year.value}
                          >
                            <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                          </DatePickerTableCell>
                        ))}
                      </DatePickerTableRow>
                    ))}
                  </DatePickerTableBody>
                </DatePickerTable>
              )}
            </DatePickerContext>
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Year', exact: true }))
    .toHaveValue('2026');
  await page.getByRole('button', { name: 'Open years', exact: true }).click();
  await expect.element(page.getByRole('button', { name: '2020', exact: true })).toBeVisible();
  await expect.element(page.getByRole('button', { name: '2026', exact: true })).toBeFocused();

  const years = screen.getAllByRole('button', { name: /^\d{4}$/ });
  expect(years.length).toBeGreaterThan(0);

  await page
    .getByRole('button', { name: /^\d{4}$/, exact: true })
    .nth(0)
    .click();
  await expect
    .element(page.getByRole('textbox', { name: 'Year', exact: true }))
    .toHaveValue('2020');
});

test('applies native utilities to the component-owned visual parts', async () => {
  render(
    <DatePicker defaultOpen defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput />
        <DatePickerClearTrigger aria-label="Clear date" />
        <DatePickerTrigger aria-label="Open calendar" />
      </DatePickerControl>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <DatePickerDayTable />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>,
  );
  await expect
    .element(page.locator('[data-slot="date-picker-root"]').nth(0))
    .toHaveCSS('display', 'inline-flex');
  await expect
    .element(page.locator('[data-slot="date-picker-root"]').nth(0))
    .toHaveCSS('width', '300px');
  await expect
    .element(page.locator('[data-slot="date-picker-root"]').nth(0))
    .toHaveCSS('gap', '4px');
  await expect
    .element(page.locator('[data-slot="date-picker-label"]').nth(0))
    .toHaveCSS('font-size', '14px');
  await expect
    .element(page.locator('[data-slot="date-picker-input"]').nth(0))
    .toHaveCSS('height', '36px');
  await expect
    .element(page.locator('[data-slot="date-picker-input"]').nth(0))
    .toHaveCSS('padding-inline-start', '14px');
  await expect
    .element(page.locator('[data-slot="date-picker-input"]').nth(0))
    .toHaveCSS('padding-inline-end', '68px');
  await expect
    .element(page.locator('[data-slot="date-picker-trigger"]').nth(0))
    .toHaveCSS('position', 'absolute');
  await expect
    .element(page.locator('[data-slot="date-picker-trigger"]').nth(0))
    .toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="date-picker-content"]').nth(0))
    .toHaveCSS('width', '320px');
  await expect
    .element(page.locator('[data-slot="date-picker-content"]').nth(0))
    .toHaveCSS('border-left-width', '1px');
  await expect
    .element(page.locator('[data-slot="date-picker-content"]').nth(0))
    .toHaveCSS('padding-left', '12px');
  await expect
    .element(page.locator('[data-slot="date-picker-table-cell-trigger"]').nth(0))
    .toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="date-picker-table-cell-trigger"]').nth(0))
    .toHaveCSS('min-width', '32px');
});

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(
    <DatePicker className="w-full max-w-sm gap-4">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerControl className="w-80 gap-4">
        <DatePickerInput className="h-10 bg-muted ps-0 pe-0" />
      </DatePickerControl>
    </DatePicker>,
  );

  const root = container.querySelector('[data-slot="date-picker-root"]')!;
  const control = container.querySelector('[data-slot="date-picker-control"]')!;
  const input = screen.getByRole('textbox');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'max-w-sm', 'gap-4']));
  expect(['w-75', 'max-w-full', 'gap-1'].some((name) => root!.classList.contains(name))).toBe(
    false,
  );
  expect([...control!.classList]).toEqual(expect.arrayContaining(['w-80', 'gap-4']));
  expect(['w-full', 'gap-2'].some((name) => control!.classList.contains(name))).toBe(false);
  expect([...input!.classList]).toEqual(
    expect.arrayContaining(['h-10', 'bg-muted', 'ps-0', 'pe-0']),
  );
  expect(
    ['h-control-md', 'bg-background', 'ps-3.5', 'pe-17'].some((name) =>
      input!.classList.contains(name),
    ),
  ).toBe(false);
});

test.each([
  { name: 'single', Control: DatePickerField, inputs: 1 },
  { name: 'range', Control: DatePickerRangeField, inputs: 2 },
])(
  'preserves $name control anatomy with unsupported JS composition props',
  async ({ name, Control, inputs }) => {
    render(
      <DatePicker selectionMode={name === 'range' ? 'range' : 'single'}>
        <DatePickerLabel>Fixed date control</DatePickerLabel>
        {createElement(Control, {
          asChild: true,
          children: <div>Unsupported child</div>,
          'data-testid': 'fixed-control',
        } as never)}
      </DatePicker>,
    );
    expect(screen.getByTestId('fixed-control').tagName).toBe('DIV');
    expect(screen.getAllByRole('textbox')).toHaveLength(inputs);
    await expect.element(page.getByText('Unsupported child')).toHaveCount(0);
  },
);

test('preserves day-table anatomy with unsupported JS composition props', async () => {
  render(
    <DatePicker defaultOpen portalled={false}>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            {createElement(DatePickerDayTable, {
              asChild: true,
              children: <div>Unsupported table child</div>,
              showHeader: false,
              showWeekNumbers: true,
              'data-testid': 'fixed-table',
            } as never)}
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>,
  );
  expect((await screen.findByTestId('fixed-table')).tagName).toBe('TABLE');
  expect(screen.getAllByRole('columnheader', { hidden: true })).toHaveLength(8);
  await expect.element(page.getByText('Unsupported table child')).toHaveCount(0);
});

test('lets nested field props override convenience placeholders and labels', async () => {
  render(
    <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DatePickerLabel>Override date</DatePickerLabel>
      <DatePickerField
        placeholder="Outer placeholder"
        inputProps={{ placeholder: 'Inner placeholder' }}
        clearLabel="Outer clear"
        clearTriggerProps={{ 'aria-label': 'Inner clear' }}
        triggerLabel="Outer open"
        triggerProps={{ 'aria-label': 'Inner open' }}
      />
    </DatePicker>,
  );
  await expect
    .element(page.getByRole('textbox', { name: 'Override date', exact: true }))
    .toHaveAttribute('placeholder', 'Inner placeholder');
  await expect
    .element(page.getByRole('button', { name: 'Inner clear', exact: true }))
    .toBeVisible();
  await expect.element(page.getByRole('button', { name: 'Inner open', exact: true })).toBeVisible();
});

test.each([false, true])('preserves a labelled clear trigger with asChild=%s', async (asChild) => {
  render(
    <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DatePickerLabel>Clearable date</DatePickerLabel>
      <DatePickerField />
      <span id="clear-date-label">Reset labelled date</span>
      <DatePickerClearTrigger asChild={asChild} aria-labelledby="clear-date-label">
        {asChild ? <button type="button">Custom clear</button> : undefined}
      </DatePickerClearTrigger>
    </DatePicker>,
  );
  await page.getByRole('button', { name: 'Reset labelled date', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'Clearable date', exact: true }))
    .toHaveValue('');
});