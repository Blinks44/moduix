<script lang="ts">
  import {
    DialogBackdrop,
    DialogContent,
    DialogDescription,
    Positioner as DialogPositioner,
    Root as DialogRoot,
    Title as DialogTitle,
    Trigger as DialogTrigger,
  } from '@ark-ui/svelte/dialog';
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuPositioner,
    MenuSeparator,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
</script>

<DialogRoot>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open dialog</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Project settings</DialogTitle>
      <DialogDescription>Choose an action without leaving the dialog.</DialogDescription>
      <Menu portalled={false} positioning={{ strategy: 'fixed', hideWhenDetached: true }}>
        <MenuTrigger>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">Actions <MenuIndicator /></Button>
          {/snippet}
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="rename">Rename project</MenuItem>
              <MenuItem value="duplicate">Duplicate project</MenuItem>
              <MenuItem value="move">Move to folder</MenuItem>
              <MenuSeparator />
              <MenuItem value="archive" tone="destructive">Archive project</MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </DialogContent>
  </DialogPositioner>
</DialogRoot>