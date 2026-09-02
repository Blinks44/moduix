import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-disabled-and-read-only.module.css';

export default function DisabledReadOnlyDateInputDemo() {
  return (
    <div className={styles.stack}>
      <DateInput
        className={styles.root}
        disabled
        name="disabled-date"
        defaultValue={[new CalendarDate(2026, 6, 22)]}
      >
        <DateInput.Label>Disabled date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>

      <DateInput
        className={styles.root}
        readOnly
        name="read-only-date"
        defaultValue={[new CalendarDate(2026, 6, 22)]}
      >
        <DateInput.Label>Read-only date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
    </div>
  );
}