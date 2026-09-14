import { type DateValue } from '@ark-ui/solid/date-picker';
import { CalendarDateTime } from '@internationalized/date';
import { DateInput } from '@moduix/solid/date-input';
import { DatePicker } from '@moduix/solid/date-picker';
import { createSignal } from 'solid-js';

export default function DatePickerWithTimeDemo() {
  const [value, setValue] = createSignal<DateValue[]>([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const handleDateChange = (details: { value: DateValue[] }) => {
    const nextDate = details.value[0];
    if (!nextDate) return setValue([]);

    const previousDate = value()[0];
    const hour = previousDate instanceof CalendarDateTime ? previousDate.hour : 0;
    const minute = previousDate instanceof CalendarDateTime ? previousDate.minute : 0;
    setValue([new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, hour, minute)]);
  };

  return (
    <>
      <DatePicker value={value()} onValueChange={handleDateChange}>
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
                        {datePicker()
                          .getMonthsGrid({ columns: 4, format: 'short' })
                          .map((months) => (
                            <DatePicker.TableRow>
                              {months.map((month) => (
                                <DatePicker.TableCell value={month.value}>
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
                        {datePicker()
                          .getYearsGrid({ columns: 4 })
                          .map((years) => (
                            <DatePicker.TableRow>
                              {years.map((year) => (
                                <DatePicker.TableCell value={year.value} disabled={year.disabled}>
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
        value={value()}
        onValueChange={(details) => {
          const nextTime = details.value[0];
          if (!(nextTime instanceof CalendarDateTime)) return;

          setValue((previous) => {
            const current =
              previous[0] instanceof CalendarDateTime
                ? previous[0]
                : new CalendarDateTime(2026, 6, 22, 0, 0);
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
    </>
  );
}