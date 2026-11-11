<script lang="ts">
  import { TimerActionTrigger, TimerControl } from '@/components/timer';
  import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui';

  let { actionClassName }: { actionClassName?: string } = $props();
</script>

<TimerControl>
  <TimerActionTrigger action="start" class={actionClassName}><PlayIcon /> Start</TimerActionTrigger>
  <TimerActionTrigger action="resume" class={actionClassName}>
    <PlayIcon /> Resume
  </TimerActionTrigger>
  <TimerActionTrigger action="pause" class={actionClassName}>
    <PauseIcon /> Pause
  </TimerActionTrigger>
  <TimerActionTrigger action="reset" class={actionClassName}>
    <RotateCcwIcon /> Reset
  </TimerActionTrigger>
</TimerControl>