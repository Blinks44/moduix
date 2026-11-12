import { Button } from '@moduix/solid/button';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/solid/date-picker';
import styles from '@/components/examples/date-picker/date-picker-select-today.module.css';

export default function SelectTodayDatePickerDemo() {
  return (
    <DatePicker>
      <DatePickerLabel>Today shortcut</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <DatePickerDayTable />
            <DatePickerContext>
              {(datePicker) => (
                <div class={styles.todayRow}>
                  <Button size="sm" variant="secondary" onClick={() => datePicker().selectToday()}>
                    Today
                  </Button>
                </div>
              )}
            </DatePickerContext>
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
  );
}