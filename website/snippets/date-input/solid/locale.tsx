import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-locale.module.css';

export default function LocaleDateInputDemo() {
  return (
    <DateInput class={styles.root} locale="de-DE" defaultValue={[new CalendarDate(2026, 12, 5)]}>
      <DateInput.Label>German locale</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}