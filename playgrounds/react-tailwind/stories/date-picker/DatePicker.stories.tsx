import { createListCollection } from '@ark-ui/react/collection';
import { parseDate, type DateValue } from '@ark-ui/react/date-picker';
import { Field as FieldPrimitive } from '@ark-ui/react/field';
import {
  Select as SelectPrimitive,
  type SelectRootProps as ArkSelectRootProps,
} from '@ark-ui/react/select';
import { today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button/Button';
import { DatePicker, useDatePicker } from '@/components/date-picker/DatePicker';

type DatePickerSelectItem = {
  label: string;
  value: string;
};

const monthSelectItems: DatePickerSelectItem[] = [
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

const monthSelectCollection = createListCollection<DatePickerSelectItem>({
  items: monthSelectItems,
});

const Select = Object.assign(function Select<T extends DatePickerSelectItem>(
  props: ArkSelectRootProps<T>,
) {
  return <SelectPrimitive.Root {...props} />;
}, SelectPrimitive);

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const DatePickerContext = DatePicker.Context;

function formatSelectedDate(date: DateValue) {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function MultipleDatePickerField() {
  return (
    <DatePicker.Control>
      <DatePickerContext>
        {(datePicker) => (
          <div className="flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background py-1 ps-3.5 pe-17">
            {datePicker.value.length === 0 ? (
              <span className="inline-flex min-w-0 items-center gap-1 rounded-sm text-sm leading-5 text-muted-foreground">
                Select dates...
              </span>
            ) : (
              datePicker.value.map((date, index) => (
                <span
                  key={date.toString()}
                  className="inline-flex min-w-0 items-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-sm leading-5 text-foreground"
                >
                  {formatSelectedDate(date)}
                  <button
                    className="inline-flex size-4 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground"
                    type="button"
                    aria-label={`Remove ${formatSelectedDate(date)}`}
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
            )}
          </div>
        )}
      </DatePickerContext>
      <DatePicker.ClearTrigger aria-label="Clear dates" />
      <DatePicker.Trigger aria-label="Open calendar" />
    </DatePicker.Control>
  );
}

function AdvancedDatePickerDayTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table>
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                {datePicker.weekDays.map((weekDay) => (
                  <DatePicker.TableHeader key={weekDay.value.toString()}>
                    {weekDay.short}
                  </DatePicker.TableHeader>
                ))}
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              {datePicker.weeks.map((week) => (
                <DatePicker.TableRow key={week[0]?.toString()}>
                  {week.map((day) => (
                    <DatePicker.TableCell key={day.toString()} value={day}>
                      <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerMonthTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table columns={4}>
            <DatePicker.TableBody>
              {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, rowIndex) => (
                <DatePicker.TableRow key={rowIndex}>
                  {months.map((month) => (
                    <DatePicker.TableCell key={month.value} value={month.value}>
                      <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerYearTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table columns={4}>
            <DatePicker.TableBody>
              {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                <DatePicker.TableRow key={rowIndex}>
                  {years.map((year) => (
                    <DatePicker.TableCell
                      key={year.value}
                      value={year.value}
                      disabled={year.disabled}
                    >
                      <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerViews({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <>
      <DatePicker.View view="day">
        <DatePicker.DayTable showWeekNumbers={showWeekNumbers} />
      </DatePicker.View>
      <DatePicker.View view="month">
        <DatePickerMonthTable />
      </DatePicker.View>
      <DatePicker.View view="year">
        <DatePickerYearTable />
      </DatePicker.View>
    </>
  );
}

function DatePickerPopup({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePickerViews showWeekNumbers={showWeekNumbers} />
      </DatePicker.Content>
    </DatePicker.Positioner>
  );
}

function InlineDatePickerContent({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <DatePicker.Content>
      <DatePickerViews showWeekNumbers={showWeekNumbers} />
    </DatePicker.Content>
  );
}

function MultipleMonthsDatePickerContent() {
  return (
    <DatePicker.Content className="w-max max-w-[calc(100vw-2rem)]">
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger />
        <DatePicker.RangeText />
        <DatePicker.NextTrigger />
      </DatePicker.ViewControl>
      <div className="flex gap-3 overflow-x-auto">
        <DatePickerContext>
          {(datePicker) => (
            <DatePicker.Table className="w-max shrink-0">
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {datePicker.weekDays.map((weekDay) => (
                    <DatePicker.TableHeader key={weekDay.value.toString()}>
                      {weekDay.short}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {datePicker.weeks.map((week) => (
                  <DatePicker.TableRow key={week[0]?.toString()}>
                    {week.map((day) => (
                      <DatePicker.TableCell key={day.toString()} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          )}
        </DatePickerContext>
        <DatePickerContext>
          {(datePicker) => {
            const offset = datePicker.getOffset({ months: 1 });

            return (
              <DatePicker.Table className="w-max shrink-0">
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {datePicker.weekDays.map((weekDay) => (
                      <DatePicker.TableHeader key={weekDay.value.toString()}>
                        {weekDay.short}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {offset.weeks.map((week) => (
                    <DatePicker.TableRow key={week[0]?.toString()}>
                      {week.map((day) => (
                        <DatePicker.TableCell
                          key={day.toString()}
                          value={day}
                          visibleRange={offset.visibleRange}
                        >
                          <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            );
          }}
        </DatePickerContext>
      </div>
    </DatePicker.Content>
  );
}

function DatePickerSelectContent({ items }: { items: DatePickerSelectItem[] }) {
  return (
    <Select.Positioner className="z-50 outline-0">
      <Select.Content className="min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg">
        <Select.List className="grid gap-1">
          {items.map((item) => (
            <Select.Item
              key={item.value}
              item={item}
              className="flex min-h-control-sm cursor-pointer items-center justify-between gap-2 rounded-sm px-2 text-sm outline-0 data-highlighted:bg-accent data-selected:bg-primary data-selected:text-primary-foreground"
            >
              <Select.ItemText className="truncate">{item.label}</Select.ItemText>
              <Select.ItemIndicator className="text-current" />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  );
}

function DatePickerSelectControl() {
  return (
    <Select.Control className="relative flex w-full">
      <Select.Trigger className="inline-flex h-control-sm w-full items-center justify-between rounded-md border border-border bg-background px-2 text-sm text-foreground outline-0 focus-visible:outline-2 focus-visible:outline-ring">
        <Select.ValueText className="truncate" />
      </Select.Trigger>
      <Select.Indicator className="pointer-events-none absolute end-2 text-muted-foreground" />
    </Select.Control>
  );
}

function MonthYearPickerSelects() {
  return (
    <DatePickerContext>
      {(datePicker) => {
        const focusedYear = datePicker.focusedValue.year;
        const yearItems = Array.from({ length: 12 }, (_, index) => {
          const year = focusedYear - 5 + index;
          return { label: String(year), value: String(year) };
        });
        const yearCollection = createListCollection<DatePickerSelectItem>({ items: yearItems });

        return (
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(4.5rem,0.7fr)] items-center gap-1">
            <Select
              className="w-full min-w-0"
              collection={monthSelectCollection}
              value={[String(datePicker.focusedValue.month)]}
              onValueChange={(details) => {
                const month = Number(details.value[0]);
                if (month) datePicker.setFocusedValue(datePicker.focusedValue.set({ month }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={monthSelectItems} />
            </Select>
            <Select
              className="w-full min-w-0"
              collection={yearCollection}
              value={[String(datePicker.focusedValue.year)]}
              onValueChange={(details) => {
                const year = Number(details.value[0]);
                if (year) datePicker.setFocusedValue(datePicker.focusedValue.set({ year }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={yearItems} />
            </Select>
          </div>
        );
      }}
    </DatePickerContext>
  );
}

export const Basic: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePicker.Label>Release date</DatePicker.Label>
      <DatePicker.Field />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);

    return (
      <div className="grid gap-3">
        <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
          <DatePicker.Label>Controlled date</DatePicker.Label>
          <DatePicker.Field />
          <DatePickerPopup />
        </DatePicker>
        <span className="text-sm leading-5 text-muted-foreground">
          Current value: {value[0]?.toString() ?? 'empty'}
        </span>
      </div>
    );
  },
};

export const Range: Story = {
  render: () => (
    <DatePicker
      selectionMode="range"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}
    >
      <DatePicker.Label>Travel dates</DatePicker.Label>
      <DatePicker.RangeField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Multiple: Story = {
  render: () => (
    <DatePicker
      className="w-80"
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    >
      <DatePicker.Label>Meeting days</DatePicker.Label>
      <MultipleDatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const MultipleMonths: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <MultipleMonthsDatePickerContent />
      </DatePicker.Positioner>
    </DatePicker>
  ),
};

export const MonthAndYearSelect: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Report date</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <MonthYearPickerSelects />
            <div className="inline-flex items-center gap-1">
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
  ),
};

export const MinMaxAndUnavailable: Story = {
  render: () => (
    <DatePicker
      defaultValue={[parseDate('2026-06-24')]}
      min={parseDate('2026-06-22')}
      max={parseDate('2026-06-30')}
      isDateUnavailable={(date) => date.day === 25}
    >
      <DatePicker.Label>Booking date</DatePicker.Label>
      <DatePicker.Field />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const InlineMultipleWithWeekNumbers: Story = {
  render: () => (
    <DatePicker
      inline
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      showWeekNumbers
    >
      <DatePicker.Label>Available days</DatePicker.Label>
      <InlineDatePickerContent showWeekNumbers />
    </DatePicker>
  ),
};

export const Presets: Story = {
  render: () => (
    <DatePicker selectionMode="range">
      <DatePicker.Label>Preset range</DatePicker.Label>
      <DatePicker.RangeField />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <div className="mb-3 flex flex-wrap gap-2">
            <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>
            <DatePicker.PresetTrigger value="last30Days">Last 30 days</DatePicker.PresetTrigger>
          </div>
          <DatePickerViews />
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <FieldPrimitive.Root invalid required>
      <DatePicker>
        <DatePicker.Label>Deadline</DatePicker.Label>
        <DatePicker.Field />
        <DatePickerPopup />
      </DatePicker>
      <FieldPrimitive.ErrorText>Choose a valid deadline.</FieldPrimitive.ErrorText>
    </FieldPrimitive.Root>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const datePicker = useDatePicker({ defaultValue: [today('UTC')] });

    return (
      <div className="grid gap-3">
        <DatePicker.RootProvider value={datePicker}>
          <DatePicker.Label>Report date</DatePicker.Label>
          <DatePicker.Field />
          <DatePickerPopup />
        </DatePicker.RootProvider>
        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>
          Clear
        </Button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Styled date</DatePicker.Label>
      <DatePicker.Field
        inputProps={{
          className: 'bg-muted border-primary focus:border-primary focus:outline-primary',
        }}
      />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Advanced date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input placeholder="Select date" />
        <DatePicker.ClearTrigger aria-label="Clear date" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <AdvancedDatePickerDayTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  ),
};