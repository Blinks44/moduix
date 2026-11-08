<script lang="ts">
  import PauseIcon from '@lucide/svelte/icons/pause';
  import PlayIcon from '@lucide/svelte/icons/play';
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import {
    Timer,
    TimerActionTrigger,
    TimerArea,
    TimerControl,
    TimerItem,
    TimerSeparator,
  } from '@moduix/svelte/timer';
</script>

<Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
  <TimerArea>
    <TimerItem type="hours" />
    <TimerSeparator>:</TimerSeparator>
    <TimerItem type="minutes" />
    <TimerSeparator>:</TimerSeparator>
    <TimerItem type="seconds" />
  </TimerArea>
  <TimerControl>
    <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
    <TimerActionTrigger action="resume"><PlayIcon /> Resume</TimerActionTrigger>
    <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
    <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
  </TimerControl>
</Timer>