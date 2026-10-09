<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/vue/progress-circular';
</script>

<template>
  <ProgressCircular
    :translations="{
      value: ({ value, max }) => {
        if (value === null) return 'Migration: loading';
        return `Migration: ${value} of ${max}`;
      },
    }"
  >
    <ProgressCircularLabel>Migration</ProgressCircularLabel>
    <ProgressCircularRing />
    <ProgressCircularContext v-slot="progress">
      <ProgressCircularValueText>{{ progress.valueAsString }}</ProgressCircularValueText>
    </ProgressCircularContext>
  </ProgressCircular>
</template>