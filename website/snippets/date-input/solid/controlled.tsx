import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
  type DateInputDateValue,
} from '@moduix/solid/date-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/date-input/date-input-controlled.module.css';

export default function ControlledDateInputDemo() {
  const [value, setValue] = createSignal<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);

  return (
    <div class={styles.stack}>
      <DateInput
        class={styles.root}
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <DateInputLabel>Controlled date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
      <output>Selected: {value()[0]?.toString() ?? 'empty'}</output>
    </div>
  );
}