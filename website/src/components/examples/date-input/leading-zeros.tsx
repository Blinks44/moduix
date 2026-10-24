import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';

export default function LeadingZerosDateInputDemo() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 2)]} shouldForceLeadingZeros={false}>
      <DateInputLabel>Flexible numeric segments</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}