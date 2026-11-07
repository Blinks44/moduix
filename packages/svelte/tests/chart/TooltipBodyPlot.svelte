<script lang="ts">
  import { ChartPlot, type ChartTooltipBodyRenderContext } from '@/components/chart';

  let { mode }: { mode?: 'empty' | 'replacement' | 'wrap' } = $props();
</script>

{#snippet empty()}{/snippet}

{#snippet replacement()}
  <span data-testid="replacement-tooltip">Custom</span>
{/snippet}

{#snippet wrap(tooltip: ChartTooltipBodyRenderContext)}
  <div data-testid="custom-tooltip">{@render tooltip.defaultBody()}</div>
{/snippet}

<ChartPlot
  ariaLabel="Revenue"
  definition={{} as never}
  renderTooltipBody={mode === 'empty'
    ? empty
    : mode === 'replacement'
      ? replacement
      : mode === 'wrap'
        ? wrap
        : undefined}
/>