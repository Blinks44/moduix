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

export default function DatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePickerLabel>Release date</DatePickerLabel>
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
  );
}