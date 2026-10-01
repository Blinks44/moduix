<script setup lang="ts">
import { Bell as BellIcon, Check as CheckIcon, Star as StarIcon } from '@lucide/vue';
import { Toggle } from '@moduix/vue/toggle';
import styles from '@/components/examples/toggle/toggle-icons.module.css';
</script>

<template>
  <div :class="styles.row">
    <Toggle variant="outline">
      <BellIcon aria-hidden="true" focusable="false" />
      Alerts
    </Toggle>
    <Toggle size="icon-md" variant="outline" aria-label="Favorites">
      <StarIcon aria-hidden="true" focusable="false" />
    </Toggle>
    <Toggle size="icon-md" variant="ghost" aria-label="Enabled" default-pressed>
      <CheckIcon aria-hidden="true" focusable="false" />
    </Toggle>
  </div>
</template>