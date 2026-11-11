<script module lang="ts">
  import { parseDate, type DateValue } from '@ark-ui/svelte/date-picker';
  import { today } from '@internationalized/date';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    DatePicker,
    DatePickerClearTrigger,
    DatePickerContent,
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
    DatePickerRootProvider,
    DatePickerTrigger,
    DatePickerView,
    DatePickerViewControl,
    DatePickerYearSelect,
    useDatePicker,
  } from '@/components/date-picker';
  import { Field, FieldErrorText } from '@/components/field';
  import AdvancedDatePickerDayTable from './AdvancedDatePickerDayTable.svelte';
  import styles from './DatePicker.stories.module.css';
  import DatePickerPopup from './DatePickerPopup.svelte';
  import DatePickerViews from './DatePickerViews.svelte';
  import InlineDatePickerContent from './InlineDatePickerContent.svelte';
  import MultipleDatePickerField from './MultipleDatePickerField.svelte';
  import MultipleMonthsDatePickerContent from './MultipleMonthsDatePickerContent.svelte';

  const { Story } = defineMeta({
    title: 'Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const isDateUnavailable = (value: { day: number }) => value.day === 25;
</script>

<script lang="ts">
  let value = $state<DateValue[]>([parseDate('2026-06-22')]);
  const datePicker = useDatePicker({
    id: 'date-picker-root-provider',
    defaultValue: [today('UTC')],
  });
</script>

<Story name="Basic" asChild>
  <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
    <DatePickerLabel>Release date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPopup />
  </DatePicker>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <DatePicker bind:value>
      <DatePickerLabel>Controlled date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
    <span class={styles.hint}>Current value: {value[0]?.toString() ?? 'empty'}</span>
  </div>
</Story>

<Story name="Range" asChild>
  <DatePicker
    selectionMode="range"
    defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}
  >
    <DatePickerLabel>Travel dates</DatePickerLabel>
    <DatePickerRangeField />
    <DatePickerPopup />
  </DatePicker>
</Story>

<Story name="Multiple" asChild>
  <DatePicker
    selectionMode="multiple"
    maxSelectedDates={3}
    defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    class={styles.multipleRoot}
  >
    <DatePickerLabel>Meeting days</DatePickerLabel>
    <MultipleDatePickerField />
    <DatePickerPopup />
  </DatePicker>
</Story>

<Story name="Multiple Months" exportName="MultipleMonths" asChild>
  <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
    <DatePickerLabel>Planning window</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner><MultipleMonthsDatePickerContent /></DatePickerPositioner>
  </DatePicker>
</Story>

<Story name="Month And Year Select" exportName="MonthAndYearSelect" asChild>
  <DatePicker defaultValue={[parseDate('2026-06-22')]}>
    <DatePickerLabel>Report date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerViewControl class={styles.monthYearControl}>
          <div class={styles.monthYearSelects}>
            <DatePickerMonthSelect /><DatePickerYearSelect />
          </div>
          <div class={styles.monthYearNav}>
            <DatePickerPrevTrigger /><DatePickerNextTrigger />
          </div>
        </DatePickerViewControl>
        <DatePickerView view="day"><DatePickerDayTable showHeader={false} /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</Story>

<Story name="Min Max And Unavailable" exportName="MinMaxAndUnavailable" asChild>
  <DatePicker
    defaultValue={[parseDate('2026-06-24')]}
    min={parseDate('2026-06-22')}
    max={parseDate('2026-06-30')}
    {isDateUnavailable}
  >
    <DatePickerLabel>Booking date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPopup />
  </DatePicker>
</Story>

<Story name="Inline Multiple With Week Numbers" exportName="InlineMultipleWithWeekNumbers" asChild>
  <DatePicker
    inline
    selectionMode="multiple"
    maxSelectedDates={3}
    defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    showWeekNumbers
  >
    <DatePickerLabel>Available days</DatePickerLabel>
    <InlineDatePickerContent />
  </DatePicker>
</Story>

<Story name="Presets" asChild>
  <DatePicker selectionMode="range">
    <DatePickerLabel>Preset range</DatePickerLabel>
    <DatePickerRangeField />
    <DatePickerPositioner>
      <DatePickerContent>
        <div class={styles.presets}>
          <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger>
          <DatePickerPresetTrigger value="last30Days">Last 30 days</DatePickerPresetTrigger>
        </div>
        <DatePickerViews />
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</Story>

<Story name="With Field Validation" exportName="WithFieldValidation" asChild>
  <Field invalid required>
    <DatePicker>
      <DatePickerLabel>Deadline</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
    <FieldErrorText>Choose a valid deadline.</FieldErrorText>
  </Field>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.stack}>
    <DatePickerRootProvider value={datePicker}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePickerRootProvider>
    <Button size="sm" variant="secondary" onclick={() => datePicker().clearValue()}>Clear</Button>
  </div>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <DatePicker class={styles.customRoot} defaultValue={[parseDate('2026-06-22')]}>
    <DatePickerLabel>Styled date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPopup />
  </DatePicker>
</Story>

<Story name="Advanced Customization" exportName="AdvancedCustomization" asChild>
  <DatePicker defaultValue={[parseDate('2026-06-22')]}>
    <DatePickerLabel>Advanced date</DatePickerLabel>
    <DatePickerControl>
      <DatePickerInput placeholder="Select date" />
      <DatePickerClearTrigger aria-label="Clear date" />
      <DatePickerTrigger aria-label="Open calendar" />
    </DatePickerControl>
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><AdvancedDatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</Story>