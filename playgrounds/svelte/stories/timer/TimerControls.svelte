<script lang="ts">
  import { TimerActionTrigger, TimerControl } from '@/components/timer';
  import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui';
</script>

<TimerControl>
  <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
  <TimerActionTrigger action="resume"><PlayIcon /> Resume</TimerActionTrigger>
  <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
  <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
</TimerControl>