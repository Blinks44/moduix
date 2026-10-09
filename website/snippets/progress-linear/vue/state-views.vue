<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
  ProgressLinearView,
} from '@moduix/vue/progress-linear';
import { computed, ref } from 'vue';

const value = ref<number | null>(null);
const state = computed(() =>
  value.value === null ? 'Indeterminate' : value.value === 100 ? 'Complete' : 'Loading',
);
</script>

<template>
  <ProgressLinear v-model="value">
    <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Preparing report">
      <ProgressLinearRange />
    </ProgressLinearTrack>
    <ProgressLinearView state="indeterminate">Waiting for source data</ProgressLinearView>
    <ProgressLinearView state="loading">Transfer in progress</ProgressLinearView>
    <ProgressLinearView state="complete">Export complete</ProgressLinearView>
  </ProgressLinear>
  <output>State: {{ state }}</output>
  <Button type="button" size="sm" variant="outline" @click="value = null">Indeterminate</Button>
  <Button type="button" size="sm" variant="outline" @click="value = 45">Loading</Button>
  <Button type="button" size="sm" variant="outline" @click="value = 100">Complete</Button>
</template>