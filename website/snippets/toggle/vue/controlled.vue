<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Stack } from '@moduix/vue/stack';
import { Toggle } from '@moduix/vue/toggle';
import { ref } from 'vue';

const pressed = ref(false);
</script>

<template>
  <Stack align="center" gap="3">
    <Toggle v-model:pressed="pressed">
      <BellIcon aria-hidden="true" focusable="false" />
      {{ pressed ? 'Notifications on' : 'Notifications off' }}
    </Toggle>
    <div data-preview-meta>
      <output>Notifications: {{ pressed ? 'on' : 'off' }}</output>
    </div>
  </Stack>
</template>