/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

const locale = 'de-DE';
export function LocaleDatePickerDemo() {
  return (
    <DatePicker locale="de-DE" startOfWeek={1} defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>German locale</DatePicker.Label>
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