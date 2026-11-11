<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerMonthSelect,
    DatePickerYearSelect,
  } from '@/components/date-picker';

  let {
    component,
    multiple = false,
    size,
  }: { component: 'month' | 'year'; multiple?: boolean; size?: number } = $props();

  let selectRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ selectRef });
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]}>
  {#if component === 'month'}
    <DatePickerMonthSelect
      bind:ref={selectRef}
      {multiple}
      {size}
      class="consumer-select"
      style="color: red"
      aria-label="Date navigation"
      name="navigation"
      data-testid="navigation-select"
    />
  {:else}
    <DatePickerYearSelect
      bind:ref={selectRef}
      {multiple}
      {size}
      class="consumer-select"
      style="color: red"
      aria-label="Date navigation"
      name="navigation"
      data-testid="navigation-select"
    />
  {/if}
</DatePicker>