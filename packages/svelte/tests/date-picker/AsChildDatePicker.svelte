<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import { DatePicker, DatePickerField, DatePickerLabel } from '@/components/date-picker';

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<DatePicker bind:ref={rootRef} defaultValue={[parseDate('2026-06-22')]}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Date picker">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerField />
    </section>
  {/snippet}
</DatePicker>