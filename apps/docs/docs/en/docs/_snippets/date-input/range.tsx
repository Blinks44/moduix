import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const defaultRange = [new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)];
export default function RangeDateInputDemo() {
  return (
    <PreviewLayout width="18.75rem">
      <DateInput
        selectionMode="range"
        names={['check-in', 'check-out']}
        defaultValue={defaultRange}
      >
        <DateInput.Label>Travel dates</DateInput.Label>
        <DateInput.Control className="date-input-range-control">
          <DateInput.Segments index={0} />
          <DateInput.Separator>to</DateInput.Separator>
          <DateInput.Segments index={1} />
        </DateInput.Control>
      </DateInput>
    </PreviewLayout>
  );
}