<script lang="ts">
  import { DatePickerTableRow, type DatePickerTableRowProps } from '@ark-ui/svelte/date-picker';

  let { class: className, ref = $bindable(null), ...props }: DatePickerTableRowProps = $props();
</script>

<DatePickerTableRow {...props} bind:ref class={className} data-slot="date-picker-table-row" />