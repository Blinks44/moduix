import { today } from '@internationalized/date';
import { Button } from '@moduix/react/button';
import {
  useDatePicker,
  DatePickerRootProvider,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/react/date-picker';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/date-picker/date-picker-root-provider.module.css';

export default function RootProviderDatePickerDemo() {
  const datePicker = useDatePicker({
    defaultValue: [today('UTC')],
  });
  return (
    <div className={styles.root}>
      <DatePickerRootProvider value={datePicker}>
        <DatePickerLabel>Report date</DatePickerLabel>
        <DatePickerField />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerDayTable />
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerMonthTable />
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerYearTable />
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePickerRootProvider>
      <PreviewMeta>
        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>
          Clear
        </Button>
      </PreviewMeta>
    </div>
  );
}