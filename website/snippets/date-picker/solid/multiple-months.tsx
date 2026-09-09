import { parseDate } from '@ark-ui/solid/date-picker';
import { DatePicker } from '@moduix/solid/date-picker';

export default function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.RangeText />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <div>
            <DatePicker.DayTable showHeader={false} />
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.DayTable
                  offset={datePicker().getOffset({ months: 1 })}
                  showHeader={false}
                />
              )}
            </DatePicker.Context>
          </div>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}