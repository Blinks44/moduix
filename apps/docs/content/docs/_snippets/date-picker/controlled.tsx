/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker, parseDate, type DateValue } from '@ark-ui/react/date-picker';
import { DatePicker, Select } from '@moduix/react';
import { useState } from 'react';

export function ControlledDatePickerDemo() {
  const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);
  return (
    <div>
      <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
        <DatePicker.Label>Controlled date</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input placeholder="Select date" />
          <DatePicker.ClearTrigger aria-label="Clear date" />
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
      <div className="date-picker-state">Current value: {value[0]?.toString() ?? 'empty'}</div>
    </div>
  );
}

//#endregion