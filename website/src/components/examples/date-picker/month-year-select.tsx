import { parseDate } from '@ark-ui/react/date-picker';
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
} from '@moduix/react/date-picker';
import styles from '@/components/examples/date-picker/date-picker-month-year-select.module.css';

export default function MonthYearSelectDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl className={styles.control}>
            <div className={styles.selects}>
              <DatePickerMonthSelect className={styles.monthSelect} />
              <DatePickerYearSelect className={styles.yearSelect} />
            </div>
            <div className={styles.nav}>
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