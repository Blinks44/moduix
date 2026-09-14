import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-right-to-left.module.css';

export default function RightToLeftDateInputDemo() {
  return (
    <DateInput
      class={styles.root}
      dir="rtl"
      locale="ar-EG"
      defaultValue={[new CalendarDate(2026, 6, 22)]}
    >
      <DateInput.Label>تاريخ الإطلاق</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}