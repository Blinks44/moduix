<script setup lang="ts">
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@moduix/vue/progress-linear';
</script>

<template>
  <ProgressLinear :default-value="24">
    <ProgressLinearLabel>Export data</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Export data">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</template>