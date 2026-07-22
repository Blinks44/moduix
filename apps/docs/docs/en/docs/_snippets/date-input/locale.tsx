import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function LocaleDateInputDemo() {
  return (
    <PreviewLayout width="10rem">
      <DateInput locale="de-DE" defaultValue={[new CalendarDate(2026, 12, 5)]}>
        <DateInput.Label>German locale</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
    </PreviewLayout>
  );
}