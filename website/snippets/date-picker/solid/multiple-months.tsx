import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerRangeText,
  DatePickerDayTable,
} from '@moduix/solid/date-picker';
import styles from '@/components/examples/date-picker/date-picker-multiple-months.module.css';

export default function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePickerLabel>Planning window</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent class={styles.content}>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerRangeText />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <div class={styles.months}>
            <DatePickerDayTable class={styles.table} showHeader={false} />
            <DatePickerDayTable class={styles.table} offset={1} showHeader={false} />
          </div>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}