<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Toggle } from '@moduix/vue/toggle';
import { ref } from 'vue';
import styles from '@/components/examples/toggle/toggle-controlled.module.css';

const pressed = ref(false);
</script>

<template>
  <div :class="styles.stack">
    <Toggle v-model:pressed="pressed">
      <BellIcon aria-hidden="true" focusable="false" />
      {{ pressed ? 'Notifications on' : 'Notifications off' }}
    </Toggle>
    <div data-preview-meta>
      <output>Notifications: {{ pressed ? 'on' : 'off' }}</output>
    </div>
  </div>
</template>