<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularValueText,
  ProgressCircularRing,
} from '../../src';
</script>

<template>
  <ProgressCircular :default-value="42">
    <ProgressCircularLabel>Export data</ProgressCircularLabel>
    <ProgressCircularValueText />
    <ProgressCircularRing aria-label="Export data" />
  </ProgressCircular>
</template>