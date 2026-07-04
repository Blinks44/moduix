/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker, type DateValue } from '@ark-ui/react/date-picker';
import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@moduix/react';

const format = (date: DateValue) => `${String(date.month).padStart(2, '0')}/${date.year}`;
const parse = (value: string) => {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/);
  return match ? new CalendarDate(Number(match[2]), Number(match[1]), 1) : undefined;
};
export function MonthPickerDemo() {
  return (
    <DatePicker defaultView="month" minView="month" format={format} parse={parse}>
      <DatePicker.Label>Month</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input placeholder="mm/yyyy" />
        <DatePicker.ClearTrigger aria-label="Clear month" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="month">
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger />
              <DatePicker.ViewTrigger />
              <DatePicker.NextTrigger />
            </DatePicker.ViewControl>
            <ArkDatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table columns={4}>
                  <DatePicker.TableBody>
                    {datePicker
                      .getMonthsGrid({
                        columns: 4,
                        format: 'short',
                      })
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
              )}
            </ArkDatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion