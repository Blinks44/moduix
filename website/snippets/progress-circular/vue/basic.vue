<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/vue/progress-circular';
import styles from '@/components/examples/progress-circular/component-basic.module.css';
</script>

<template>
  <ProgressCircular :default-value="42">
    <ProgressCircularLabel>Export data</ProgressCircularLabel>
    <div :class="styles.circleContainer">
      <ProgressCircularRing aria-label="Export data" />
      <ProgressCircularValueText />
    </div>
  </ProgressCircular>
</template>