import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-min-max-and-unavailable-dates.module.css';

const minDate = new CalendarDate(2026, 6, 22);
const maxDate = new CalendarDate(2026, 6, 30);
const unavailableDay = 25;
export default function MinMaxDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      defaultValue={[new CalendarDate(2026, 6, 24)]}
      min={minDate}
      max={maxDate}
      isDateUnavailable={(date) => date.day === unavailableDay}
    >
      <DateInputLabel>Booking date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}