<script lang="ts">
  import { Swap, SwapIndicator, type SwapAnimation } from '@/components/swap';

  let animation: SwapAnimation = $state('scale');
  let swapped = $state(false);

  export const update = (nextAnimation: SwapAnimation, nextSwapped: boolean) => {
    animation = nextAnimation;
    swapped = nextSwapped;
  };
</script>

<Swap {animation} data-animation="rotate" swap={swapped} data-testid="swap">
  <SwapIndicator type="off">Off</SwapIndicator>
  <SwapIndicator type="on">On</SwapIndicator>
</Swap>