/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import {
  DatePicker as ArkDatePicker,
  type DatePickerValueChangeDetails,
} from '@ark-ui/react/date-picker';
import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { DatePicker, Select } from '@moduix/react';
import { useState } from 'react';

const value = new CalendarDateTime(2026, 6, 22, 14, 30);
const formatter = new DateFormatter('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});
export function DatePickerWithTimeDemo() {
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
            {value[0] ? formatter.format(value[0].toDate(getLocalTimeZone())) : 'Select date'}
          </DatePicker.ValueText>
          <DatePicker.Trigger aria-label="Open calendar" />
        </DatePicker.Control>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger />
                <DatePicker.ViewTrigger />
                <DatePicker.NextTrigger />
              </DatePicker.ViewControl>
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {datePicker.weekDays.map((weekDay) => (
                          <DatePicker.TableHeader key={weekDay.value.toString()}>
                            {weekDay.short}
                          </DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {datePicker.weeks.map((week) => (
                        <DatePicker.TableRow key={week[0]?.toString()}>
                          {week.map((day) => (
                            <DatePicker.TableCell key={day.toString()} value={day}>
                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                )}
              </ArkDatePicker.Context>
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

//#endregion