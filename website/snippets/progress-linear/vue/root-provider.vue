<script setup lang="ts">
import {
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  useProgress,
} from '@moduix/vue/progress-linear';

const progress = useProgress({ defaultValue: 58 });
</script>

<template>
  <ProgressLinearRootProvider :value="progress">
    <ProgressLinearLabel>Team rollout</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Team rollout">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinearRootProvider>
</template>