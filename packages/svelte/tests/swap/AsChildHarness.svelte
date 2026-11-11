<script lang="ts">
  import { Swap, SwapIndicator } from '@/components/swap';

  let rootRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, indicatorRef });
</script>

<Swap bind:ref={rootRef} animation="rotate" swap>
  {#snippet asChild(props)}
    <span {...props()} data-testid="custom-root">
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator bind:ref={indicatorRef} type="on">
        {#snippet asChild(indicatorProps)}
          <output {...indicatorProps()} data-testid="custom-indicator">On</output>
        {/snippet}
      </SwapIndicator>
    </span>
  {/snippet}
</Swap>