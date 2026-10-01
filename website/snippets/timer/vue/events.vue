<script setup lang="ts">
import { Play as PlayIcon, RotateCcw as RotateCcwIcon } from '@lucide/vue';
import { Timer, TimerActionTrigger, TimerArea, TimerControl, TimerItem } from '@moduix/vue/timer';
import { ref } from 'vue';
import styles from '@/components/examples/timer/timer-events.module.css';

const ticks = ref(0);
const complete = ref(false);

const handleTick = () => {
  ticks.value += 1;
};

const handleComplete = () => {
  complete.value = true;
};
</script>

<template>
  <Timer :target-ms="10 * 1000" @tick="handleTick" @complete="handleComplete">
    <TimerArea>
      <span :class="styles.itemGroup">
        <TimerItem type="seconds" />
        <span :class="styles.itemLabel">seconds</span>
      </span>
    </TimerArea>
    <TimerControl>
      <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
    </TimerControl>
  </Timer>
  <output>Ticks: {{ ticks }} / {{ complete ? 'Complete' : 'Running target' }}</output>
</template>