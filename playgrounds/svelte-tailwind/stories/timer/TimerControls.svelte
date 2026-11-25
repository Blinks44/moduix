<script lang="ts">
  import { TimerActionTrigger, TimerControl } from '@/components/timer';
  import { UiIcon } from '@/lib/moduix/icons/ui';

  let { actionClassName }: { actionClassName?: string } = $props();
</script>

<TimerControl>
  <TimerActionTrigger action="start" class={actionClassName}
    ><UiIcon icon="play" /> Start</TimerActionTrigger
  >
  <TimerActionTrigger action="resume" class={actionClassName}>
    <UiIcon icon="play" /> Resume
  </TimerActionTrigger>
  <TimerActionTrigger action="pause" class={actionClassName}>
    <UiIcon icon="pause" /> Pause
  </TimerActionTrigger>
  <TimerActionTrigger action="reset" class={actionClassName}>
    <UiIcon icon="rotate-ccw" /> Reset
  </TimerActionTrigger>
</TimerControl>