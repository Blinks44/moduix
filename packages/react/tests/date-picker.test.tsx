import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DatePicker } from '../src';

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

test('keeps Field labels and placeholders owned by Ark localization', () => {
  render(
    <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]} translations={translations}>
      <DatePicker.Label>Localized date</DatePicker.Label>
      <DatePicker.Field />
    </DatePicker>,
  );

  expect(screen.getByRole('textbox', { name: 'Localized date' })).toHaveAttribute(
    'placeholder',
    'mm/dd/yyyy',
  );
  expect(screen.getByRole('button', { name: 'Clear localized date' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Open localized calendar' })).toBeVisible();
});

test('preserves custom Field labels and native form values', () => {
  const { container } = render(
    <form>
      <DatePicker defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
        <DatePicker.Label>Release date</DatePicker.Label>
        <DatePicker.Field
          clearLabel="Remove release date"
          placeholder="YYYY-MM-DD"
          triggerLabel="Choose release date"
        />
      </DatePicker>
    </form>,
  );

  expect(screen.getByRole('textbox', { name: 'Release date' })).toHaveAttribute(
    'placeholder',
    'YYYY-MM-DD',
  );
  expect(screen.getByRole('button', { name: 'Remove release date' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Choose release date' })).toBeVisible();
  expect(new FormData(container.querySelector('form')!).get('release-date')).toBe('06/22/2026');
});

test('renders and selects years in a year-only picker', async () => {
  render(
    <DatePicker
      defaultValue={[new CalendarDate(2026, 1, 1)]}
      defaultOpen
      defaultView="year"
      format={(date) => String(date.year)}
      minView="year"
      maxView="year"
    >
      <DatePicker.Label>Year</DatePicker.Label>
      <DatePicker.Field placeholder="yyyy" />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="year">
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table columns={4}>
                  <DatePicker.TableBody>
                    {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                      <DatePicker.TableRow key={rowIndex}>
                        {years.map((year) => (
                          <DatePicker.TableCell
                            key={year.value}
                            disabled={year.disabled}
                            value={year.value}
                          >
                            <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>,
  );

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