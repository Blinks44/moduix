/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

export function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content className="date-picker-multiple-months-content">
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.RangeText />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <div className="date-picker-multiple-months">
            <DatePicker.DayTable className="date-picker-multiple-months-table" showHeader={false} />
            <DatePicker.Context>
              {(datePicker) => {
                const offset = datePicker.getOffset({
                  months: 1,
                });
                return (
                  <DatePicker.DayTable
                    className="date-picker-multiple-months-table"
                    offset={offset}
                    showHeader={false}
                  />
                );
              }}
            </DatePicker.Context>
          </div>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion