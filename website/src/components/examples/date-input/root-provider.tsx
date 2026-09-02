import { today } from '@internationalized/date';
import { Button } from '@moduix/react/button';
import { DateInput, useDateInput } from '@moduix/react/date-input';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/date-input/date-input-root-provider.module.css';

export default function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
    name: 'report-date',
  });
  return (
    <div className={styles.stack}>
      <DateInput.RootProvider className={styles.root} value={dateInput}>
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