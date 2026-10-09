<script setup lang="ts">
import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@moduix/vue/progress-linear';

const translations = {
  value: ({ value, max }: { value: number | null; max: number }) =>
    value === null ? 'Loading...' : `${value} of ${max} items loaded`,
};
</script>

<template>
  <ProgressLinear :translations="translations">
    <ProgressLinearLabel>Migration</ProgressLinearLabel>
    <ProgressLinearContext v-slot="state">
      <ProgressLinearValueText>{{ state.valueAsString }}</ProgressLinearValueText>
    </ProgressLinearContext>
    <ProgressLinearTrack aria-label="Migration">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</template>