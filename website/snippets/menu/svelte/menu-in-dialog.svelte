<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
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
  import styles from '@/components/examples/menu/menu-menu-in-dialog.module.css';
</script>

<Dialog>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open dialog</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Project settings</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>Choose an action without leaving the dialog.</DialogDescription>
      </DialogHeader>
      <div class={styles.stack}>
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
      </div>
    </DialogContent>
  </DialogPositioner>
</Dialog>