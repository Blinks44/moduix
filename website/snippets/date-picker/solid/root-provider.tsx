import { today } from '@internationalized/date';
import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/date-picker';
import { Stack } from '@moduix/solid/stack';

export default function RootProviderDatePickerDemo() {
  const datePicker = useDatePicker({ defaultValue: [today('UTC')] });

  return (
    <Stack align="center">
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
      <div data-preview-meta>
        <Button size="sm" variant="secondary" onClick={() => datePicker().clearValue()}>
          Clear
        </Button>
      </div>
    </Stack>
  );
}