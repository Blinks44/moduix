import { parseDate } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerRangeText,
  DatePickerDayTable,
} from '@moduix/react/date-picker';
import styles from '@/components/examples/date-picker/date-picker-multiple-months.module.css';

export default function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePickerLabel>Planning window</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent className={styles.content}>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerRangeText />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <div className={styles.months}>
            <DatePickerDayTable className={styles.table} showHeader={false} />
            <DatePickerContext>
              {(datePicker) => {
                const offset = datePicker.getOffset({
                  months: 1,
                });
                return (
                  <DatePickerDayTable className={styles.table} offset={offset} showHeader={false} />
                );
              }}
            </DatePickerContext>
          </div>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}