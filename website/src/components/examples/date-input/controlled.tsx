import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
  type DateInputDateValue,
} from '@moduix/react/date-input';
import { useState } from 'react';
import styles from '@/components/examples/date-input/date-input-controlled.module.css';

export default function ControlledDateInputDemo() {
  const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);
  return (
    <div className={styles.stack}>
      <DateInput value={value} onValueChange={(details) => setValue(details.value)}>
        <DateInputLabel>Controlled date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
      <div data-preview-meta>
        <output>Selected: {value[0]?.toString() ?? 'empty'}</output>
      </div>
    </div>
  );
}