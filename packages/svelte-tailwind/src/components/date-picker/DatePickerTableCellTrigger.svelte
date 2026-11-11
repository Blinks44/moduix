<script lang="ts">
  import {
    DatePickerTableCellTrigger,
    type DatePickerTableCellTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerTableCellTriggerProps = $props();
</script>

<DatePickerTableCellTrigger
  {...props}
  bind:ref
  class={cn(
    'inline-flex h-control-sm w-full min-w-control-sm cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent p-0 text-sm leading-5 outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,border-color,color,outline-color] duration-normal ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-disabled data-in-hover-range:bg-muted data-in-hover-range:text-foreground data-in-range:bg-muted data-in-range:text-foreground data-outside-range:not-data-disabled:text-muted-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:border-ring [@media(hover:hover)]:[&:not([data-disabled]):not([data-selected]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):not([data-selected]):hover]:text-accent-foreground',
    className,
  )}
  data-slot="date-picker-table-cell-trigger"
/>