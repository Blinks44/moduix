<script setup lang="ts">
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '../../src';
</script>

<template>
  <ProgressLinear :default-value="42">
    <ProgressLinearLabel>Export data</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Export data"><ProgressLinearRange /></ProgressLinearTrack>
  </ProgressLinear>
</template>