import { CalendarDateTime } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export default function GranularityDateInputDemo() {
  return (
    <DateInput
      className="date-input-wide-preview"
      granularity="minute"
      hourCycle={24}
      name="scheduled-at"
      defaultValue={[new CalendarDateTime(2026, 12, 5, 14, 30)]}
    >
      <DateInput.Label>Date and time</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}