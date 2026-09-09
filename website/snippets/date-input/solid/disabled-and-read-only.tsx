import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-disabled-and-read-only.module.css';

export default function DisabledReadOnlyDateInputDemo() {
  return (
    <div class={styles.stack}>
      <DateInput
        class={styles.root}
        disabled
        name="disabled-date"
        defaultValue={[new CalendarDate(2026, 6, 22)]}
      >
        <DateInput.Label>Disabled date</DateInput.Label>
        <DateInput.HiddenInput name="disabled-date" />
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>

      <DateInput
        class={styles.root}
        readOnly
        name="read-only-date"
        defaultValue={[new CalendarDate(2026, 6, 22)]}
      >
        <DateInput.Label>Read-only date</DateInput.Label>
        <DateInput.HiddenInput name="read-only-date" />
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
    </div>
  );
}