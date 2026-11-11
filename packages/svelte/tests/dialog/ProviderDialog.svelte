<script lang="ts">
  import {
    DialogContent,
    DialogContext,
    DialogPositioner,
    DialogRootProvider,
    DialogTitle,
    useDialog,
  } from '@/components/dialog';

  const dialog = useDialog();
</script>

<button type="button" onclick={() => dialog().setOpen(true)}>Open via API</button>
<DialogRootProvider value={dialog}>
  <DialogContext>
    {#snippet render(context)}
      <output>Open: {String(context().open)}</output>
    {/snippet}
  </DialogContext>
  <DialogPositioner>
    <DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent>
  </DialogPositioner>
</DialogRootProvider>