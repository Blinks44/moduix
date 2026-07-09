/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker';
import { Button, DatePicker } from '@moduix/react';

export function SelectTodayDatePickerDemo() {
  return (
    <DatePicker>
      <DatePicker.Label>Today shortcut</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.DayTable />
            <ArkDatePicker.Context>
              {(datePicker) => (
                <div className="date-picker-today-row">
                  <Button size="sm" variant="secondary" onClick={() => datePicker.selectToday()}>
                    Today
                  </Button>
                </div>
              )}
            </ArkDatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion