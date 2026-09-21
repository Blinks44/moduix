import { parseDate, type DateValue } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerField,
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
} from '@moduix/react/date-picker';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/date-picker/date-picker-controlled.module.css';

export default function ControlledDatePickerDemo() {
  const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);
  return (
    <div className={styles.root}>
      <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
        <DatePickerLabel>Controlled date</DatePickerLabel>
        <DatePickerField />
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
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger />
                      <DatePickerNextTrigger />
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
      <PreviewMeta>
        <output>Current value: {value[0]?.toString() ?? 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}