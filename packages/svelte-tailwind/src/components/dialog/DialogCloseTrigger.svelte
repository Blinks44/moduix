<script lang="ts">
  import { DialogCloseTrigger, type DialogCloseTriggerProps } from '@ark-ui/svelte/dialog';

  let { ref = $bindable(null), ...props }: DialogCloseTriggerProps = $props();
</script>

<DialogCloseTrigger {...props} bind:ref data-slot="dialog-close-trigger" />