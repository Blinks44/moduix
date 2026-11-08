<script lang="ts">
  import { ScrollAreaContent, type ScrollAreaContentProps } from '@ark-ui/svelte/scroll-area';

  let { ref = $bindable(null), ...props }: ScrollAreaContentProps = $props();
</script>

<ScrollAreaContent {...props} bind:ref data-slot="scroll-area-content" />