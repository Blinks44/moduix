<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
  ProgressCircularValueText,
  ProgressCircularView,
} from '@moduix/vue/progress-circular';
import styles from '@/components/examples/progress-circular/component-state-views.module.css';

const progressCircularStateMessages = {
  indeterminate: 'Waiting for source data',
  loading: 'Transfer in progress',
  complete: 'Export complete',
};
</script>

<template>
  <ProgressCircular :default-value="null">
    <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
    <div :class="styles.circleContainer">
      <ProgressCircularCircle aria-label="Preparing report">
        <ProgressCircularCircleTrack />
        <ProgressCircularCircleRange />
      </ProgressCircularCircle>
      <ProgressCircularValueText />
    </div>
    <ProgressCircularView :class="styles.state" state="indeterminate">
      {{ progressCircularStateMessages.indeterminate }}
    </ProgressCircularView>
    <ProgressCircularView :class="styles.state" state="loading">
      {{ progressCircularStateMessages.loading }}
    </ProgressCircularView>
    <ProgressCircularView :class="styles.state" state="complete">
      {{ progressCircularStateMessages.complete }}
    </ProgressCircularView>
  </ProgressCircular>
</template>