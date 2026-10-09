<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  useProgress,
} from '@moduix/vue/progress-circular';
import styles from '@/components/examples/progress-circular/component-root-provider.module.css';

const progress = useProgress({ defaultValue: 58 });
</script>

<template>
  <ProgressCircularRootProvider :value="progress">
    <ProgressCircularLabel>Team rollout</ProgressCircularLabel>
    <div :class="styles.circleContainer">
      <ProgressCircularCircle aria-label="Team rollout">
        <ProgressCircularCircleTrack />
        <ProgressCircularCircleRange />
      </ProgressCircularCircle>
      <ProgressCircularValueText />
    </div>
  </ProgressCircularRootProvider>
  <div>
    <output>Progress: {{ progress.valueAsString }}</output>
    <Button type="button" @click="progress.setToMax">Complete rollout</Button>
  </div>
</template>