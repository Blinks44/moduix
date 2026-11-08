<script lang="ts">
  import { Swap, SwapIndicator } from '@/components/swap';

  let swapped = $state(false);
</script>

<button type="button" onclick={() => (swapped = !swapped)}>Toggle</button>
<Swap lazyMount unmountOnExit swap={swapped}>
  <SwapIndicator type="off">Off</SwapIndicator>
  <SwapIndicator type="on">On</SwapIndicator>
</Swap>