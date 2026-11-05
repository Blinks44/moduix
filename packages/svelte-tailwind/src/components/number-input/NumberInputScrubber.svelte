<script lang="ts">
  import { NumberInputScrubber, type NumberInputScrubberProps } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NumberInputScrubberProps = $props();
</script>

<NumberInputScrubber
  {...props}
  bind:ref
  class={cn(
    'inline-flex cursor-ew-resize items-center gap-2 text-foreground select-none data-disabled:cursor-default',
    className,
  )}
  data-slot="number-input-scrubber"
/>