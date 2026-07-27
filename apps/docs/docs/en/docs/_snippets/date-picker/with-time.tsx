import { type DatePickerValueChangeDetails } from '@ark-ui/react/date-picker';
import { CalendarDateTime, DateFormatter } from '@internationalized/date';
import { DateInput, DatePicker } from '@moduix/react';
import { useState } from 'react';

const timeFormatter = new DateFormatter('en-US', {
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
});

export default function DatePickerWithTimeDemo() {
  const [value, setValue] = useState([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const handleDateChange = (details: DatePickerValueChangeDetails) => {
    const nextDate = details.value[0];
    if (!nextDate) return setValue([]);
    const previousTime =
      value[0] ?? new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, 0, 0);
    setValue([
      new CalendarDateTime(
        nextDate.year,
        nextDate.month,
        nextDate.day,
        previousTime.hour,
        previousTime.minute,
      ),
    ]);
  };
  return (
    <div className="date-picker-date-time">
      <DatePicker value={value} onValueChange={handleDateChange}>
        <DatePicker.Label>Appointment</DatePicker.Label>
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
      <DateInput
        className="date-picker-time-input"
        formatter={timeFormatter}
        granularity="minute"
        hourCycle={24}
        value={value}
        onValueChange={(details) => {
          const nextTime = details.value[0];
          if (!(nextTime instanceof CalendarDateTime)) return;

          setValue((previous) => {
            const current = previous[0] ?? new CalendarDateTime(2026, 6, 22, 0, 0);
            return [
              new CalendarDateTime(
                current.year,
                current.month,
                current.day,
                nextTime.hour,
                nextTime.minute,
              ),
            ];
          });
        }}
      >
        <DateInput.Label>Time</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
    </div>
  );
}