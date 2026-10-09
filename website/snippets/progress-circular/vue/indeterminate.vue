<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/vue/progress-circular';
import styles from '@/components/examples/progress-circular/component-indeterminate.module.css';
</script>

<template>
  <ProgressCircular :class="styles.indeterminate" :default-value="null">
    <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
    <div :class="styles.circleContainer">
      <ProgressCircularRing aria-label="Preparing report" />
      <ProgressCircularValueText />
    </div>
  </ProgressCircular>
</template>