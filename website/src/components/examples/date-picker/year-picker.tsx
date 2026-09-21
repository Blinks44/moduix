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
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
} from '@moduix/react/date-picker';

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
            <DatePickerViewControl>
              <DatePickerPrevTrigger />
              <DatePickerRangeText />
              <DatePickerNextTrigger />
            </DatePickerViewControl>
            <DatePickerContext>
              {(datePicker) => (
                <DatePickerTable columns={4}>
                  <DatePickerTableBody>
                    {datePicker
                      .getYearsGrid({
                        columns: 4,
                      })
                      .map((years, rowIndex) => (
                        <DatePickerTableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePickerTableCell
                              key={`${year.label}-${year.value}`}
                              value={year.value}
                              disabled={year.disabled}
                            >
                              <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
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