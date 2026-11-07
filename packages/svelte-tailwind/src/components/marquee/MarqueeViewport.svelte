<script lang="ts">
  import { MarqueeViewport, type MarqueeViewportProps } from '@ark-ui/svelte/marquee';

  let { ref = $bindable(null), ...props }: MarqueeViewportProps = $props();
</script>

<MarqueeViewport {...props} bind:ref data-slot="marquee-viewport" />