import { today } from '@internationalized/date';
import { Button } from '@moduix/solid/button';
import {
  DateInputControl,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegments,
  useDateInput,
} from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-root-provider.module.css';

export default function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
    name: 'report-date',
  });

  return (
    <div class={styles.stack}>
      <DateInputRootProvider class={styles.root} value={dateInput}>
        <DateInputLabel>Report date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInputRootProvider>
      <output>Selected: {dateInput().value[0]?.toString() ?? 'empty'}</output>
      <Button type="button" size="sm" variant="outline" onClick={() => dateInput().clearValue()}>
        Clear
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => dateInput().focus()}>
        Focus
      </Button>
    </div>
  );
}