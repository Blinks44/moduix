import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

export default function MinMaxDatePickerDemo() {
  return (
    <DatePicker
      defaultValue={[parseDate('2026-06-24')]}
      min={parseDate('2026-06-22')}
      max={parseDate('2026-06-30')}
      isDateUnavailable={(date) => date.day === 25}
    >
      <DatePicker.Label>Booking date</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.DayTable />
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
      </DatePicker.Positioner>
    </DatePicker>
  );
}