<script lang="ts">
  import { DatePickerTableBody, type DatePickerTableBodyProps } from '@ark-ui/svelte/date-picker';

  let { class: className, ref = $bindable(null), ...props }: DatePickerTableBodyProps = $props();
</script>

<DatePickerTableBody {...props} bind:ref class={className} data-slot="date-picker-table-body" />