import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export default function LeadingZerosDateInputDemo() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 2)]} shouldForceLeadingZeros={false}>
      <DateInput.Label>Flexible numeric segments</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}