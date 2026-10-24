import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/solid/date-picker';

export default function InlineDatePickerDemo() {
  return (
    <DatePicker
      inline
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      showWeekNumbers
    >
      <DatePickerLabel>Available days</DatePickerLabel>
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
    </DatePicker>
  );
}