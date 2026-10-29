import { parseDate } from '@ark-ui/react/date-picker';
import { CloseButton } from '@moduix/react/close-button';
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
} from '@moduix/react/date-picker';
import {
  Calendar as CalendarIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  X as XIcon,
} from 'lucide-react';

export default function BuildFromPartsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput placeholder="Select date" />
        <DatePickerClearTrigger asChild aria-label="Clear date">
          <CloseButton>
            <XIcon strokeWidth={3} />
          </CloseButton>
        </DatePickerClearTrigger>
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
                      {datePicker.weekDays.map((weekDay) => (
                        <DatePickerTableHeader key={weekDay.value.toString()}>
                          {weekDay.short}
                        </DatePickerTableHeader>
                      ))}
                    </DatePickerTableRow>
                  </DatePickerTableHead>
                  <DatePickerTableBody>
                    {datePicker.weeks.map((week) => (
                      <DatePickerTableRow key={week[0]?.toString()}>
                        {week.map((day) => (
                          <DatePickerTableCell key={day.toString()} value={day}>
                            <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                          </DatePickerTableCell>
                        ))}
                      </DatePickerTableRow>
                    ))}
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
                      {datePicker
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months, rowIndex) => (
                          <DatePickerTableRow key={rowIndex}>
                            {months.map((month) => (
                              <DatePickerTableCell key={month.value} value={month.value}>
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
                      {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                        <DatePickerTableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePickerTableCell
                              key={year.value}
                              value={year.value}
                              disabled={year.disabled}
                            >
                              <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
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