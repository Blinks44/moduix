import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

export default function InlineDatePickerDemo() {
  return (
    <div className="date-picker-inline-preview">
      <DatePicker
        inline
        selectionMode="multiple"
        maxSelectedDates={3}
        defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
        showWeekNumbers
      >
        <DatePicker.Label>Available days</DatePicker.Label>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.DayTable showWeekNumbers />
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Context>
              {(datePicker) => (
                <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger />
                    <DatePicker.ViewTrigger />
                    <DatePicker.NextTrigger />
                  </DatePicker.ViewControl>
                  <DatePicker.Table columns={4}>
                    <DatePicker.TableBody>
                      {datePicker
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months, rowIndex) => (
                          <DatePicker.TableRow key={rowIndex}>
                            {months.map((month) => (
                              <DatePicker.TableCell key={month.value} value={month.value}>
                                <DatePicker.TableCellTrigger>
                                  {month.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Context>
              {(datePicker) => (
                <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger />
                    <DatePicker.ViewTrigger />
                    <DatePicker.NextTrigger />
                  </DatePicker.ViewControl>
                  <DatePicker.Table columns={4}>
                    <DatePicker.TableBody>
                      {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                        <DatePicker.TableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePicker.TableCell
                              key={year.value}
                              value={year.value}
                              disabled={year.disabled}
                            >
                              <DatePicker.TableCellTrigger>
                                {year.label}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker>
    </div>
  );
}