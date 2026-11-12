import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerDayTable,
  DatePickerMonthSelect,
  DatePickerYearSelect,
} from '@moduix/solid/date-picker';
import styles from '@/components/examples/date-picker/date-picker-month-year-select.module.css';

export default function MonthYearSelectDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl class={styles.control}>
            <div class={styles.selects}>
              <DatePickerMonthSelect />
              <DatePickerYearSelect />
            </div>
            <div class={styles.nav}>
              <DatePickerPrevTrigger />
              <DatePickerNextTrigger />
            </div>
          </DatePickerViewControl>
          <DatePickerView view="day">
            <DatePickerDayTable showHeader={false} />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}