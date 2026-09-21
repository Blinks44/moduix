import { type DateValue } from '@ark-ui/solid/date-picker';
import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal, For } from 'solid-js';
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

test('keeps Field labels and placeholders owned by Ark localization', () => {
  render(() => (
    <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]} translations={translations}>
      <DatePickerLabel>Localized date</DatePickerLabel>
      <DatePickerField />
    </DatePicker>
  ));

  expect(screen.getByRole('textbox', { name: 'Localized date' })).toHaveAttribute(
    'placeholder',
    'mm/dd/yyyy',
  );
  expect(screen.getByRole('button', { name: 'Clear localized date' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Open localized calendar' })).toBeVisible();
});

test('preserves custom Field labels and native form values', () => {
  const { container } = render(() => (
    <form>
      <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
        <DatePickerLabel>Release date</DatePickerLabel>
        <DatePickerField
          clearLabel="Remove release date"
          placeholder="YYYY-MM-DD"
          triggerLabel="Choose release date"
        />
      </DatePicker>
    </form>
  ));

  expect(screen.getByRole('textbox', { name: 'Release date' })).toHaveAttribute(
    'placeholder',
    'YYYY-MM-DD',
  );
  expect(screen.getByRole('button', { name: 'Remove release date' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Choose release date' })).toBeVisible();
  expect(new FormData(container.querySelector('form')!).get('release-date')).toBe('06/22/2026');
});

test('keeps convenience-field input indexes and range form values Ark-shaped', () => {
  const { container } = render(() => (
    <form>
      <DatePicker
        selectionMode="range"
        defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
        name="travel-date"
      >
        <DatePickerLabel>Travel dates</DatePickerLabel>
        <DatePickerRangeField endInputProps={{ index: 0 }} startInputProps={{ index: 1 }} />
      </DatePicker>
    </form>
  ));

  const inputs = screen.getAllByRole('textbox');

  expect(inputs).toHaveLength(2);
  expect(inputs.map((input) => input.getAttribute('data-index'))).toEqual(['0', '1']);
  expect(inputs.map((input) => (input as HTMLInputElement).value)).toEqual([
    '06/22/2026',
    '06/26/2026',
  ]);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['travel-date', '06/22/2026'],
    ['travel-date', '06/26/2026'],
  ]);
});

test('keeps Field state on its editable input', () => {
  render(() => (
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
    </>
  ));

  const input = screen.getByRole('textbox', { name: 'Scheduled date' });

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('textbox', { name: 'Fieldset date' })).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('preserves portalling, root refs, and Ark open-change details', async () => {
  let rootRef!: HTMLDivElement;
  const openStates: boolean[] = [];
  const { container } = render(() => (
    <DatePicker
      ref={(element) => (rootRef = element)}
      onOpenChange={(details) => openStates.push(details.open)}
    >
      <DatePickerLabel>Published date</DatePickerLabel>
      <DatePickerField triggerLabel="Open date picker" />
      <DatePickerPopup />
    </DatePicker>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'date-picker-root');
  expect(screen.queryByTestId('date-picker-content')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: 'Open date picker' }));

  const content = await screen.findByTestId('date-picker-content');
  expect(container.contains(content)).toBe(false);
  expect(document.body).toContainElement(content);
  expect(openStates).toEqual([true]);

  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  const trigger = screen.getByRole('button', { name: 'Open date picker' });
  trigger.focus();
  fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
  await waitFor(() => expect(openStates).toEqual([true, false]));
});

test('keeps controlled root values and RootProvider state consumer-owned', async () => {
  function ControlledDatePicker() {
    const [value, setValue] = createSignal<DateValue[]>([new CalendarDate(2026, 6, 22)]);
    const datePicker = useDatePicker({
      defaultValue: [new CalendarDate(2026, 7, 1)],
      name: 'provider-date',
    });

    return (
      <>
        <DatePicker value={value()} onValueChange={(details) => setValue(details.value)}>
          <DatePickerLabel>Controlled date</DatePickerLabel>
          <DatePickerField />
          <DatePickerContext>
            {(datePicker) => (
              <output data-testid="controlled-date-value">
                {datePicker().value[0]?.toString()}
              </output>
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
        <button type="button" onClick={() => datePicker().clearValue()}>
          Clear provider date
        </button>
      </>
    );
  }

  render(() => <ControlledDatePicker />);

  expect(screen.getByRole('textbox', { name: 'Controlled date' })).toHaveValue('06/22/2026');
  expect(screen.getByRole('textbox', { name: 'Provider date' })).toHaveValue('07/01/2026');
  expect(screen.getByTestId('provider-date-picker')).toHaveAttribute(
    'data-slot',
    'date-picker-root-provider',
  );

  fireEvent.click(screen.getByRole('button', { name: 'Set controlled date' }));
  await waitFor(() => {
    expect(screen.getByRole('textbox', { name: 'Controlled date' })).toHaveValue('06/23/2026');
    expect(screen.getByTestId('controlled-date-value')).toHaveTextContent('2026-06-23');
  });

  fireEvent.click(screen.getByRole('button', { name: 'Clear provider date' }));
  await waitFor(() =>
    expect(screen.getByRole('textbox', { name: 'Provider date' })).toHaveValue(''),
  );
});

test('renders and selects years in a year-only picker', async () => {
  render(() => (
    <DatePicker
      defaultValue={[new CalendarDate(2026, 1, 1)]}
      defaultOpen
      defaultView="year"
      format={(date) => String(date.year)}
      minView="year"
      maxView="year"
    >
      <DatePickerLabel>Year</DatePickerLabel>
      <DatePickerField placeholder="yyyy" />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="year">
            <DatePickerContext>
              {(datePicker) => (
                <DatePickerTable columns={4}>
                  <DatePickerTableBody>
                    <For each={datePicker().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePickerTableRow>
                          <For each={years}>
                            {(year) => (
                              <DatePickerTableCell disabled={year.disabled} value={year.value}>
                                <DatePickerTableCellTrigger>
                                  {year.label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            )}
                          </For>
                        </DatePickerTableRow>
                      )}
                    </For>
                  </DatePickerTableBody>
                </DatePickerTable>
              )}
            </DatePickerContext>
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  ));

  const input = screen.getByRole('textbox', { name: 'Year' });
  expect(input).toHaveValue('2026');
  expect(screen.getByRole('button', { name: '2020' })).toBeVisible();

  const years = screen.getAllByRole('button', { name: /^\d{4}$/ });
  expect(years.length).toBeGreaterThan(0);

  fireEvent.click(years[0]);
  await waitFor(() => {
    expect(input).toHaveValue('2020');
  });
});

test('applies native utilities to the component-owned visual parts', () => {
  render(() => (
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
    </DatePicker>
  ));

  expect(document.querySelector('[data-slot="date-picker-root"]')).toHaveClass(
    'inline-flex',
    'w-75',
    'max-w-full',
    'flex-col',
    'gap-1',
  );
  expect(document.querySelector('[data-slot="date-picker-label"]')).toHaveClass(
    'text-sm',
    'font-medium',
    'text-foreground',
  );
  expect(screen.getByRole('textbox', { name: 'Release date' })).toHaveClass(
    'h-control-md',
    'rounded-md',
    'border-border',
    'bg-background',
    'ps-3.5',
    'pe-17',
  );
  expect(screen.getByRole('button', { name: 'Open calendar' })).toHaveClass(
    'absolute',
    'size-control-xs',
    'text-muted-foreground',
  );
  expect(document.querySelector('[data-slot="date-picker-content"]')).toHaveClass(
    'w-75',
    'rounded-md',
    'border-border',
    'bg-popover',
    'p-3',
  );
  expect(document.querySelector('[data-slot="date-picker-table-cell-trigger"]')).toHaveClass(
    'h-control-sm',
    'min-w-control-sm',
    'rounded-sm',
    'bg-transparent',
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(() => (
    <DatePicker class="w-full max-w-sm gap-4">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerControl class="w-80 gap-4">
        <DatePickerInput class="h-10 bg-muted ps-0 pe-0" />
      </DatePickerControl>
    </DatePicker>
  ));

  const root = container.querySelector('[data-slot="date-picker-root"]')!;
  const control = container.querySelector('[data-slot="date-picker-control"]')!;
  const input = screen.getByRole('textbox');

  expect(root).toHaveClass('w-full', 'max-w-sm', 'gap-4');
  expect(root).not.toHaveClass('w-75', 'max-w-full', 'gap-1');
  expect(control).toHaveClass('w-80', 'gap-4');
  expect(control).not.toHaveClass('w-full', 'gap-2');
  expect(input).toHaveClass('h-10', 'bg-muted', 'ps-0', 'pe-0');
  expect(input).not.toHaveClass('h-control-md', 'bg-background', 'ps-3.5', 'pe-17');
});
