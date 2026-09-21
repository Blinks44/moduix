import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-locale.module.css';

export default function LocaleDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      locale="de-DE"
      defaultValue={[new CalendarDate(2026, 12, 5)]}
    >
      <DateInputLabel>German locale</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}