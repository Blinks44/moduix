<script lang="ts">
  import DialogBackdrop from './DialogBackdrop.svelte';
  import DialogContent, { type DialogContentProps } from './DialogContent.svelte';
  import DialogPositioner from './DialogPositioner.svelte';

  let { ref = $bindable(null), ...props }: DialogContentProps = $props();
</script>

<DialogBackdrop />
<DialogPositioner>
  <DialogContent {...props} bind:ref />
</DialogPositioner>