import type { Meta, StoryObj } from '@storybook/react-vite';
import { createListCollection } from '@ark-ui/react/collection';
import {
  DatePicker as ArkDatePicker,
  parseDate,
  useDatePicker,
  type DateValue,
  type UseDatePickerReturn,
} from '@ark-ui/react/date-picker';
import { today } from '@internationalized/date';
import { useState } from 'react';
import { Button } from '../button';
import { Field } from '../field';
import { Select } from '../select';
import { DatePicker } from './DatePicker';
import storyStyles from './DatePicker.stories.module.css';

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

const DatePickerContext = ArkDatePicker.Context;

function DatePickerField({
  placeholder = 'Select date',
  indexes,
}: {
  placeholder?: string;
  indexes?: [number, number];
}) {
  return (
    <DatePicker.Control>
      {indexes ? (
        <>
          <DatePicker.Input index={indexes[0]} placeholder="Start date" />
          <DatePicker.Input index={indexes[1]} placeholder="End date" />
        </>
      ) : (
        <DatePicker.Input placeholder={placeholder} />
      )}
      <DatePicker.ClearTrigger aria-label="Clear date" />
      <DatePicker.Trigger aria-label="Open calendar" />
    </DatePicker.Control>
  );
}

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
          <div className={storyStyles.selectedDates}>
            {datePicker.value.length === 0 ? (
              <span className={storyStyles.selectedDatesPlaceholder}>Select dates...</span>
            ) : (
              datePicker.value.map((date, index) => (
                <span key={date.toString()} className={storyStyles.selectedDate}>
                  {formatSelectedDate(date)}
                  <button
                    className={storyStyles.selectedDateRemove}
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

type DatePickerOffset = ReturnType<UseDatePickerReturn['getOffset']>;

function DatePickerDayTable({
  showHeader = true,
  showWeekNumbers = false,
  offset,
}: {
  showHeader?: boolean;
  showWeekNumbers?: boolean;
  offset?: DatePickerOffset;
}) {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          {showHeader ? (
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger />
              <DatePicker.ViewTrigger />
              <DatePicker.NextTrigger />
            </DatePicker.ViewControl>
          ) : null}
          <DatePicker.Table>
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                {showWeekNumbers ? <DatePicker.WeekNumberHeaderCell /> : null}
                {datePicker.weekDays.map((weekDay) => (
                  <DatePicker.TableHeader key={weekDay.value.toString()}>
                    {weekDay.short}
                  </DatePicker.TableHeader>
                ))}
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              {(offset?.weeks ?? datePicker.weeks).map((week) => (
                <DatePicker.TableRow key={week[0]?.toString()}>
                  {showWeekNumbers ? (
                    <DatePicker.WeekNumberCell
                      week={week}
                      weekIndex={datePicker.weeks.indexOf(week)}
                    >
                      {datePicker.getWeekNumber(week)}
                    </DatePicker.WeekNumberCell>
                  ) : null}
                  {week.map((day) => (
                    <DatePicker.TableCell
                      key={day.toString()}
                      value={day}
                      visibleRange={offset?.visibleRange}
                    >
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
        <DatePickerDayTable showWeekNumbers={showWeekNumbers} />
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
    <DatePicker.Content className={storyStyles.multipleMonthsContent}>
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger />
        <DatePicker.RangeText />
        <DatePicker.NextTrigger />
      </DatePicker.ViewControl>
      <div className={storyStyles.multipleMonths}>
        <DatePickerContext>
          {(datePicker) => (
            <DatePicker.Table className={storyStyles.multipleMonthsTable}>
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
              <DatePicker.Table className={storyStyles.multipleMonthsTable}>
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
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  );
}

function DatePickerSelectControl() {
  return (
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText />
      </Select.Trigger>
      <Select.Indicators>
        <Select.Indicator />
      </Select.Indicators>
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
          <div className={storyStyles.monthYearSelects}>
            <Select
              className={storyStyles.monthSelect}
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
              className={storyStyles.yearSelect}
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
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);

    return (
      <div className={storyStyles.stack}>
        <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
          <DatePicker.Label>Controlled date</DatePicker.Label>
          <DatePickerField />
          <DatePickerPopup />
        </DatePicker>
        <span className={storyStyles.hint}>Current value: {value[0]?.toString() ?? 'empty'}</span>
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
      <DatePickerField indexes={[0, 1]} />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Multiple: Story = {
  render: () => (
    <DatePicker
      className={storyStyles.multipleRoot}
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
      <DatePickerField />
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
      <DatePickerField />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl className={storyStyles.monthYearControl}>
            <MonthYearPickerSelects />
            <div className={storyStyles.monthYearNav}>
              <DatePicker.PrevTrigger />
              <DatePicker.NextTrigger />
            </div>
          </DatePicker.ViewControl>
          <DatePicker.View view="day">
            <DatePickerDayTable showHeader={false} />
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
      <DatePicker.Label>Available days</DatePicker.Label>
      <InlineDatePickerContent showWeekNumbers />
    </DatePicker>
  ),
};

export const Presets: Story = {
  render: () => (
    <DatePicker selectionMode="range">
      <DatePicker.Label>Preset range</DatePicker.Label>
      <DatePickerField indexes={[0, 1]} />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <div className={storyStyles.presets}>
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
    <Field invalid>
      <DatePicker required invalid>
        <DatePicker.Label>Deadline</DatePicker.Label>
        <DatePickerField />
        <DatePickerPopup />
      </DatePicker>
      <Field.ErrorText>Choose a valid deadline.</Field.ErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const datePicker = useDatePicker({ defaultValue: [today('UTC')] });

    return (
      <div className={storyStyles.stack}>
        <DatePicker.RootProvider value={datePicker}>
          <DatePicker.Label>Report date</DatePicker.Label>
          <DatePickerField />
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
    <DatePicker className={storyStyles.customRoot} defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Styled date</DatePicker.Label>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};