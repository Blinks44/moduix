/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker, type DateValue } from '@ark-ui/react/date-picker';
import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@moduix/react';

const format = (date: DateValue) => String(date.year);
const parse = (value: string) => {
  const year = Number(value);
  return Number.isFinite(year) ? new CalendarDate(year, 1, 1) : undefined;
};
export function YearPickerDemo() {
  return (
    <DatePicker defaultView="year" minView="year" format={format} parse={parse}>
      <DatePicker.Label>Year</DatePicker.Label>
      <DatePicker.Field placeholder="yyyy" clearLabel="Clear year" />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="year">
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
                      .getYearsGrid({
                        columns: 4,
                      })
                      .map((years, rowIndex) => (
                        <DatePicker.TableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePicker.TableCell
                              key={`${year.label}-${year.value}`}
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
              )}
            </ArkDatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion