<script lang="ts">
  import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPositioner,
    DialogTitle,
  } from '@/components/dialog';

  let { variant }: { variant: 'tall' | 'recipe' | 'inside' } = $props();
</script>

<Dialog defaultOpen portalled={false}>
  <DialogPositioner>
    {#if variant === 'tall'}
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        <div style="height: 200vh">Tall content</div>
        <p data-testid="last-line">Last line</p>
      </DialogContent>
    {:else if variant === 'recipe'}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogBody>Body</DialogBody>
      </DialogContent>
    {:else}
      <DialogContent scrollBehavior="inside">
        <DialogTitle>Terms</DialogTitle>
        <DialogBody><div style="height: 200vh">Tall content</div></DialogBody>
        <DialogFooter><button type="button">Accept</button></DialogFooter>
      </DialogContent>
    {/if}
  </DialogPositioner>
</Dialog>