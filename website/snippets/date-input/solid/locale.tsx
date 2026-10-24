import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/solid/date-input';

export default function LocaleDateInputDemo() {
  return (
    <DateInput locale="de-DE" defaultValue={[new CalendarDate(2026, 12, 5)]}>
      <DateInputLabel>German locale</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}