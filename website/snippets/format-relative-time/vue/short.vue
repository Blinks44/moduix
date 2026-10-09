<script setup lang="ts">
import { Format } from '@ark-ui/vue';

const lastSavedAt = new Date(Date.now() - 43 * 60 * 1000);
</script>

<template>
  <p>
    Last saved:
    <time :date-time="lastSavedAt.toISOString()">
      <Format.RelativeTime :style="'short'" :value="lastSavedAt" />
    </time>
  </p>
</template>