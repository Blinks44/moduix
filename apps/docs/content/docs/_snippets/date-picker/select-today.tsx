/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker';
import { today } from '@internationalized/date';
import { Button, DatePicker, Select } from '@moduix/react';

datePicker.selectToday();
export function SelectTodayDatePickerDemo() {
  return (
    <DatePicker>
      <DatePicker.Label>Today shortcut</DatePicker.Label>
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
                <>
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
                  <div className="date-picker-today-row">
                    <Button size="sm" variant="secondary" onClick={() => datePicker.selectToday()}>
                      Today
                    </Button>
                  </div>
                </>
              )}
            </ArkDatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion