import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerDayTable,
} from '@moduix/solid/date-picker';
import { For, Show } from 'solid-js';

export default function MultipleDatePickerDemo() {
  return (
    <DatePicker
      selectionMode="multiple"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      maxSelectedDates={3}
    >
      <DatePickerLabel>Meeting days</DatePickerLabel>
      <DatePickerControl>
        <DatePickerContext>
          {(datePicker) => (
            <Show when={datePicker().value.length > 0} fallback={<span>Select dates</span>}>
              <For each={datePicker().value}>
                {(date, index) => (
                  <span>
                    {date.toString()}
                    <button
                      type="button"
                      onClick={() =>
                        datePicker().setValue(
                          datePicker().value.filter((_, itemIndex) => itemIndex !== index()),
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                )}
              </For>
            </Show>
          )}
        </DatePickerContext>
        <DatePickerClearTrigger aria-label="Clear dates" />
        <DatePickerTrigger aria-label="Open calendar" />
      </DatePickerControl>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <DatePickerDayTable />
          </DatePickerView>
          <DatePickerView view="month">
            <DatePickerContext>
              {(datePicker) => (
                <>
                  <DatePickerViewControl>
                    <DatePickerPrevTrigger />
                    <DatePickerViewTrigger />
                    <DatePickerNextTrigger />
                  </DatePickerViewControl>
                  <DatePickerTable columns={4}>
                    <DatePickerTableBody>
                      {datePicker()
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months) => (
                          <DatePickerTableRow>
                            {months.map((month) => (
                              <DatePickerTableCell value={month.value}>
                                <DatePickerTableCellTrigger>
                                  {month.label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                    </DatePickerTableBody>
                  </DatePickerTable>
                </>
              )}
            </DatePickerContext>
          </DatePickerView>
          <DatePickerView view="year">
            <DatePickerContext>
              {(datePicker) => (
                <>
                  <DatePickerViewControl>
                    <DatePickerPrevTrigger />
                    <DatePickerViewTrigger />
                    <DatePickerNextTrigger />
                  </DatePickerViewControl>
                  <DatePickerTable columns={4}>
                    <DatePickerTableBody>
                      {datePicker()
                        .getYearsGrid({ columns: 4 })
                        .map((years) => (
                          <DatePickerTableRow>
                            {years.map((year) => (
                              <DatePickerTableCell value={year.value} disabled={year.disabled}>
                                <DatePickerTableCellTrigger>
                                  {year.label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                    </DatePickerTableBody>
                  </DatePickerTable>
                </>
              )}
            </DatePickerContext>
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}