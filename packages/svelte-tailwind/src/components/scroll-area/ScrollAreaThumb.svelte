<script lang="ts">
  import { ScrollAreaThumb, type ScrollAreaThumbProps } from '@ark-ui/svelte/scroll-area';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ScrollAreaThumbProps = $props();

  const thumbClass =
    'rounded-full bg-border data-[orientation=horizontal]:h-full data-[orientation=horizontal]:min-w-control-xs data-[orientation=vertical]:min-h-control-xs data-[orientation=vertical]:w-full forced-colors:bg-[ButtonText]';
</script>

<ScrollAreaThumb
  {...props}
  bind:ref
  class={cn(thumbClass, className)}
  data-slot="scroll-area-thumb"
/>