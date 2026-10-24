import { type DateValue } from '@ark-ui/react/date-picker';
import { CalendarDate } from '@internationalized/date';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerMonthTable,
} from '@moduix/react/date-picker';

const format = (date: DateValue) => `${String(date.month).padStart(2, '0')}/${date.year}`;
const parse = (value: string) => {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/);
  return match ? new CalendarDate(Number(match[2]), Number(match[1]), 1) : undefined;
};
export default function MonthPickerDemo() {
  return (
    <DatePicker defaultView="month" minView="month" maxView="month" format={format} parse={parse}>
      <DatePickerLabel>Month</DatePickerLabel>
      <DatePickerField placeholder="mm/yyyy" clearLabel="Clear month" />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="month">
            <DatePickerMonthTable />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}