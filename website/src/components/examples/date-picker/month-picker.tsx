import { type DateValue } from '@ark-ui/react/date-picker';
import { CalendarDate } from '@internationalized/date';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
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
            <DatePickerViewControl>
              <DatePickerPrevTrigger />
              <DatePickerViewTrigger />
              <DatePickerNextTrigger />
            </DatePickerViewControl>
            <DatePickerContext>
              {(datePicker) => (
                <DatePickerTable columns={4}>
                  <DatePickerTableBody>
                    {datePicker
                      .getMonthsGrid({
                        columns: 4,
                        format: 'short',
                      })
                      .map((months, rowIndex) => (
                        <DatePickerTableRow key={rowIndex}>
                          {months.map((month) => (
                            <DatePickerTableCell key={month.value} value={month.value}>
                              <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
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
    </DatePicker>
  );
}