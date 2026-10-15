<script setup lang="ts">
import { useDialogContext } from '@ark-ui/vue/dialog';
import { isHotKey } from '@ark-ui/vue/hotkeys';
import { watchEffect } from 'vue';

const { shortcut } = defineProps<{ shortcut: string }>();
const dialog = useDialogContext();

watchEffect((onCleanup) => {
  if (typeof document === 'undefined') {
    return;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const dialogState = dialog.value;
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
  onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
});
</script>

<template></template>