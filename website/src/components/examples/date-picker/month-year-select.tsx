import { createListCollection } from '@ark-ui/react/collection';
import { parseDate } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerContext,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerDayTable,
} from '@moduix/react/date-picker';
import { Select } from '@moduix/react/select';
import styles from '@/components/examples/date-picker/date-picker-month-year-select.module.css';

const monthItems = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const months = createListCollection({ items: monthItems });

export default function MonthYearSelectDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl className={styles.control}>
            <DatePickerContext>
              {(datePicker) => {
                const yearItems = Array.from({ length: 12 }, (_, index) => {
                  const year = datePicker.focusedValue.year - 5 + index;
                  return { label: String(year), value: String(year) };
                });
                const years = createListCollection({ items: yearItems });

                return (
                  <div className={styles.selects}>
                    <Select
                      className={styles.monthSelect}
                      collection={months}
                      value={[String(datePicker.focusedValue.month)]}
                      onValueChange={(details) => {
                        const month = Number(details.value[0]);
                        if (month)
                          datePicker.setFocusedValue(datePicker.focusedValue.set({ month }));
                      }}
                    >
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText />
                        </Select.Trigger>
                        <Select.Indicator />
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          <Select.List>
                            {monthItems.map((item) => (
                              <Select.Item key={item.value} item={item}>
                                <Select.ItemText>{item.label}</Select.ItemText>
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.List>
                        </Select.Content>
                      </Select.Positioner>
                    </Select>
                    <Select
                      className={styles.yearSelect}
                      collection={years}
                      value={[String(datePicker.focusedValue.year)]}
                      onValueChange={(details) => {
                        const year = Number(details.value[0]);
                        if (year) datePicker.setFocusedValue(datePicker.focusedValue.set({ year }));
                      }}
                    >
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText />
                        </Select.Trigger>
                        <Select.Indicator />
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          <Select.List>
                            {yearItems.map((item) => (
                              <Select.Item key={item.value} item={item}>
                                <Select.ItemText>{item.label}</Select.ItemText>
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.List>
                        </Select.Content>
                      </Select.Positioner>
                    </Select>
                  </div>
                );
              }}
            </DatePickerContext>
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