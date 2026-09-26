import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/solid/date-input';
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
        <DateInputLabel>Disabled date</DateInputLabel>
        <DateInputHiddenInput name="disabled-date" />
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>

      <DateInput
        class={styles.root}
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