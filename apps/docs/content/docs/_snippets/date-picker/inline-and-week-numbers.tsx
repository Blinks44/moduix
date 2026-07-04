/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

const showWeekNumbers = true;
export function InlineDatePickerDemo() {
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
            <ArkDatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table>
                  <DatePicker.TableHead>
                    <DatePicker.TableRow>
                      <DatePicker.WeekNumberHeaderCell />
                      {datePicker.weekDays.map((weekDay) => (
                        <DatePicker.TableHeader key={weekDay.value.toString()}>
                          {weekDay.short}
                        </DatePicker.TableHeader>
                      ))}
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    {datePicker.weeks.map((week, weekIndex) => (
                      <DatePicker.TableRow key={week[0]?.toString()}>
                        <DatePicker.WeekNumberCell week={week} weekIndex={weekIndex}>
                          {datePicker.getWeekNumber(week)}
                        </DatePicker.WeekNumberCell>
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
      </DatePicker>
    </div>
  );
}

//#endregion