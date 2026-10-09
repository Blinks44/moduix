import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';
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
        <DateInputLabel>Disabled date</DateInputLabel>
        <DateInputHiddenInput name="disabled-date" />
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>

      <DateInput
        className={styles.root}
        readOnly
        name="read-only-date"
        defaultValue={[new CalendarDate(2026, 6, 22)]}
      >
        <DateInputLabel>Read-only date</DateInputLabel>
        <DateInputHiddenInput name="read-only-date" />
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
    </div>
  );
}