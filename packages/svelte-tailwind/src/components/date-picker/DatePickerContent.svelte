<script lang="ts">
  import { DatePickerContent, type DatePickerContentProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerContentProps = $props();
</script>

<DatePickerContent
  {...props}
  bind:ref
  class={cn(
    'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(var(--available-height,100dvh),calc(100dvh-2rem))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100%))] origin-(--transform-origin) overflow-auto rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="date-picker-content"
/>