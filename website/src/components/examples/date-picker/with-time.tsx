import { type DatePickerValueChangeDetails } from '@ark-ui/react/date-picker';
import { CalendarDateTime, DateFormatter } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/react/date-input';
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
} from '@moduix/react/date-picker';
import { useState } from 'react';
import styles from '@/components/examples/date-picker/date-picker-with-time.module.css';

const timeFormatter = new DateFormatter('en-US', {
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
});

export default function DatePickerWithTimeDemo() {
  const [value, setValue] = useState([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const handleDateChange = (details: DatePickerValueChangeDetails) => {
    const nextDate = details.value[0];
    if (!nextDate) return setValue([]);
    const previousTime =
      value[0] ?? new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, 0, 0);
    setValue([
      new CalendarDateTime(
        nextDate.year,
        nextDate.month,
        nextDate.day,
        previousTime.hour,
        previousTime.minute,
      ),
    ]);
  };
  return (
    <div className={styles.root}>
      <DatePicker value={value} onValueChange={handleDateChange}>
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
        formatter={timeFormatter}
        granularity="minute"
        hourCycle={24}
        value={value}
        onValueChange={(details) => {
          const nextTime = details.value[0];
          if (!(nextTime instanceof CalendarDateTime)) return;

          setValue((previous) => {
            const current = previous[0] ?? new CalendarDateTime(2026, 6, 22, 0, 0);
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
    </div>
  );
}