import { type DateValue } from '@ark-ui/solid/date-picker';
import { CalendarDate } from '@internationalized/date';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerYearTable,
} from '@moduix/solid/date-picker';

const format = (date: DateValue) => String(date.year);

export default function YearPickerDemo() {
  return (
    <DatePicker
      defaultValue={[new CalendarDate(2026, 1, 1)]}
      defaultView="year"
      minView="year"
      maxView="year"
      format={format}
    >
      <DatePickerLabel>Year</DatePickerLabel>
      <DatePickerField placeholder="yyyy" clearLabel="Clear year" />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="year">
            <DatePickerYearTable />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}