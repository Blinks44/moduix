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
  <ProgressLinear :default-value="42" orientation="vertical">
    <ProgressLinearLabel>Indexing files</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Indexing files">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</template>