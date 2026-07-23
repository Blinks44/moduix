import { type DatePickerValueChangeDetails } from '@ark-ui/react/date-picker';
import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { DatePicker } from '@moduix/react';
import { useState } from 'react';

const formatter = new DateFormatter('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});
export default function DatePickerWithTimeDemo() {
  const [value, setValue] = useState([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const timeValue = value[0]
    ? `${String(value[0].hour).padStart(2, '0')}:${String(value[0].minute).padStart(2, '0')}`
    : '';
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
    <div>
      <DatePicker value={value} onValueChange={handleDateChange}>
        <DatePicker.Label>Appointment</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.ValueText>
            {() =>
              value[0] ? formatter.format(value[0].toDate(getLocalTimeZone())) : 'Select date'
            }
          </DatePicker.ValueText>
          <DatePicker.Trigger aria-label="Open calendar" />
        </DatePicker.Control>
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
      <label className="date-picker-time-field">
        Time
        <input
          type="time"
          value={timeValue}
          onChange={(event) => {
            const [hour, minute] = event.currentTarget.value.split(':').map(Number);
            setValue((previous) => {
              const current = previous[0] ?? new CalendarDateTime(2026, 6, 22, 0, 0);
              return [
                current.set({
                  hour,
                  minute,
                }),
              ];
            });
          }}
        />
      </label>
    </div>
  );
}