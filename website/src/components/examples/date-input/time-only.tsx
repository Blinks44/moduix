import { CalendarDateTime, DateFormatter } from '@internationalized/date';
import { DateInput } from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-time-only.module.css';

const formatter = new DateFormatter('en-US', {
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
});

export default function TimeOnlyDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      granularity="minute"
      hourCycle={24}
      formatter={formatter}
      defaultValue={[new CalendarDateTime(2026, 6, 22, 14, 30)]}
    >
      <DateInput.Label>Start time</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}