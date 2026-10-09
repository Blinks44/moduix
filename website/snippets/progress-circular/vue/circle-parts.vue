<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
} from '@moduix/vue/progress-circular';
import styles from '@/components/examples/progress-circular/component-circle-parts.module.css';
</script>

<template>
  <ProgressCircular :default-value="65">
    <ProgressCircularLabel>Disk usage</ProgressCircularLabel>
    <ProgressCircularCircle aria-label="Disk usage">
      <ProgressCircularCircleTrack :class="styles.track" />
      <ProgressCircularCircleRange :class="styles.range" />
    </ProgressCircularCircle>
  </ProgressCircular>
</template>