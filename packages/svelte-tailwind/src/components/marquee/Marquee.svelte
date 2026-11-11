<script lang="ts">
  import { MarqueeRoot, type MarqueeRootProps } from '@ark-ui/svelte/marquee';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    paused = $bindable(),
    ref = $bindable(null),
    side,
    ...props
  }: MarqueeRootProps = $props();
</script>

<MarqueeRoot
  {...props}
  bind:paused
  bind:ref
  class={cn('group w-full', (side === 'top' || side === 'bottom') && 'h-60', className)}
  {side}
  data-slot="marquee-root"
/>