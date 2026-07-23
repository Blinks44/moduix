import { today } from '@internationalized/date';
import { Button, DateInput, useDateInput } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
    name: 'report-date',
  });
  return (
    <div className="date-input-demo">
      <DateInput.RootProvider value={dateInput}>
        <DateInput.Label>Report date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput.RootProvider>
      <PreviewMeta>
        <output>Selected: {dateInput.value[0]?.toString() ?? 'empty'}</output>
        <Button type="button" size="sm" variant="outline" onClick={() => dateInput.clearValue()}>
          Clear
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => dateInput.focus()}>
          Focus
        </Button>
      </PreviewMeta>
    </div>
  );
}