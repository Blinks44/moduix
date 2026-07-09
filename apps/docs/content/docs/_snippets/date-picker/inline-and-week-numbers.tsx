/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

export function InlineDatePickerDemo() {
  return (
    <div className="date-picker-inline-preview">
      <DatePicker
        inline
        selectionMode="multiple"
        maxSelectedDates={3}
        defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
        showWeekNumbers
      >
        <DatePicker.Label>Available days</DatePicker.Label>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.DayTable showWeekNumbers />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker>
    </div>
  );
}

//#endregion