import { parseDate } from '@ark-ui/vue/date-picker';
import { today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Button } from '@/components/button';
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerDayTable,
  DatePickerField,
  DatePickerInput,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerPrevTrigger,
  DatePickerRangeField,
  DatePickerRangeText,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
  DatePickerWeekNumberHeaderCell,
  DatePickerYearSelect,
  useDatePicker,
} from '@/components/date-picker';
import { Field, FieldErrorText } from '@/components/field';
import styles from './DatePicker.stories.module.css';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const datePickerComponents = {} as Record<string, Component>;
datePickerComponents.Button = Button;
datePickerComponents.DatePicker = DatePicker;
datePickerComponents.DatePickerClearTrigger = DatePickerClearTrigger;
datePickerComponents.DatePickerContent = DatePickerContent;
datePickerComponents.DatePickerContext = DatePickerContext;
datePickerComponents.DatePickerControl = DatePickerControl;
datePickerComponents.DatePickerDayTable = DatePickerDayTable;
datePickerComponents.DatePickerField = DatePickerField;
datePickerComponents.DatePickerInput = DatePickerInput as Component;
datePickerComponents.DatePickerLabel = DatePickerLabel;
datePickerComponents.DatePickerMonthSelect = DatePickerMonthSelect;
datePickerComponents.DatePickerNextTrigger = DatePickerNextTrigger;
datePickerComponents.DatePickerPositioner = DatePickerPositioner;
datePickerComponents.DatePickerPresetTrigger = DatePickerPresetTrigger;
datePickerComponents.DatePickerPrevTrigger = DatePickerPrevTrigger;
datePickerComponents.DatePickerRangeField = DatePickerRangeField;
datePickerComponents.DatePickerRangeText = DatePickerRangeText;
datePickerComponents.DatePickerRootProvider = DatePickerRootProvider;
datePickerComponents.DatePickerTable = DatePickerTable;
datePickerComponents.DatePickerTableBody = DatePickerTableBody;
datePickerComponents.DatePickerTableCell = DatePickerTableCell;
datePickerComponents.DatePickerTableCellTrigger = DatePickerTableCellTrigger;
datePickerComponents.DatePickerTableHead = DatePickerTableHead;
datePickerComponents.DatePickerTableHeader = DatePickerTableHeader;
datePickerComponents.DatePickerTableRow = DatePickerTableRow;
datePickerComponents.DatePickerTrigger = DatePickerTrigger;
datePickerComponents.DatePickerView = DatePickerView;
datePickerComponents.DatePickerViewControl = DatePickerViewControl;
datePickerComponents.DatePickerViewTrigger = DatePickerViewTrigger;
datePickerComponents.DatePickerWeekNumberHeaderCell = DatePickerWeekNumberHeaderCell;
datePickerComponents.DatePickerYearSelect = DatePickerYearSelect;
datePickerComponents.Field = Field;
datePickerComponents.FieldErrorText = FieldErrorText;

const formatSelectedDate = (value: { toDate: (timeZone: string) => Date }) =>
  value.toDate('UTC').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

const MultipleDatePickerField = defineComponent({
  components: datePickerComponents,
  setup: () => ({ formatSelectedDate, styles }),
  template: `
    <DatePickerControl>
      <DatePickerContext v-slot="context">
        <div :class="styles.selectedDates">
          <span v-if="context.value.length === 0" :class="styles.selectedDatesPlaceholder">Select dates...</span>
          <span v-for="(value, index) in context.value" v-else :key="value.toString()" :class="styles.selectedDate">
            {{ formatSelectedDate(value) }}
            <button
              type="button"
              :class="styles.selectedDateRemove"
              :aria-label="'Remove ' + formatSelectedDate(value)"
              @click="context.setValue(context.value.filter((_, itemIndex) => itemIndex !== index))"
            >×</button>
          </span>
        </div>
      </DatePickerContext>
      <DatePickerClearTrigger aria-label="Clear dates" />
      <DatePickerTrigger aria-label="Open calendar" />
    </DatePickerControl>
  `,
});

const AdvancedDatePickerDayTable = defineComponent({
  components: datePickerComponents,
  template: `
    <DatePickerContext v-slot="context">
      <DatePickerViewControl><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger /></DatePickerViewControl>
      <DatePickerTable>
        <DatePickerTableHead><DatePickerTableRow><DatePickerTableHeader v-for="weekDay in context.weekDays" :key="weekDay.value.toString()">{{ weekDay.short }}</DatePickerTableHeader></DatePickerTableRow></DatePickerTableHead>
        <DatePickerTableBody>
          <DatePickerTableRow v-for="week in context.weeks" :key="week[0]?.toString()">
            <DatePickerTableCell v-for="day in week" :key="day.toString()" :value="day"><DatePickerTableCellTrigger>{{ day.day }}</DatePickerTableCellTrigger></DatePickerTableCell>
          </DatePickerTableRow>
        </DatePickerTableBody>
      </DatePickerTable>
    </DatePickerContext>
  `,
});

