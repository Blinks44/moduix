import { createListCollection } from '@ark-ui/solid/collection';
import { parseDate, type DateValue } from '@ark-ui/solid/date-picker';
import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import { today } from '@internationalized/date';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import {
  DatePicker,
  useDatePicker,
  DatePickerRootProvider,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerField,
  DatePickerRangeField,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableHeader,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerDayTable,
  DatePickerPresetTrigger,
} from '@/components/date-picker/DatePicker';
import {
  Select,
  SelectPositioner,
  SelectContent,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
} from '@/components/select/Select';

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

function formatSelectedDate(date: DateValue) {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function MultipleDatePickerField() {
  return (
    <DatePickerControl>
      <DatePickerContext>
        {(datePicker) => (
          <div class="flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background py-1 ps-3.5 pe-17">
            {datePicker().value.length === 0 ? (
              <span class="inline-flex min-w-0 items-center gap-1 rounded-sm text-sm leading-5 text-muted-foreground">
                Select dates...
              </span>
            ) : (
              datePicker().value.map((date, index) => (
                <span class="inline-flex min-w-0 items-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-sm leading-5 text-foreground">
                  {formatSelectedDate(date)}
                  <button
                    class="inline-flex size-4 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground"
                    type="button"
                    aria-label={`Remove ${formatSelectedDate(date)}`}
                    onClick={() =>
                      datePicker().setValue(
                        datePicker().value.filter((_, itemIndex) => itemIndex !== index),
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
      <DatePickerClearTrigger aria-label="Clear dates" />
      <DatePickerTrigger aria-label="Open calendar" />
    </DatePickerControl>
  );
}

function AdvancedDatePickerDayTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerViewTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerTable>
            <DatePickerTableHead>
              <DatePickerTableRow>
                {datePicker().weekDays.map((weekDay) => (
                  <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                ))}
              </DatePickerTableRow>
            </DatePickerTableHead>
            <DatePickerTableBody>
              {datePicker().weeks.map((week) => (
                <DatePickerTableRow>
                  {week.map((day) => (
                    <DatePickerTableCell value={day}>
                      <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  ))}
                </DatePickerTableRow>
              ))}
            </DatePickerTableBody>
          </DatePickerTable>
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
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerViewTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerTable columns={4}>
            <DatePickerTableBody>
              {datePicker()
                .getMonthsGrid({ columns: 4, format: 'short' })
                .map((months) => (
                  <DatePickerTableRow>
                    {months.map((month) => (
                      <DatePickerTableCell value={month.value}>
                        <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
            </DatePickerTableBody>
          </DatePickerTable>
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
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerViewTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerTable columns={4}>
            <DatePickerTableBody>
              {datePicker()
                .getYearsGrid({ columns: 4 })
                .map((years) => (
                  <DatePickerTableRow>
                    {years.map((year) => (
                      <DatePickerTableCell value={year.value} disabled={year.disabled}>
                        <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
            </DatePickerTableBody>
          </DatePickerTable>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerViews(props: { showWeekNumbers?: boolean }) {
  return (
    <>
      <DatePickerView view="day">
        <DatePickerDayTable showWeekNumbers={props.showWeekNumbers ?? false} />
      </DatePickerView>
      <DatePickerView view="month">
        <DatePickerMonthTable />
      </DatePickerView>
      <DatePickerView view="year">
        <DatePickerYearTable />
      </DatePickerView>
    </>
  );
}

function DatePickerPopup(props: { showWeekNumbers?: boolean }) {
  return (
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerViews showWeekNumbers={props.showWeekNumbers} />
      </DatePickerContent>
    </DatePickerPositioner>
  );
}

function InlineDatePickerContent(props: { showWeekNumbers?: boolean }) {
  return (
    <DatePickerContent>
      <DatePickerViews showWeekNumbers={props.showWeekNumbers} />
    </DatePickerContent>
  );
}

function MultipleMonthsDatePickerContent() {
  return (
    <DatePickerContent class="w-max max-w-[calc(100vw-2rem)]">
      <DatePickerViewControl>
        <DatePickerPrevTrigger />
        <DatePickerRangeText />
        <DatePickerNextTrigger />
      </DatePickerViewControl>
      <div class="flex gap-3 overflow-x-auto">
        <DatePickerContext>
          {(datePicker) => (
            <DatePickerTable class="w-max shrink-0">
              <DatePickerTableHead>
                <DatePickerTableRow>
                  {datePicker().weekDays.map((weekDay) => (
                    <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                  ))}
                </DatePickerTableRow>
              </DatePickerTableHead>
              <DatePickerTableBody>
                {datePicker().weeks.map((week) => (
                  <DatePickerTableRow>
                    {week.map((day) => (
                      <DatePickerTableCell value={day}>
                        <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
              </DatePickerTableBody>
            </DatePickerTable>
          )}
        </DatePickerContext>
        <DatePickerContext>
          {(datePicker) => {
            const offset = datePicker().getOffset({ months: 1 });

            return (
              <DatePickerTable class="w-max shrink-0">
                <DatePickerTableHead>
                  <DatePickerTableRow>
                    {datePicker().weekDays.map((weekDay) => (
                      <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                    ))}
                  </DatePickerTableRow>
                </DatePickerTableHead>
                <DatePickerTableBody>
                  {offset.weeks.map((week) => (
                    <DatePickerTableRow>
                      {week.map((day) => (
                        <DatePickerTableCell value={day} visibleRange={offset.visibleRange}>
                          <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                        </DatePickerTableCell>
                      ))}
                    </DatePickerTableRow>
                  ))}
                </DatePickerTableBody>
              </DatePickerTable>
            );
          }}
        </DatePickerContext>
      </div>
    </DatePickerContent>
  );
}

function DatePickerSelectContent(props: { items: DatePickerSelectItem[] }) {
  return (
    <SelectPositioner class="z-50 outline-0">
      <SelectContent class="min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg">
        <SelectList class="grid gap-1">
          {props.items.map((item) => (
            <SelectItem
              item={item}
              class="flex min-h-control-sm cursor-pointer items-center justify-between gap-2 rounded-sm px-2 text-sm outline-0 data-highlighted:bg-accent data-selected:bg-primary data-selected:text-primary-foreground"
            >
              <SelectItemText class="truncate">{item.label}</SelectItemText>
              <SelectItemIndicator class="text-current" />
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </SelectPositioner>
  );
}

function DatePickerSelectControl() {
  return (
    <SelectControl class="relative flex w-full">
      <SelectTrigger class="inline-flex h-control-sm w-full items-center justify-between rounded-md border border-border bg-background px-2 text-sm text-foreground outline-0 focus-visible:outline-2 focus-visible:outline-ring">
        <SelectValueText class="truncate" />
      </SelectTrigger>
      <SelectIndicator class="pointer-events-none absolute end-2 text-muted-foreground" />
    </SelectControl>
  );
}

function MonthYearPickerSelects() {
  return (
    <DatePickerContext>
      {(datePicker) => {
        const focusedYear = datePicker().focusedValue.year;
        const yearItems = Array.from({ length: 12 }, (_, index) => {
          const year = focusedYear - 5 + index;
          return { label: String(year), value: String(year) };
        });
        const yearCollection = createListCollection<DatePickerSelectItem>({ items: yearItems });

        return (
          <div class="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(4.5rem,0.7fr)] items-center gap-1">
            <Select
              class="w-full min-w-0"
              collection={monthSelectCollection}
              value={[String(datePicker().focusedValue.month)]}
              onValueChange={(details) => {
                const month = Number(details.value[0]);
                if (month) datePicker().setFocusedValue(datePicker().focusedValue.set({ month }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={monthSelectItems} />
            </Select>
            <Select
              class="w-full min-w-0"
              collection={yearCollection}
              value={[String(datePicker().focusedValue.year)]}
              onValueChange={(details) => {
                const year = Number(details.value[0]);
                if (year) datePicker().setFocusedValue(datePicker().focusedValue.set({ year }));
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
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal([parseDate('2026-06-22')] as DateValue[]);

    return (
      <div class="grid gap-3">
        <DatePicker value={value()} onValueChange={(details) => setValue(details.value)}>
          <DatePickerLabel>Controlled date</DatePickerLabel>
          <DatePickerField />
          <DatePickerPopup />
        </DatePicker>
        <span class="text-sm leading-5 text-muted-foreground">
          Current value: {value()[0]?.toString() ?? 'empty'}
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
      <DatePickerLabel>Travel dates</DatePickerLabel>
      <DatePickerRangeField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Multiple: Story = {
  render: () => (
    <DatePicker
      class="w-80"
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    >
      <DatePickerLabel>Meeting days</DatePickerLabel>
      <MultipleDatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const MultipleMonths: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePickerLabel>Planning window</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <MultipleMonthsDatePickerContent />
      </DatePickerPositioner>
    </DatePicker>
  ),
};

export const MonthAndYearSelect: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <MonthYearPickerSelects />
            <div class="inline-flex items-center gap-1">
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
      <DatePickerLabel>Booking date</DatePickerLabel>
      <DatePickerField />
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
      <DatePickerLabel>Available days</DatePickerLabel>
      <InlineDatePickerContent showWeekNumbers />
    </DatePicker>
  ),
};

export const Presets: Story = {
  render: () => (
    <DatePicker selectionMode="range">
      <DatePickerLabel>Preset range</DatePickerLabel>
      <DatePickerRangeField />
      <DatePickerPositioner>
        <DatePickerContent>
          <div class="mb-3 flex flex-wrap gap-2">
            <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger>
            <DatePickerPresetTrigger value="last30Days">Last 30 days</DatePickerPresetTrigger>
          </div>
          <DatePickerViews />
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <FieldPrimitive.Root invalid required>
      <DatePicker>
        <DatePickerLabel>Deadline</DatePickerLabel>
        <DatePickerField />
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
      <div class="grid gap-3">
        <DatePickerRootProvider value={datePicker}>
          <DatePickerLabel>Report date</DatePickerLabel>
          <DatePickerField />
          <DatePickerPopup />
        </DatePickerRootProvider>
        <Button size="sm" variant="secondary" onClick={() => datePicker().clearValue()}>
          Clear
        </Button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Styled date</DatePickerLabel>
      <DatePickerField
        inputProps={{
          class: 'bg-muted border-primary focus:border-primary focus:outline-primary',
        }}
      />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Advanced date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput placeholder="Select date" />
        <DatePickerClearTrigger aria-label="Clear date" />
        <DatePickerTrigger aria-label="Open calendar" />
      </DatePickerControl>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <AdvancedDatePickerDayTable />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  ),
};
