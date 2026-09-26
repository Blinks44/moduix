import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-leading-zeros.module.css';

export default function LeadingZerosDateInputDemo() {
  return (
    <DateInput
      class={styles.root}
      defaultValue={[new CalendarDate(2026, 6, 2)]}
      shouldForceLeadingZeros={false}
    >
      <DateInputLabel>Flexible numeric segments</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}