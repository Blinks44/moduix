<script module lang="ts">
  import type {
    DatePickerClearTriggerProps,
    DatePickerControlProps,
    DatePickerInputProps,
    DatePickerTriggerProps,
  } from '@ark-ui/svelte/date-picker';

  export interface DatePickerFieldProps extends Omit<
    DatePickerControlProps,
    'asChild' | 'children'
  > {
    clearLabel?: string;
    clearTriggerProps?: DatePickerClearTriggerProps;
    inputProps?: DatePickerInputProps;
    placeholder?: DatePickerInputProps['placeholder'];
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
    inputProps,
    placeholder,
    ref = $bindable(null),
    triggerLabel,
    triggerProps,
    ...props
  }: DatePickerFieldProps = $props();

  const resolvedInputProps = $derived({
    ...(placeholder === undefined ? {} : { placeholder }),
    ...inputProps,
    index: 0,
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
  <DatePickerInput {...resolvedInputProps} />
  <DatePickerClearTrigger {...resolvedClearTriggerProps} />
  <DatePickerTrigger {...resolvedTriggerProps} />
</DatePickerControl>