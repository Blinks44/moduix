<script lang="ts">
  import { PopoverIndicator, type PopoverIndicatorProps } from '@ark-ui/svelte/popover';

  let { ref = $bindable(null), ...props }: PopoverIndicatorProps = $props();
</script>

<PopoverIndicator {...props} bind:ref data-slot="popover-indicator" />