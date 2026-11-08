<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    DialogBackdrop,
    DialogContent,
    DialogPositioner,
    DialogRootProvider,
    DialogTrigger,
    useDialog,
  } from '@moduix/svelte/dialog';
  const id = $props.id();
  const dialog = useDialog({ id });
</script>

<DialogRootProvider value={dialog}>
  <DialogTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Open dialog</Button>
    {/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>State is owned by useDialog().</DialogContent>
  </DialogPositioner>
</DialogRootProvider>