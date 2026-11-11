<script lang="ts">
  import { MarqueeEdge, type MarqueeEdgeProps } from '@ark-ui/svelte/marquee';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const marqueeEdgeVariants = cva('z-1 from-background to-transparent', {
    variants: {
      side: {
        start: 'w-1/5 bg-linear-to-r rtl:bg-linear-to-l',
        end: 'w-1/5 bg-linear-to-l rtl:bg-linear-to-r',
        top: 'h-1/5 bg-linear-to-b',
        bottom: 'h-1/5 bg-linear-to-t',
      },
    },
  });

  let { class: className, ref = $bindable(null), side, ...props }: MarqueeEdgeProps = $props();
</script>

<MarqueeEdge
  {...props}
  bind:ref
  class={cn(marqueeEdgeVariants({ side }), className)}
  {side}
  data-slot="marquee-edge"
/>