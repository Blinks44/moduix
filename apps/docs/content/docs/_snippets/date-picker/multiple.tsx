/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

const maxSelectedDates = 3;
export function MultipleDatePickerDemo() {
  return (
    <DatePicker
      className="date-picker-multiple-root"
      selectionMode="multiple"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      maxSelectedDates={3}
    >
      <DatePicker.Label>Meeting days</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Context>
          {(datePicker) => (
            <div className="date-picker-selected-dates">
              {datePicker.value.length > 0 ? (
                datePicker.value.map((date, index) => (
                  <span key={date.toString()} className="date-picker-selected-date">
                    {date.toString()}
                    <button
                      type="button"
                      className="date-picker-selected-date-remove"
                      onClick={() =>
                        datePicker.setValue(
                          datePicker.value.filter((_, itemIndex) => itemIndex !== index),
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="date-picker-selected-dates-placeholder">Select dates</span>
              )}
            </div>
          )}
        </DatePicker.Context>
        <DatePicker.ClearTrigger aria-label="Clear dates" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
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