<script lang="ts">
  import { parseDate, type DateValue } from '@ark-ui/svelte/date-picker';
  import { DatePicker, DatePickerValueText } from '@/components/date-picker';

  let { custom = false }: { custom?: boolean } = $props();

  let value = $state<DateValue[]>([parseDate('2026-06-22'), parseDate('2026-06-26')]);

  export const getValue = () => value;
  export const clear = () => {
    value = [];
  };
</script>

{#snippet entry(item: {
  index: number;
  remove: () => void;
  value: DateValue;
  valueAsString: string;
})}
  <button type="button" onclick={() => item.remove()}>
    Remove {item.index}: {item.valueAsString} (day {item.value.day})
  </button>
{/snippet}

<DatePicker bind:value selectionMode="multiple">
  <DatePickerValueText
    placeholder="Pick a date"
    separator=" | "
    children={custom ? entry : undefined}
  />
</DatePicker>