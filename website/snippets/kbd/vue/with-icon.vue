<script setup lang="ts">
import { Command as CommandIcon, CornerDownLeft as EnterIcon } from '@lucide/vue';
import { Kbd, KbdGroup } from '@moduix/vue/kbd';

const shortcut = {
  label: 'Command Enter',
  key: 'Enter',
};
</script>

<template>
  <KbdGroup :aria-label="shortcut.label">
    <Kbd><CommandIcon /></Kbd>+<Kbd><EnterIcon />{{ shortcut.key }}</Kbd>
  </KbdGroup>
</template>