const DatePickerMonthTable = defineComponent({
  components: datePickerComponents,
  template: `
    <DatePickerContext v-slot="context">
      <DatePickerViewControl><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger /></DatePickerViewControl>
      <DatePickerTable :columns="4"><DatePickerTableBody>
        <DatePickerTableRow v-for="(months, rowIndex) in context.getMonthsGrid({ columns: 4, format: 'short' })" :key="rowIndex">
          <DatePickerTableCell v-for="month in months" :key="month.value" :value="month.value"><DatePickerTableCellTrigger>{{ month.label }}</DatePickerTableCellTrigger></DatePickerTableCell>
        </DatePickerTableRow>
      </DatePickerTableBody></DatePickerTable>
    </DatePickerContext>
  `,
});

const DatePickerYearTable = defineComponent({
  components: datePickerComponents,
  template: `
    <DatePickerContext v-slot="context">
      <DatePickerViewControl><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger /></DatePickerViewControl>
      <DatePickerTable :columns="4"><DatePickerTableBody>
        <DatePickerTableRow v-for="(years, rowIndex) in context.getYearsGrid({ columns: 4 })" :key="rowIndex">
          <DatePickerTableCell v-for="year in years" :key="year.value" :value="year.value" :disabled="year.disabled"><DatePickerTableCellTrigger>{{ year.label }}</DatePickerTableCellTrigger></DatePickerTableCell>
        </DatePickerTableRow>
      </DatePickerTableBody></DatePickerTable>
    </DatePickerContext>
  `,
});

const DatePickerViews = defineComponent({
  components: { ...datePickerComponents, DatePickerMonthTable, DatePickerYearTable },
  props: { showWeekNumbers: Boolean },
  template: `
    <DatePickerView view="day"><DatePickerDayTable :show-week-numbers="showWeekNumbers" /></DatePickerView>
    <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
    <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
  `,
});

const DatePickerPopup = defineComponent({
  components: { ...datePickerComponents, DatePickerViews },
  props: { showWeekNumbers: Boolean },
  template:
    '<DatePickerPositioner><DatePickerContent><DatePickerViews :show-week-numbers="showWeekNumbers" /></DatePickerContent></DatePickerPositioner>',
});

const InlineDatePickerContent = defineComponent({
  components: { ...datePickerComponents, DatePickerViews },
  props: { showWeekNumbers: Boolean },
  template:
    '<DatePickerContent><DatePickerViews :show-week-numbers="showWeekNumbers" /></DatePickerContent>',
});

const MultipleMonthsDatePickerContent = defineComponent({
  components: datePickerComponents,
  setup: () => ({ styles }),
  template: `
    <DatePickerContent :class="styles.multipleMonthsContent">
      <DatePickerViewControl><DatePickerPrevTrigger /><DatePickerRangeText /><DatePickerNextTrigger /></DatePickerViewControl>
      <div :class="styles.multipleMonths">
        <DatePickerDayTable :class="styles.multipleMonthsTable" :show-header="false" />
        <DatePickerContext v-slot="context"><DatePickerDayTable :class="styles.multipleMonthsTable" :show-header="false" :offset="context.getOffset({ months: 1 })" /></DatePickerContext>
      </div>
    </DatePickerContent>
  `,
});

const storyComponents = {
  ...datePickerComponents,
  AdvancedDatePickerDayTable,
  DatePickerPopup,
  InlineDatePickerContent,
  MultipleDatePickerField,
  MultipleMonthsDatePickerContent,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    `
    <DatePicker :default-value="[date]" name="release-date"><DatePickerLabel>Release date</DatePickerLabel><DatePickerField /><DatePickerPopup /></DatePicker>
  `,
    () => ({ date: parseDate('2026-06-22') }),
  ),
};

export const Controlled: Story = {
  render: renderStory(
    `
    <div :class="styles.stack"><DatePicker v-model="value"><DatePickerLabel>Controlled date</DatePickerLabel><DatePickerField /><DatePickerPopup /></DatePicker><span :class="styles.hint">Current value: {{ value[0]?.toString() ?? 'empty' }}</span></div>
  `,
    () => ({ value: ref([parseDate('2026-06-22')]) }),
  ),
};

export const Range: Story = {
  render: renderStory(
    `
    <DatePicker selection-mode="range" :default-value="[start, end]"><DatePickerLabel>Travel dates</DatePickerLabel><DatePickerRangeField /><DatePickerPopup /></DatePicker>
  `,
    () => ({ start: parseDate('2026-06-22'), end: parseDate('2026-06-26') }),
  ),
};

