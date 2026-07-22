import { today } from '@internationalized/date';
import { Button, DatePicker, useDatePicker } from '@moduix/react';

export default function RootProviderDatePickerDemo() {
  const datePicker = useDatePicker({
    defaultValue: [today('UTC')],
  });
  return (
    <div>
      <DatePicker.RootProvider value={datePicker}>
        <DatePicker.Label>Report date</DatePicker.Label>
        <DatePicker.Field />
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </DatePicker.RootProvider>
      <div className="date-picker-state">
        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>
          Clear
        </Button>
      </div>
    </div>
  );
}