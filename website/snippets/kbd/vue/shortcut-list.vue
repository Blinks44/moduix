<script setup lang="ts">
import { Kbd, KbdGroup } from '@moduix/vue/kbd';
import styles from '@/components/examples/kbd/kbd-shortcut-list.module.css';

const shortcuts = [
  {
    label: 'Command K',
    keys: ['Cmd', 'K'],
    description: 'Open command menu',
  },
  {
    label: 'Shift question mark',
    keys: ['Shift', '?'],
    description: 'Show shortcuts',
  },
  {
    label: 'Escape',
    keys: ['Esc'],
    description: 'Close overlay',
  },
];
</script>

<template>
  <div :class="styles.root">
    <div v-for="shortcut in shortcuts" :key="shortcut.label" :class="styles.row">
      <KbdGroup :aria-label="shortcut.label">
        <template v-for="(key, index) in shortcut.keys" :key="key">
          <template v-if="index > 0">+</template>
          <Kbd>{{ key }}</Kbd>
        </template>
      </KbdGroup>
      {{ shortcut.description }}
    </div>
  </div>
</template>