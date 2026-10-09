<script setup lang="ts">
import { Kbd, KbdGroup } from '@moduix/vue/kbd';
import styles from '@/components/examples/kbd/kbd-basic.module.css';

const shortcut = {
  label: 'Command K',
  keys: ['Cmd', 'K'],
};
</script>

<template>
  <div :class="styles.root">
    <KbdGroup :aria-label="shortcut.label">
      <template v-for="(key, index) in shortcut.keys" :key="key">
        <template v-if="index > 0">+</template>
        <Kbd>{{ key }}</Kbd>
      </template>
    </KbdGroup>
  </div>
</template>