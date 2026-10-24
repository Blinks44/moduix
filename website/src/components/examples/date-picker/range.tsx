import { parseDate } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerRangeField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/react/date-picker';

export default function RangeDatePickerDemo() {
  return (
    <DatePicker
      selectionMode="range"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}
    >
      <DatePickerLabel>Travel dates</DatePickerLabel>
      <DatePickerRangeField />
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
  );
}