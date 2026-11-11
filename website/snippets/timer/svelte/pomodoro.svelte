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
  import styles from '@/components/examples/timer/timer-pomodoro.module.css';

  let mode = $state<'work' | 'break'>('work');

  const toggleMode = () => {
    mode = mode === 'work' ? 'break' : 'work';
  };
</script>

{#key mode}
  <Timer
    countdown
    startMs={mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000}
    onComplete={toggleMode}
  >
    <TimerArea>
      <span class={styles.itemGroup}>
        <TimerItem type="minutes" />
        <span class={styles.itemLabel}>minutes</span>
      </span>
      <TimerSeparator>:</TimerSeparator>
      <span class={styles.itemGroup}>
        <TimerItem type="seconds" />
        <span class={styles.itemLabel}>seconds</span>
      </span>
    </TimerArea>
    <TimerControl>
      <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
    </TimerControl>
  </Timer>
{/key}
<output>Mode: {mode === 'work' ? 'Focus session' : 'Break session'}</output>