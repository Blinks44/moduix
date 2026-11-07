<script lang="ts">
  import { DateInputSegment, type DateInputSegmentProps } from '@ark-ui/svelte/date-input';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DateInputSegmentProps = $props();
  const segmentClass =
    'min-w-[2ch] cursor-default rounded-sm px-1 text-center outline-0 transition-colors duration-normal ease-in-out focus-visible:bg-ring/18 focus-visible:text-foreground data-editable:cursor-text data-placeholder-shown:not-focus-visible:text-muted-foreground data-[type=literal]:min-w-auto data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground';
</script>

<DateInputSegment
  {...props}
  bind:ref
  class={cn(segmentClass, className)}
  data-slot="date-input-segment"
/>