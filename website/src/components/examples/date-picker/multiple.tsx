import { parseDate } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/react/date-picker';
import styles from '@/components/examples/date-picker/date-picker-multiple.module.css';

export default function MultipleDatePickerDemo() {
  return (
    <DatePicker
      className={styles.root}
      selectionMode="multiple"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      maxSelectedDates={3}
    >
      <DatePickerLabel>Meeting days</DatePickerLabel>
      <DatePickerControl>
        <DatePickerContext>
          {(datePicker) => (
            <div className={styles.selectedDates}>
              {datePicker.value.length > 0 ? (
                datePicker.value.map((date, index) => (
                  <span key={date.toString()} className={styles.selectedDate}>
                    {date.toString()}
                    <button
                      type="button"
                      className={styles.remove}
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
                <span className={styles.placeholder}>Select dates</span>
              )}
            </div>
          )}
        </DatePickerContext>
        <DatePickerClearTrigger aria-label="Clear dates" />
        <DatePickerTrigger aria-label="Open calendar" />
      </DatePickerControl>
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
  );
}