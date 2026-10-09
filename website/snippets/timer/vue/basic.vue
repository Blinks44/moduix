<script setup lang="ts">
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from '@lucide/vue';
import { Timer, TimerActionTrigger, TimerControl, TimerSegments } from '@moduix/vue/timer';
</script>

<template>
  <Timer :target-ms="60 * 60 * 1000" :start-ms="40 * 60 * 1000">
    <TimerSegments />
    <TimerControl>
      <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="resume"><PlayIcon /> Resume</TimerActionTrigger>
      <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
    </TimerControl>
  </Timer>
</template>