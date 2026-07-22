import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function DisabledReadOnlyDateInputDemo() {
  return (
    <PreviewLayout width="10rem">
      <div className="date-input-state-grid">
        <DateInput disabled name="disabled-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
          <DateInput.Label>Disabled date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput>

        <DateInput readOnly name="read-only-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
          <DateInput.Label>Read-only date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput>
      </div>
    </PreviewLayout>
  );
}