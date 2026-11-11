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
  import styles from '@/components/examples/timer/timer-countdown.module.css';
</script>

<Timer countdown startMs={10 * 60 * 1000}>
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