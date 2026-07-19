/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

export function DatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePicker.Label>Release date</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.DayTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion