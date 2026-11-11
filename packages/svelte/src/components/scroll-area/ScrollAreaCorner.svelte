<script lang="ts">
  import { ScrollAreaCorner, type ScrollAreaCornerProps } from '@ark-ui/svelte/scroll-area';

  let { ref = $bindable(null), ...props }: ScrollAreaCornerProps = $props();
</script>

<ScrollAreaCorner {...props} bind:ref data-slot="scroll-area-corner" />