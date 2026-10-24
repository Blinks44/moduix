import { parseDate, type DateValue } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
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
              <DatePickerMonthTable />
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerYearTable />
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