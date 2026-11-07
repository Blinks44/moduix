<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import { DatePicker, DatePickerClearTrigger } from '@/components/date-picker';

  let {
    asChild = false,
    label,
    labelledby,
  }: { asChild?: boolean; label?: string; labelledby?: string } = $props();
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]}>
  <span id="clear-date-label">Clear labelled date</span>
  {#if asChild}
    <DatePickerClearTrigger aria-label={label} aria-labelledby={labelledby}>
      {#snippet asChild(props)}
        <button {...props()} type="button">Clear</button>
      {/snippet}
    </DatePickerClearTrigger>
  {:else}
    <DatePickerClearTrigger aria-label={label} aria-labelledby={labelledby} />
  {/if}
</DatePicker>