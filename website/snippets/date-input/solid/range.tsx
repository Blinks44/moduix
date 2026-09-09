import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-range.module.css';

const defaultRange = [new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)];

export default function RangeDateInputDemo() {
  return (
    <DateInput class={styles.root} selectionMode="range" defaultValue={defaultRange}>
      <DateInput.Label>Travel dates</DateInput.Label>
      <DateInput.Control class={styles.control}>
        <DateInput.Segments index={0} />
        <DateInput.Separator>to</DateInput.Separator>
        <DateInput.Segments index={1} />
      </DateInput.Control>
      <DateInput.HiddenInput index={0} name="check-in" />
      <DateInput.HiddenInput index={1} name="check-out" />
    </DateInput>
  );
}