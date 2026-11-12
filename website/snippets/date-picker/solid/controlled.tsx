import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/solid/date-picker';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function ControlledDatePickerDemo() {
  const [value, setValue] = createSignal([parseDate('2026-06-22')]);

  return (
    <Stack align="center">
      <DatePicker value={value()} onValueChange={(details) => setValue(details.value)}>
        <DatePickerLabel>Controlled date</DatePickerLabel>
        <DatePickerField />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerDayTable />
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerMonthTable />
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerYearTable />
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePicker>
      <div data-preview-meta>
        <output>Current value: {value()[0]?.toString() ?? 'empty'}</output>
      </div>
    </Stack>
  );
}