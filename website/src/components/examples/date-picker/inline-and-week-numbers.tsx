import { parseDate } from '@ark-ui/react/date-picker';
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
} from '@moduix/react/date-picker';
import styles from '@/components/examples/date-picker/date-picker-inline-and-week-numbers.module.css';

export default function InlineDatePickerDemo() {
  return (
    <div className={styles.root}>
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
                      {datePicker
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months, rowIndex) => (
                          <DatePickerTableRow key={rowIndex}>
                            {months.map((month) => (
                              <DatePickerTableCell key={month.value} value={month.value}>
                                <DatePickerTableCellTrigger>
                                  {month.label}
                                </DatePickerTableCellTrigger>
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
                      {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                        <DatePickerTableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePickerTableCell
                              key={year.value}
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
                </>
              )}
            </DatePickerContext>
          </DatePickerView>
        </DatePickerContent>
      </DatePicker>
    </div>
  );
}