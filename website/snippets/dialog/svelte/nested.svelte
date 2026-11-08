<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogPositioner,
    DialogRootProvider,
    DialogTitle,
    useDialog,
  } from '@moduix/svelte/dialog';
  import styles from '@/components/examples/dialog/dialog-nested.module.css';

  const id = $props.id();

  const parent = useDialog({ id: `${id}-parent` });
  const child = useDialog({ id: `${id}-child` });
</script>

<Button onclick={() => parent().setOpen(true)}>Open parent</Button>
<DialogRootProvider value={parent}>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Parent dialog</DialogTitle>
      <Button class={styles.openNestedButton} onclick={() => child().setOpen(true)}>
        Open nested
      </Button>
    </DialogContent>
  </DialogPositioner>
</DialogRootProvider>
<DialogRootProvider value={child}>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Nested dialog</DialogTitle>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</DialogRootProvider>