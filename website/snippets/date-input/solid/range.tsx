import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
  DateInputSeparator,
} from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-range.module.css';

const defaultRange = [new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)];

export default function RangeDateInputDemo() {
  return (
    <DateInput class={styles.root} selectionMode="range" defaultValue={defaultRange}>
      <DateInputLabel>Travel dates</DateInputLabel>
      <DateInputControl class={styles.control}>
        <DateInputSegments index={0} />
        <DateInputSeparator>to</DateInputSeparator>
        <DateInputSegments index={1} />
      </DateInputControl>
      <DateInputHiddenInput index={0} name="check-in" />
      <DateInputHiddenInput index={1} name="check-out" />
    </DateInput>
  );
}