import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';

const minDate = new CalendarDate(2026, 6, 22);
const maxDate = new CalendarDate(2026, 6, 30);
const unavailableDay = 25;
export default function MinMaxDateInputDemo() {
  return (
    <DateInput
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