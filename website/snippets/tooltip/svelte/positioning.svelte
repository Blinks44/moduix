<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/svelte/tooltip';
  import styles from '@/components/examples/tooltip/component-positioning.module.css';

  const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;
  type TooltipPlacement = (typeof tooltipPlacements)[number];

  let placement = $state<TooltipPlacement>('top');
  const positioning = $derived({
    placement,
    offset: { mainAxis: 12 },
  });
</script>

<div>
  <Tooltip {positioning}>
    <TooltipTrigger aria-label={'Tooltip placement: ' + placement}>
      {#snippet asChild(props)}<Button {...props()}>Hover or focus</Button>{/snippet}
    </TooltipTrigger>
    <TooltipBody>Placement: {placement}</TooltipBody>
  </Tooltip>
  <div data-preview-meta class={styles.meta}>
    <output>Placement: {placement}</output>
    {#each tooltipPlacements as item (item)}
      <Button
        type="button"
        size="sm"
        variant={item === placement ? 'default' : 'outline'}
        aria-pressed={item === placement}
        onclick={() => (placement = item)}
      >
        {item}
      </Button>
    {/each}
  </div>
</div>