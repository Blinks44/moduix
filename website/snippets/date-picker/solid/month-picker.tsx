import { type DateValue } from '@ark-ui/solid/date-picker';
import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@moduix/solid/date-picker';
import { For } from 'solid-js';

const format = (date: DateValue) => `${String(date.month).padStart(2, '0')}/${date.year}`;
const parse = (value: string) => {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/);
  return match ? new CalendarDate(Number(match[2]), Number(match[1]), 1) : undefined;
};

export default function MonthPickerDemo() {
  return (
    <DatePicker defaultView="month" minView="month" maxView="month" format={format} parse={parse}>
      <DatePicker.Label>Month</DatePicker.Label>
      <DatePicker.Field placeholder="mm/yyyy" clearLabel="Clear month" />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="month">
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger />
              <DatePicker.ViewTrigger />
              <DatePicker.NextTrigger />
            </DatePicker.ViewControl>
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table columns={4}>
                  <DatePicker.TableBody>
                    <For each={datePicker().getMonthsGrid({ columns: 4, format: 'short' })}>
                      {(months) => (
                        <DatePicker.TableRow>
                          <For each={months}>
                            {(month) => (
                              <DatePicker.TableCell value={month.value}>
                                <DatePicker.TableCellTrigger>
                                  {month.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            )}
                          </For>
                        </DatePicker.TableRow>
                      )}
                    </For>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}