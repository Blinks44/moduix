<script setup lang="ts">
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from '@lucide/vue';
import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerControl,
  TimerItem,
  TimerSeparator,
} from '@moduix/vue/timer';
import { ref } from 'vue';
import styles from '@/components/examples/timer/timer-pomodoro.module.css';

const mode = ref<'work' | 'break'>('work');

const toggleMode = () => {
  mode.value = mode.value === 'work' ? 'break' : 'work';
};
</script>

<template>
  <Timer
    :key="mode"
    countdown
    :start-ms="mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000"
    @complete="toggleMode"
  >
    <TimerArea>
      <span :class="styles.itemGroup">
        <TimerItem type="minutes" />
        <span :class="styles.itemLabel">minutes</span>
      </span>
      <TimerSeparator>:</TimerSeparator>
      <span :class="styles.itemGroup">
        <TimerItem type="seconds" />
        <span :class="styles.itemLabel">seconds</span>
      </span>
    </TimerArea>
    <TimerControl>
      <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
    </TimerControl>
  </Timer>
  <output>Mode: {{ mode === 'work' ? 'Focus session' : 'Break session' }}</output>
</template>