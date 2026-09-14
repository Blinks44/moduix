import { parseDate } from '@ark-ui/solid/date-picker';
import { DatePicker } from '@moduix/solid/date-picker';
import { For } from 'solid-js';

export default function AdvancedCustomizationDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Advanced date</DatePicker.Label>
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
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table>
                  <DatePicker.TableHead>
                    <DatePicker.TableRow>
                      <For each={datePicker().weekDays}>
                        {(weekDay) => (
                          <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                        )}
                      </For>
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    <For each={datePicker().weeks}>
                      {(week) => (
                        <DatePicker.TableRow>
                          <For each={week}>
                            {(day) => (
                              <DatePicker.TableCell value={day}>
                                <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
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
  );
}