import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-right-to-left.module.css';

export default function RightToLeftDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      dir="rtl"
      locale="ar-EG"
      defaultValue={[new CalendarDate(2026, 6, 22)]}
    >
      <DateInputLabel>تاريخ الإطلاق</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}