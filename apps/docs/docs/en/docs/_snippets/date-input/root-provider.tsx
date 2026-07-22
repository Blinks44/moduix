import { today } from '@internationalized/date';
import { DateInput, useDateInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
    name: 'report-date',
  });
  return (
    <PreviewLayout width="10rem">
      <div>
        <DateInput.RootProvider value={dateInput}>
          <DateInput.Label>Report date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput.RootProvider>
        <div className="date-input-root-provider-actions">
          <button type="button" onClick={() => dateInput.clearValue()}>
            Clear
          </button>
          <button type="button" onClick={() => dateInput.focus()}>
            Focus
          </button>
        </div>
      </div>
    </PreviewLayout>
  );
}