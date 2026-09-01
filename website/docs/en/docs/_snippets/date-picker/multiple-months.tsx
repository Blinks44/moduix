import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react/date-picker';
import styles from '@/components/examples/date-picker/date-picker-multiple-months.module.css';

export default function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content className={styles.content}>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.RangeText />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <div className={styles.months}>
            <DatePicker.DayTable className={styles.table} showHeader={false} />
            <DatePicker.Context>
              {(datePicker) => {
                const offset = datePicker.getOffset({
                  months: 1,
                });
                return (
                  <DatePicker.DayTable
                    className={styles.table}
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