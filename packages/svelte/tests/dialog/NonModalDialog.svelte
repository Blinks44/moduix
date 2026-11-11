<script lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogContext,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@/components/dialog';

  let { clicks }: { clicks: string[] } = $props();
</script>

<button type="button" onclick={() => clicks.push('outside')}>Outside</button>
<div data-testid="host">
  <Dialog defaultOpen modal={false} portalled={false}>
    <DialogTrigger>Toggle dialog</DialogTrigger>
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        <button type="button" onclick={() => clicks.push('inside')}>Inside</button>
        <DialogContext>
          {#snippet render(dialog)}
            <output>Open: {String(dialog().open)}</output>
          {/snippet}
        </DialogContext>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</div>