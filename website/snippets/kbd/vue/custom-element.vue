<script setup lang="ts">
import { Kbd } from '@moduix/vue/kbd';

const key = {
  label: 'Esc',
  title: 'Escape',
};
</script>

<template>
  <Kbd as-child>
    <kbd :title="key.title">{{ key.label }}</kbd>
  </Kbd>
</template>