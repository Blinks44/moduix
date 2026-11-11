<script lang="ts">
  import { DatePickerInput, type DatePickerInputProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerInputProps = $props();
</script>

<DatePickerInput
  {...props}
  bind:ref
  class={cn(
    `h-control-md w-full min-w-30 flex-1 rounded-md border border-input bg-background py-1 ps-3.5 pe-17 text-md leading-6 text-current outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-has-[input[data-index='1']]/date-picker:not-data-[index='1']:pe-3.5 placeholder:text-muted-foreground read-only:cursor-default focus:border-ring focus:outline-ring/50 disabled:cursor-default data-invalid:border-destructive data-invalid:focus:outline-destructive/20`,
    className,
  )}
  data-slot="date-picker-input"
/>