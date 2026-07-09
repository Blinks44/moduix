/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { parseDate, type DateValue } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';
import { useState } from 'react';

export function ControlledDatePickerDemo() {
  const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);
  return (
    <div>
      <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
        <DatePicker.Label>Controlled date</DatePicker.Label>
        <DatePicker.Field />
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </DatePicker>
      <div className="date-picker-state">Current value: {value[0]?.toString() ?? 'empty'}</div>
    </div>
  );
}

//#endregion