export const Multiple: Story = {
  render: renderStory(
    `
    <DatePicker selection-mode="multiple" :max-selected-dates="3" :default-value="dates" :class="styles.multipleRoot"><DatePickerLabel>Meeting days</DatePickerLabel><MultipleDatePickerField /><DatePickerPopup /></DatePicker>
  `,
    () => ({ dates: [parseDate('2026-06-22'), parseDate('2026-06-24')] }),
  ),
};

export const MultipleMonths: Story = {
  render: renderStory(
    `
    <DatePicker :default-value="[date]" :num-of-months="2"><DatePickerLabel>Planning window</DatePickerLabel><DatePickerField /><DatePickerPositioner><MultipleMonthsDatePickerContent /></DatePickerPositioner></DatePicker>
  `,
    () => ({ date: parseDate('2026-06-22') }),
  ),
};

export const MonthAndYearSelect: Story = {
  render: renderStory(
    `
    <DatePicker :default-value="[date]"><DatePickerLabel>Report date</DatePickerLabel><DatePickerField /><DatePickerPositioner><DatePickerContent><DatePickerViewControl :class="styles.monthYearControl"><div :class="styles.monthYearSelects"><DatePickerMonthSelect :class="styles.monthSelect" /><DatePickerYearSelect :class="styles.yearSelect" /></div><div :class="styles.monthYearNav"><DatePickerPrevTrigger /><DatePickerNextTrigger /></div></DatePickerViewControl><DatePickerView view="day"><DatePickerDayTable :show-header="false" /></DatePickerView></DatePickerContent></DatePickerPositioner></DatePicker>
  `,
    () => ({ date: parseDate('2026-06-22') }),
  ),
};

export const MinMaxAndUnavailable: Story = {
  render: renderStory(
    `
    <DatePicker :default-value="[date]" :min="min" :max="max" :is-date-unavailable="isDateUnavailable"><DatePickerLabel>Booking date</DatePickerLabel><DatePickerField /><DatePickerPopup /></DatePicker>
  `,
    () => ({
      date: parseDate('2026-06-24'),
      min: parseDate('2026-06-22'),
      max: parseDate('2026-06-30'),
      isDateUnavailable: (value: { day: number }) => value.day === 25,
    }),
  ),
};

export const InlineMultipleWithWeekNumbers: Story = {
  render: renderStory(
    `
    <DatePicker inline selection-mode="multiple" :max-selected-dates="3" :default-value="dates" show-week-numbers><DatePickerLabel>Available days</DatePickerLabel><InlineDatePickerContent show-week-numbers /></DatePicker>
  `,
    () => ({ dates: [parseDate('2026-06-22'), parseDate('2026-06-24')] }),
  ),
};

export const Presets: Story = {
  render: renderStory(`
    <DatePicker selection-mode="range"><DatePickerLabel>Preset range</DatePickerLabel><DatePickerRangeField /><DatePickerPositioner><DatePickerContent><div :class="styles.presets"><DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger><DatePickerPresetTrigger value="last30Days">Last 30 days</DatePickerPresetTrigger></div><DatePickerViews /></DatePickerContent></DatePickerPositioner></DatePicker>
  `),
};

export const WithFieldValidation: Story = {
  render: renderStory(`
    <Field invalid required><DatePicker><DatePickerLabel>Deadline</DatePickerLabel><DatePickerField /><DatePickerPopup /></DatePicker><FieldErrorText>Choose a valid deadline.</FieldErrorText></Field>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
    <div :class="styles.stack"><DatePickerRootProvider :value="datePicker"><DatePickerLabel>Report date</DatePickerLabel><DatePickerField /><DatePickerPopup /></DatePickerRootProvider><Button size="sm" variant="secondary" @click="datePicker.clearValue">Clear</Button></div>
  `,
    () => ({ datePicker: useDatePicker({ defaultValue: [today('UTC')] }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(
    `
    <DatePicker :class="styles.customRoot" :default-value="[date]"><DatePickerLabel>Styled date</DatePickerLabel><DatePickerField /><DatePickerPopup /></DatePicker>
  `,
    () => ({ date: parseDate('2026-06-22') }),
  ),
};

export const AdvancedCustomization: Story = {
  render: renderStory(
    `
    <DatePicker :default-value="[date]"><DatePickerLabel>Advanced date</DatePickerLabel><DatePickerControl><DatePickerInput placeholder="Select date" /><DatePickerClearTrigger aria-label="Clear date" /><DatePickerTrigger aria-label="Open calendar" /></DatePickerControl><DatePickerPositioner><DatePickerContent><DatePickerView view="day"><AdvancedDatePickerDayTable /></DatePickerView></DatePickerContent></DatePickerPositioner></DatePicker>
  `,
    () => ({ date: parseDate('2026-06-22') }),
  ),
};