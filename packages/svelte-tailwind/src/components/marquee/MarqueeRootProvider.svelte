<script lang="ts">
  import { MarqueeRootProvider, type MarqueeRootProviderProps } from '@ark-ui/svelte/marquee';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    value,
    ...props
  }: MarqueeRootProviderProps = $props();
</script>

<MarqueeRootProvider
  {...props}
  bind:ref
  {value}
  class={cn('group w-full', value().orientation === 'vertical' && 'h-60', className)}
  data-slot="marquee-root-provider"
/>