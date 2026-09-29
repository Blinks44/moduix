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
  <ProgressLinear :default-value="null">
    <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Preparing report">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</template>