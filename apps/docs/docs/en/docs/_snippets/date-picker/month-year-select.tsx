import { createListCollection } from '@ark-ui/react/collection';
import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker, Select } from '@moduix/react';

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
      <DatePicker.Label>Report date</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl className="date-picker-month-year-control">
            <DatePicker.Context>
              {(datePicker) => {
                const yearItems = Array.from({ length: 12 }, (_, index) => {
                  const year = datePicker.focusedValue.year - 5 + index;
                  return { label: String(year), value: String(year) };
                });
                const years = createListCollection({ items: yearItems });

                return (
                  <div className="date-picker-month-year-selects">
                    <Select
                      className="date-picker-month-select"
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
                          <Select.Indicator />
                        </Select.Trigger>
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
                      className="date-picker-year-select"
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
                          <Select.Indicator />
                        </Select.Trigger>
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
            </DatePicker.Context>
            <div className="date-picker-month-year-nav">
              <DatePicker.PrevTrigger />
              <DatePicker.NextTrigger />
            </div>
          </DatePicker.ViewControl>
          <DatePicker.View view="day">
            <DatePicker.DayTable showHeader={false} />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}