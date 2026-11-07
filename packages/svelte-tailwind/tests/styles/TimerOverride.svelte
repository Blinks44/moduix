<script lang="ts">
  import {
    Timer,
    TimerActionTrigger,
    TimerArea,
    TimerControl,
    TimerItem,
    TimerSeparator,
  } from '@/components/timer';
</script>

<Timer class="block gap-6 text-primary" targetMs={60000}>
  <TimerArea class="text-lg">
    <TimerItem class="min-w-0" type="minutes" />
    <TimerSeparator class="text-primary">:</TimerSeparator>
  </TimerArea>
  <TimerControl>
    <TimerActionTrigger class="rounded-full bg-primary" action="start">Start</TimerActionTrigger>
  </TimerControl>
</Timer>