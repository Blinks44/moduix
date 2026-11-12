import { parseDate } from '@ark-ui/solid/date-picker';
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
} from '@moduix/solid/date-picker';
import { For, Show } from 'solid-js';
import styles from '@/components/examples/date-picker/date-picker-multiple.module.css';

export default function MultipleDatePickerDemo() {
  return (
    <DatePicker
      class={styles.root}
      selectionMode="multiple"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      maxSelectedDates={3}
    >
      <DatePickerLabel>Meeting days</DatePickerLabel>
      <DatePickerControl>
        <DatePickerContext>
          {(datePicker) => (
            <div class={styles.selectedDates}>
              <Show
                when={datePicker().value.length > 0}
                fallback={<span class={styles.placeholder}>Select dates</span>}
              >
                <For each={datePicker().value}>
                  {(date, index) => (
                    <span class={styles.selectedDate}>
                      {date.toString()}
                      <button
                        type="button"
                        class={styles.remove}
                        onClick={() =>
                          datePicker().setValue(
                            datePicker().value.filter((_, itemIndex) => itemIndex !== index()),
                          )
                        }
                      >
                        ×
                      </button>
                    </span>
                  )}
                </For>
              </Show>
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