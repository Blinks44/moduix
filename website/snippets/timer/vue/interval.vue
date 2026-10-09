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
import styles from '@/components/examples/timer/timer-interval.module.css';
</script>

<template>
  <Timer :interval="100" :target-ms="60 * 1000">
    <TimerArea>
      <span :class="styles.itemGroup">
        <TimerItem type="seconds" />
        <span :class="styles.itemLabel">seconds</span>
      </span>
      <TimerSeparator>.</TimerSeparator>
      <span :class="styles.itemGroup">
        <TimerItem type="milliseconds" />
        <span :class="styles.itemLabel">ms</span>
      </span>
    </TimerArea>
    <TimerControl>
      <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
    </TimerControl>
  </Timer>
</template>