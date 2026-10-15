import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';

export default function RightToLeftDateInputDemo() {
  return (
    <DateInput dir="rtl" locale="ar-EG" defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInputLabel>تاريخ الإطلاق</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  );
}