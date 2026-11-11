<script lang="ts">
  import { Swap, SwapIndicator } from '@/components/swap';

  let rootRef: Element | null = $state(null);
  let offRef: Element | null = $state(null);
  let onRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, offRef, onRef });
</script>

<Swap bind:ref={rootRef} data-probe="root">
  <SwapIndicator bind:ref={offRef} type="off">Off</SwapIndicator>
  <SwapIndicator bind:ref={onRef} type="on">On</SwapIndicator>
</Swap>