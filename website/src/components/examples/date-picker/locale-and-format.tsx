import { parseDate } from '@ark-ui/react/date-picker';
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
} from '@moduix/react/date-picker';

export default function LocaleDatePickerDemo() {
  return (
    <DatePicker locale="de-DE" startOfWeek={1} defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>German locale</DatePickerLabel>
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