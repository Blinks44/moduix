<script lang="ts">
  import { DialogCloseTrigger, type DialogCloseTriggerProps } from '@ark-ui/svelte/dialog';

  let { class: className, ref = $bindable(null), ...props }: DialogCloseTriggerProps = $props();
</script>

<DialogCloseTrigger {...props} bind:ref class={className} data-slot="lightbox-close-trigger" />