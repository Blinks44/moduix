<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/vue/progress-circular';
import styles from '@/components/examples/progress-circular/component-min-max.module.css';
</script>

<template>
  <ProgressCircular :default-value="420" :min="200" :max="800">
    <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
    <div :class="styles.circleContainer">
      <ProgressCircularRing aria-label="Requests per minute" />
      <ProgressCircularValueText />
    </div>
  </ProgressCircular>
</template>