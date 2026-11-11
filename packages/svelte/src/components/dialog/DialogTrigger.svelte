<script lang="ts">
  import { Trigger as DialogTrigger, type DialogTriggerProps } from '@ark-ui/svelte/dialog';

  let { ref = $bindable(null), ...props }: DialogTriggerProps = $props();
</script>

<DialogTrigger {...props} bind:ref data-slot="dialog-trigger" />