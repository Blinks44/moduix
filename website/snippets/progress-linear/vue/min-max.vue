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
  <ProgressLinear :default-value="420" :min="200" :max="800">
    <ProgressLinearLabel>Requests per minute</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Requests per minute">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</template>