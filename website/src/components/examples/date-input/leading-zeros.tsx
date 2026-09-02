import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-leading-zeros.module.css';

export default function LeadingZerosDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      defaultValue={[new CalendarDate(2026, 6, 2)]}
      shouldForceLeadingZeros={false}
    >
      <DateInput.Label>Flexible numeric segments</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}