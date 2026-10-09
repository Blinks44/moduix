<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Toggle, ToggleContext } from '@moduix/vue/toggle';
</script>

<template>
  <Toggle default-pressed>
    <BellIcon aria-hidden="true" focusable="false" />
    <ToggleContext v-slot="context">
      <span>{{ context.pressed ? 'Notifications on' : 'Notifications off' }}</span>
    </ToggleContext>
  </Toggle>
</template>