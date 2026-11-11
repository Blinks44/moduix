<script lang="ts">
  import { useSwapContext } from '@/components/swap';

  const swap = useSwapContext();
</script>

<output>Swap: {String(swap().swap)}</output>