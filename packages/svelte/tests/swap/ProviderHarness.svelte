<script lang="ts">
  import { SwapIndicator, SwapRootProvider, useSwap } from '@/components/swap';
  import ProviderSwapValue from './ProviderSwapValue.svelte';

  let { onclick }: { onclick: () => void } = $props();
  let providerRootRef: Element | null = $state(null);

  const swap = useSwap({ swap: true });

  export const getRefs = () => ({ providerRootRef });
</script>

<SwapRootProvider bind:ref={providerRootRef} animation="fade" value={swap} {onclick}>
  {#snippet asChild(props)}
    <button {...props()} data-testid="provider-root" type="button">
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on"><ProviderSwapValue /></SwapIndicator>
    </button>
  {/snippet}
</SwapRootProvider>