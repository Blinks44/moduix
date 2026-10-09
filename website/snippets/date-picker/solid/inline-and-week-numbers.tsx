import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
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
  DatePickerDayTable,
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
          <DatePickerDayTable showWeekNumbers />
        </DatePickerView>
        <DatePickerView view="month">
          <DatePickerContext>
            {(datePicker) => (
              <>
                <DatePickerViewControl>
                  <DatePickerPrevTrigger />
                  <DatePickerViewTrigger />
                  <DatePickerNextTrigger />
                </DatePickerViewControl>
                <DatePickerTable columns={4}>
                  <DatePickerTableBody>
                    {datePicker()
                      .getMonthsGrid({ columns: 4, format: 'short' })
                      .map((months) => (
                        <DatePickerTableRow>
                          {months.map((month) => (
                            <DatePickerTableCell value={month.value}>
                              <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
                            </DatePickerTableCell>
                          ))}
                        </DatePickerTableRow>
                      ))}
                  </DatePickerTableBody>
                </DatePickerTable>
              </>
            )}
          </DatePickerContext>
        </DatePickerView>
        <DatePickerView view="year">
          <DatePickerContext>
            {(datePicker) => (
              <>
                <DatePickerViewControl>
                  <DatePickerPrevTrigger />
                  <DatePickerViewTrigger />
                  <DatePickerNextTrigger />
                </DatePickerViewControl>
                <DatePickerTable columns={4}>
                  <DatePickerTableBody>
                    {datePicker()
                      .getYearsGrid({ columns: 4 })
                      .map((years) => (
                        <DatePickerTableRow>
                          {years.map((year) => (
                            <DatePickerTableCell value={year.value} disabled={year.disabled}>
                              <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                            </DatePickerTableCell>
                          ))}
                        </DatePickerTableRow>
                      ))}
                  </DatePickerTableBody>
                </DatePickerTable>
              </>
            )}
          </DatePickerContext>
        </DatePickerView>
      </DatePickerContent>
    </DatePicker>
  );
}