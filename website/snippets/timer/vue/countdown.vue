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
import styles from '@/components/examples/timer/timer-countdown.module.css';
</script>

<template>
  <Timer countdown :start-ms="10 * 60 * 1000">
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
</template>