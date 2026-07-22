import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

const defaultRange = [new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)];
export default function RangeDateInputDemo() {
  return (
    <DateInput selectionMode="range" names={['check-in', 'check-out']} defaultValue={defaultRange}>
      <DateInput.Label>Travel dates</DateInput.Label>
      <DateInput.Control className="date-input-range-control">
        <DateInput.Segments index={0} />
        <DateInput.Separator>to</DateInput.Separator>
        <DateInput.Segments index={1} />
      </DateInput.Control>
    </DateInput>
  );
}