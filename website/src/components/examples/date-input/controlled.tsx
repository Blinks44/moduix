import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
  type DateInputDateValue,
} from '@moduix/react/date-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/date-input/date-input-controlled.module.css';

export default function ControlledDateInputDemo() {
  const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);
  return (
    <div className={styles.stack}>
      <DateInput
        className={styles.root}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <DateInputLabel>Controlled date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
      <PreviewMeta>
        <output>Selected: {value[0]?.toString() ?? 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}