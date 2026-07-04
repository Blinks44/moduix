/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/react/date-picker';
import { DatePicker, Select } from '@moduix/react';

const numOfMonths = 2;
export function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input placeholder="Select date" />
        <DatePicker.ClearTrigger aria-label="Clear date" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content className="date-picker-multiple-months-content">
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.RangeText />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <div className="date-picker-multiple-months">
            <ArkDatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table className="date-picker-multiple-months-table">
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
            <ArkDatePicker.Context>
              {(datePicker) => {
                const offset = datePicker.getOffset({
                  months: 1,
                });
                return (
                  <DatePicker.Table className="date-picker-multiple-months-table">
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
                      {offset.weeks.map((week) => (
                        <DatePicker.TableRow key={week[0]?.toString()}>
                          {week.map((day) => (
                            <DatePicker.TableCell
                              key={day.toString()}
                              value={day}
                              visibleRange={offset.visibleRange}
                            >
                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                );
              }}
            </ArkDatePicker.Context>
          </div>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion