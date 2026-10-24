import { type DateValue } from '@ark-ui/solid/date-picker';
import { CalendarDateTime } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/solid/date-input';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/solid/date-picker';
import { createSignal } from 'solid-js';

export default function DatePickerWithTimeDemo() {
  const [value, setValue] = createSignal<DateValue[]>([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const handleDateChange = (details: { value: DateValue[] }) => {
    const nextDate = details.value[0];
    if (!nextDate) return setValue([]);

    const previousDate = value()[0];
    const hour = previousDate instanceof CalendarDateTime ? previousDate.hour : 0;
    const minute = previousDate instanceof CalendarDateTime ? previousDate.minute : 0;
    setValue([new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, hour, minute)]);
  };

  return (
    <>
      <DatePicker value={value()} onValueChange={handleDateChange}>
        <DatePickerLabel>Appointment</DatePickerLabel>
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
      </DatePicker>
      <DateInput
        value={value()}
        onValueChange={(details) => {
          const nextTime = details.value[0];
          if (!(nextTime instanceof CalendarDateTime)) return;

          setValue((previous) => {
            const current =
              previous[0] instanceof CalendarDateTime
                ? previous[0]
                : new CalendarDateTime(2026, 6, 22, 0, 0);
            return [
              new CalendarDateTime(
                current.year,
                current.month,
                current.day,
                nextTime.hour,
                nextTime.minute,
              ),
            ];
          });
        }}
      >
        <DateInputLabel>Time</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
    </>
  );
}