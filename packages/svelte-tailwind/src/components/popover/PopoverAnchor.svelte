<script lang="ts">
  import { PopoverAnchor, type PopoverAnchorProps } from '@ark-ui/svelte/popover';

  let { ref = $bindable(null), ...props }: PopoverAnchorProps = $props();
</script>

<PopoverAnchor {...props} bind:ref data-slot="popover-anchor" />