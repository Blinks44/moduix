<script lang="ts">
  import { TimerActionTrigger, TimerControl } from '@/components/timer';
  import { UiIcon } from '@/lib/moduix/icons/ui';
</script>

<TimerControl>
  <TimerActionTrigger action="start"><UiIcon icon="play" /> Start</TimerActionTrigger>
  <TimerActionTrigger action="resume"><UiIcon icon="play" /> Resume</TimerActionTrigger>
  <TimerActionTrigger action="pause"><UiIcon icon="pause" /> Pause</TimerActionTrigger>
  <TimerActionTrigger action="reset"><UiIcon icon="rotate-ccw" /> Reset</TimerActionTrigger>
</TimerControl>