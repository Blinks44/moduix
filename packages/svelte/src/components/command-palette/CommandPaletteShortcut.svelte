<script lang="ts">
  import { useDialogContext } from '@ark-ui/svelte/dialog';
  import { isHotKey } from '@ark-ui/svelte/hotkeys';

  let { shortcut }: { shortcut: string } = $props();

  const dialog = useDialogContext();

  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const dialogState = dialog();
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        !isHotKey(shortcut, event, {
          enableOnContentEditable: dialogState.open,
          enableOnFormTags: dialogState.open,
        })
      ) {
        return;
      }

      event.preventDefault();
      dialogState.setOpen(!dialogState.open);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });
</script>