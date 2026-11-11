<script lang="ts">
  import { SwapIndicator, SwapRootProvider, useSwap } from '@/components/swap';

  let swapped = $state(false);
  const swap = useSwap(() => ({ swap: swapped }));
</script>

<button type="button" onclick={() => (swapped = !swapped)}>Toggle provider</button>
<SwapRootProvider value={swap}>
  <SwapIndicator type="off">Off</SwapIndicator>
  <SwapIndicator type="on">On</SwapIndicator>
</SwapRootProvider>