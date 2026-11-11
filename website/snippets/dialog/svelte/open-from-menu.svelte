<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseTrigger,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogPositioner,
    DialogTitle,
  } from '@moduix/svelte/dialog';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';

  let open = $state(false);
</script>

<Menu onSelect={(details) => details.value === 'delete' && (open = true)}>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()} variant="outline">Actions <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="edit">Edit</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuItem value="delete" tone="destructive">Delete...</MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>

<Dialog bind:open role="alertdialog">
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
      <DialogFooter>
        <DialogCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Cancel</Button>{/snippet}
        </DialogCloseTrigger>
        <Button onclick={() => (open = false)}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  </DialogPositioner>
</Dialog>