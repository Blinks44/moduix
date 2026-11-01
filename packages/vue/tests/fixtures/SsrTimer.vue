<script setup lang="ts">
import { Timer, TimerSegments, TimerControl, TimerActionTrigger } from '@/components/timer';
</script>

<template>
  <Timer :target-ms="60000"
    ><TimerSegments /><TimerControl
      ><TimerActionTrigger action="start">Start</TimerActionTrigger></TimerControl
    ></Timer
  >
</template>