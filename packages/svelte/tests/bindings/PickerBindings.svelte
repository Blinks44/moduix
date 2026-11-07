<script lang="ts">
  import { parseDate, type DateValue } from '@ark-ui/svelte/date-picker';
  import { CalendarDate } from '@internationalized/date';
  import {
    ColorPicker,
    ColorPickerChannelInput,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerFormatSelect,
    ColorPickerPositioner,
    ColorPickerTrigger,
    parseColor,
    type ColorPickerColor,
    type ColorPickerColorFormat,
  } from '@/components/color-picker';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
  } from '@/components/date-input';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerControl,
    DatePickerDayTable,
    DatePickerInput,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerTrigger,
    DatePickerView,
    type DatePickerDateView,
  } from '@/components/date-picker';

  let dateInputValue = $state<DateValue[]>([new CalendarDate(2026, 6, 22)]);
  let placeholderValue = $state<DateValue>(new CalendarDate(2026, 5, 10));
  let pickerValue = $state<DateValue[]>([parseDate('2026-06-22')]);
  let focusedValue = $state<DateValue>(parseDate('2026-06-22'));
  let pickerOpen = $state(false);
  let pickerView = $state<DatePickerDateView>('day');
  let colorValue = $state<ColorPickerColor>(parseColor('#eb5e41'));
  let colorOpen = $state(false);
  let colorFormat = $state<ColorPickerColorFormat>('rgba');

  export const write = (
    key:
      | 'colorFormat'
      | 'colorOpen'
      | 'colorValue'
      | 'dateInputValue'
      | 'focusedValue'
      | 'pickerOpen'
      | 'pickerValue'
      | 'pickerView'
      | 'placeholderValue',
  ) => {
    if (key === 'dateInputValue') dateInputValue = [new CalendarDate(2026, 7, 4)];
    if (key === 'placeholderValue') placeholderValue = new CalendarDate(2027, 3, 15);
    if (key === 'pickerValue') pickerValue = [parseDate('2026-07-04')];
    if (key === 'focusedValue') focusedValue = parseDate('2026-06-10');
    if (key === 'pickerOpen') pickerOpen = true;
    if (key === 'pickerView') pickerView = 'month';
    if (key === 'colorValue') colorValue = parseColor('#16a34a');
    if (key === 'colorOpen') colorOpen = true;
    if (key === 'colorFormat') colorFormat = 'hsla';
  };
  export const read = () => ({
    colorFormat,
    colorOpen,
    colorValue: colorValue.toString(),
    dateInputValue: dateInputValue.map((date) => date.toString()),
    focusedValue: focusedValue.toString(),
    pickerOpen,
    pickerValue: pickerValue.map((date) => date.toString()),
    pickerView,
    placeholderValue: placeholderValue.toString(),
  });
</script>

<DateInput bind:value={dateInputValue}>
  <DateInputLabel>Bound date input</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
</DateInput>

<DateInput bind:placeholderValue>
  <DateInputLabel>Placeholder date input</DateInputLabel>
  <DateInputControl data-testid="placeholder-control">
    <DateInputSegments />
  </DateInputControl>
</DateInput>

<DatePicker
  bind:value={pickerValue}
  bind:focusedValue
  bind:open={pickerOpen}
  bind:view={pickerView}
  closeOnSelect={false}
  portalled={false}
>
  <DatePickerControl>
    <DatePickerInput aria-label="Bound date" />
    <DatePickerTrigger aria-label="Open bound date picker" />
  </DatePickerControl>
  <DatePickerPositioner>
    <DatePickerContent data-testid="date-picker-content">
      {#if pickerView === 'month'}
        <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      {:else}
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      {/if}
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>

<ColorPicker
  bind:value={colorValue}
  bind:open={colorOpen}
  bind:format={colorFormat}
  portalled={false}
>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" aria-label="Bound hex" />
    <ColorPickerTrigger aria-label="Open bound color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent data-testid="color-picker-content">
      <ColorPickerFormatSelect aria-label="Bound format" />
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>