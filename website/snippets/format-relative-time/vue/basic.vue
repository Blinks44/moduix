<script setup lang="ts">
import { Format } from '@ark-ui/vue';

const reviewStartsAt = new Date(Date.now() + 12 * 60 * 1000);
</script>

<template>
  <p>
    Next review:
    <time :date-time="reviewStartsAt.toISOString()">
      <Format.RelativeTime numeric="auto" :value="reviewStartsAt" />
    </time>
  </p>
</template>