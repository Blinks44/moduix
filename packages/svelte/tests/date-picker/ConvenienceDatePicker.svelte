<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import { DatePicker, DatePickerField, DatePickerRangeField } from '@/components/date-picker';

  let {
    clearLabel,
    component,
    overrides = false,
    placeholder,
    triggerLabel,
  }: {
    clearLabel: string;
    component: 'field' | 'range';
    overrides?: boolean;
    placeholder: string;
    triggerLabel: string;
  } = $props();
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]}>
  {#if component === 'field'}
    <DatePickerField
      {placeholder}
      {clearLabel}
      {triggerLabel}
      inputProps={overrides ? { placeholder: 'Override placeholder' } : undefined}
      clearTriggerProps={overrides ? { 'aria-label': 'Override clear' } : undefined}
      triggerProps={overrides ? { 'aria-label': 'Override trigger' } : undefined}
    />
  {:else}
    <DatePickerRangeField
      startPlaceholder={placeholder}
      endPlaceholder={placeholder}
      {clearLabel}
      {triggerLabel}
      startInputProps={overrides ? { placeholder: 'Override placeholder', index: 1 } : undefined}
      endInputProps={overrides ? { placeholder: 'Override placeholder', index: 0 } : undefined}
      clearTriggerProps={overrides ? { 'aria-label': 'Override clear' } : undefined}
      triggerProps={overrides ? { 'aria-label': 'Override trigger' } : undefined}
    />
  {/if}
</DatePicker>