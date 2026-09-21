import { Button } from '@moduix/solid/button';
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
  DatePickerDayTable,
} from '@moduix/solid/date-picker';

export default function SelectTodayDatePickerDemo() {
  return (
    <DatePicker>
      <DatePickerLabel>Today shortcut</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <DatePickerDayTable />
            <DatePickerContext>
              {(datePicker) => (
                <Button size="sm" variant="secondary" onClick={() => datePicker().selectToday()}>
                  Today
                </Button>
              )}
            </DatePickerContext>
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
                      {datePicker()
                        .getYearsGrid({ columns: 4 })
                        .map((years) => (
                          <DatePickerTableRow>
                            {years.map((year) => (
                              <DatePickerTableCell value={year.value} disabled={year.disabled}>
                                <DatePickerTableCellTrigger>
                                  {year.label}
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
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}