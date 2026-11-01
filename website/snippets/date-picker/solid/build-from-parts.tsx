import { parseDate } from '@ark-ui/solid/date-picker';
import { CloseButton } from '@moduix/solid/close-button';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableHeader,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
} from '@moduix/solid/date-picker';
import {
  Calendar as CalendarIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  X as XIcon,
} from 'lucide-solid';
import { For } from 'solid-js';

export default function BuildFromPartsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput placeholder="Select date" />
        <DatePickerClearTrigger
          aria-label="Clear date"
          asChild={(props) => (
            <CloseButton {...props()}>
              <XIcon strokeWidth={3} />
            </CloseButton>
          )}
        />
        <DatePickerTrigger aria-label="Open calendar">
          <CalendarIcon strokeWidth={2.5} />
        </DatePickerTrigger>
      </DatePickerControl>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <DatePickerViewControl>
              <DatePickerPrevTrigger>
                <ChevronLeftIcon strokeWidth={3} />
              </DatePickerPrevTrigger>
              <DatePickerViewTrigger>
                <DatePickerRangeText />
                <ChevronDownIcon strokeWidth={3} />
              </DatePickerViewTrigger>
              <DatePickerNextTrigger>
                <ChevronRightIcon strokeWidth={3} />
              </DatePickerNextTrigger>
            </DatePickerViewControl>
            <DatePickerContext>
              {(datePicker) => (
                <DatePickerTable>
                  <DatePickerTableHead>
                    <DatePickerTableRow>
                      <For each={datePicker().weekDays}>
                        {(weekDay) => (
                          <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                        )}
                      </For>
                    </DatePickerTableRow>
                  </DatePickerTableHead>
                  <DatePickerTableBody>
                    <For each={datePicker().weeks}>
                      {(week) => (
                        <DatePickerTableRow>
                          <For each={week}>
                            {(day) => (
                              <DatePickerTableCell value={day}>
                                <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            )}
                          </For>
                        </DatePickerTableRow>
                      )}
                    </For>
                  </DatePickerTableBody>
                </DatePickerTable>
              )}
            </DatePickerContext>
          </DatePickerView>
          <DatePickerView view="month">
            <DatePickerContext>
              {(datePicker) => (
                <>
                  <DatePickerViewControl>
                    <DatePickerPrevTrigger>
                      <ChevronLeftIcon strokeWidth={3} />
                    </DatePickerPrevTrigger>
                    <DatePickerViewTrigger>
                      <DatePickerRangeText />
                      <ChevronDownIcon strokeWidth={3} />
                    </DatePickerViewTrigger>
                    <DatePickerNextTrigger>
                      <ChevronRightIcon strokeWidth={3} />
                    </DatePickerNextTrigger>
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
                    <DatePickerPrevTrigger>
                      <ChevronLeftIcon strokeWidth={3} />
                    </DatePickerPrevTrigger>
                    <DatePickerViewTrigger>
                      <DatePickerRangeText />
                      <ChevronDownIcon strokeWidth={3} />
                    </DatePickerViewTrigger>
                    <DatePickerNextTrigger>
                      <ChevronRightIcon strokeWidth={3} />
                    </DatePickerNextTrigger>
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