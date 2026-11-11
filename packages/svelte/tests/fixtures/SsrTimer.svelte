<script lang="ts">
  import { Timer, TimerActionTrigger, TimerControl, TimerSegments } from '@/components/timer';
</script>

<Timer targetMs={60000}>
  <TimerSegments />
  <TimerControl>
    <TimerActionTrigger action="start">Start</TimerActionTrigger>
  </TimerControl>
</Timer>