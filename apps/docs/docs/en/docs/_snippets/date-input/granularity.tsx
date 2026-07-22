import { CalendarDateTime } from '@internationalized/date';
import { DateInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function GranularityDateInputDemo() {
  return (
    <PreviewLayout width="12.5rem">
      <DateInput
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
    </PreviewLayout>
  );
}