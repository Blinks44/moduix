import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-basic.module.css';

export default function DateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      defaultValue={[new CalendarDate(2026, 6, 22)]}
      name="release-date"
    >
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput>
  );
}