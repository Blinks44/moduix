/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

const defaultView = 'month';
const fixedWeeks = true;
export function DefaultViewDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} defaultView="month" fixedWeeks>
      <DatePicker.Label>Billing month</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.DayTable />
          </DatePicker.View>
          <DatePicker.View view="month">
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