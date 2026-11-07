<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface ChartLegendItemProps
    extends Omit<HTMLProps<'li'>, 'color'>, PolymorphicProps<'li'>, RefAttribute {
    color?: string;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Chart.module.css';

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
  class={clsx(styles.legendItem, className)}
  style={legendItemStyle}
  data-scope="chart"
  data-part="legend-item"
  data-slot="chart-legend-item"
/>