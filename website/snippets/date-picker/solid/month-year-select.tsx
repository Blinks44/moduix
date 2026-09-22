import { createListCollection } from '@ark-ui/solid/collection';
import { parseDate } from '@ark-ui/solid/date-picker';
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
} from '@moduix/solid/date-picker';
import {
  Select,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/solid/select';
import { For, createMemo } from 'solid-js';

type SelectItem = {
  label: string;
  value: string;
};

const monthItems: SelectItem[] = [
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

const monthCollection = createListCollection({ items: monthItems });

export default function MonthYearSelectDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl>
            <DatePickerContext>
              {(datePicker) => {
                const yearItems = createMemo(() => {
                  const focusedYear = datePicker().focusedValue.year;
                  return Array.from({ length: 12 }, (_, index) => {
                    const year = focusedYear - 5 + index;
                    return { label: String(year), value: String(year) };
                  });
                });
                const yearCollection = createMemo(() =>
                  createListCollection({ items: yearItems() }),
                );

                return (
                  <>
                    <Select
                      collection={monthCollection}
                      value={[String(datePicker().focusedValue.month)]}
                      onValueChange={(details) => {
                        const month = Number(details.value[0]);
                        if (month)
                          datePicker().setFocusedValue(datePicker().focusedValue.set({ month }));
                      }}
                    >
                      <SelectControl>
                        <SelectTrigger>
                          <SelectValueText />
                        </SelectTrigger>
                        <SelectIndicator />
                      </SelectControl>
                      <SelectPositioner>
                        <SelectContent>
                          <SelectList>
                            <For each={monthItems}>
                              {(item) => (
                                <SelectItem item={item}>
                                  <SelectItemText>{item.label}</SelectItemText>
                                  <SelectItemIndicator />
                                </SelectItem>
                              )}
                            </For>
                          </SelectList>
                        </SelectContent>
                      </SelectPositioner>
                    </Select>
                    <Select
                      collection={yearCollection()}
                      value={[String(datePicker().focusedValue.year)]}
                      onValueChange={(details) => {
                        const year = Number(details.value[0]);
                        if (year)
                          datePicker().setFocusedValue(datePicker().focusedValue.set({ year }));
                      }}
                    >
                      <SelectControl>
                        <SelectTrigger>
                          <SelectValueText />
                        </SelectTrigger>
                        <SelectIndicator />
                      </SelectControl>
                      <SelectPositioner>
                        <SelectContent>
                          <SelectList>
                            <For each={yearItems()}>
                              {(item) => (
                                <SelectItem item={item}>
                                  <SelectItemText>{item.label}</SelectItemText>
                                  <SelectItemIndicator />
                                </SelectItem>
                              )}
                            </For>
                          </SelectList>
                        </SelectContent>
                      </SelectPositioner>
                    </Select>
                  </>
                );
              }}
            </DatePickerContext>
            <DatePickerPrevTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerView view="day">
            <DatePickerDayTable showHeader={false} />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}