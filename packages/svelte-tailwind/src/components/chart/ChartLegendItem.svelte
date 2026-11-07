<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface ChartLegendItemProps
    extends Omit<HTMLProps<'li'>, 'color'>, PolymorphicProps<'li'>, RefAttribute {
    color?: string;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    color,
    ref = $bindable(null),
    style,
    ...props
  }: ChartLegendItemProps = $props();

  const legendItemStyle = $derived(
    [color ? `--moduix-chart-legend-indicator-color:${color}` : undefined, style]
      .filter(Boolean)
      .join(';') || undefined,
  );
</script>

<Ark
  as="li"
  {...props}
  bind:ref
  class={cn(
    'inline-flex items-center gap-2 text-sm text-muted-foreground before:size-2.5 before:shrink-0 before:rounded-full before:bg-(--moduix-chart-legend-indicator-color,--theme(--color-muted-foreground)) before:shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]',
    className,
  )}
  style={legendItemStyle}
  data-scope="chart"
  data-part="legend-item"
  data-slot="chart-legend-item"
/>