<script module lang="ts">
  import type {
    DatePickerClearTriggerProps,
    DatePickerControlProps,
    DatePickerInputProps,
    DatePickerTriggerProps,
  } from '@ark-ui/svelte/date-picker';

  export interface DatePickerRangeFieldProps extends Omit<
    DatePickerControlProps,
    'asChild' | 'children'
  > {
    clearLabel?: string;
    clearTriggerProps?: DatePickerClearTriggerProps;
    endInputProps?: DatePickerInputProps;
    endPlaceholder?: DatePickerInputProps['placeholder'];
    startInputProps?: DatePickerInputProps;
    startPlaceholder?: DatePickerInputProps['placeholder'];
    triggerLabel?: string;
    triggerProps?: DatePickerTriggerProps;
  }
</script>

<script lang="ts">
  import DatePickerClearTrigger from './DatePickerClearTrigger.svelte';
  import DatePickerControl from './DatePickerControl.svelte';
  import DatePickerInput from './DatePickerInput.svelte';
  import DatePickerTrigger from './DatePickerTrigger.svelte';

  let {
    clearLabel,
    clearTriggerProps,
    endInputProps,
    endPlaceholder,
    ref = $bindable(null),
    startInputProps,
    startPlaceholder,
    triggerLabel,
    triggerProps,
    ...props
  }: DatePickerRangeFieldProps = $props();

  const resolvedStartInputProps = $derived({
    ...(startPlaceholder === undefined ? {} : { placeholder: startPlaceholder }),
    ...startInputProps,
    index: 0,
  });
  const resolvedEndInputProps = $derived({
    ...(endPlaceholder === undefined ? {} : { placeholder: endPlaceholder }),
    ...endInputProps,
    index: 1,
  });
  const resolvedClearTriggerProps = $derived({
    ...(clearLabel === undefined ? {} : { 'aria-label': clearLabel }),
    ...clearTriggerProps,
  });
  const resolvedTriggerProps = $derived({
    ...(triggerLabel === undefined ? {} : { 'aria-label': triggerLabel }),
    ...triggerProps,
  });
</script>

<DatePickerControl {...props} bind:ref asChild={undefined}>
  <DatePickerInput {...resolvedStartInputProps} />
  <DatePickerInput {...resolvedEndInputProps} />
  <DatePickerClearTrigger {...resolvedClearTriggerProps} />
  <DatePickerTrigger {...resolvedTriggerProps} />
</DatePickerControl>