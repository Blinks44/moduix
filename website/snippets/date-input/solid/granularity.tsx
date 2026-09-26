import { CalendarDateTime } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-granularity.module.css';

export default function GranularityDateInputDemo() {
  return (
    <DateInput
      class={styles.root}
      granularity="minute"
      hourCycle={24}
      name="scheduled-at"
      defaultValue={[new CalendarDateTime(2026, 12, 5, 14, 30)]}
    >
      <DateInputLabel>Date and time</DateInputLabel>
      <DateInputHiddenInput name="scheduled-at" />
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}