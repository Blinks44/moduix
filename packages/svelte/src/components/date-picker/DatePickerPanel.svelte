<script module lang="ts">
  import type { DatePickerContentProps } from '@ark-ui/svelte/date-picker';

  export type DatePickerPanelProps = DatePickerContentProps;
</script>

<script lang="ts">
  import DatePickerCalendar from './DatePickerCalendar.svelte';
  import DatePickerContent from './DatePickerContent.svelte';
  import DatePickerPositioner from './DatePickerPositioner.svelte';

  let { children, ref = $bindable(null), ...props }: DatePickerPanelProps = $props();
</script>

<DatePickerPositioner>
  {#if props.asChild}
    <DatePickerContent {...props} bind:ref {children} />
  {:else}
    <DatePickerContent {...props} bind:ref>
      {#if children}
        {@render children()}
      {:else}
        <DatePickerCalendar />
      {/if}
    </DatePickerContent>
  {/if}
</DatePickerPositioner>