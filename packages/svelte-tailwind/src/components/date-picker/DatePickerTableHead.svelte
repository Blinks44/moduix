<script lang="ts">
  import { DatePickerTableHead, type DatePickerTableHeadProps } from '@ark-ui/svelte/date-picker';

  let { class: className, ref = $bindable(null), ...props }: DatePickerTableHeadProps = $props();
</script>

<DatePickerTableHead {...props} bind:ref class={className} data-slot="date-picker-table-head" />