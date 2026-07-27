import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export default function RightToLeftDateInputDemo() {
  return (
    <DateInput dir="rtl" locale="ar-EG" defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInput.Label>تاريخ الإطلاق</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}