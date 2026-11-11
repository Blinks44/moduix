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
  import styles from '@/components/examples/timer/timer-interval.module.css';
</script>

<Timer interval={100} targetMs={60 * 1000}>
  <TimerArea>
    <span class={styles.itemGroup}>
      <TimerItem type="seconds" />
      <span class={styles.itemLabel}>seconds</span>
    </span>
    <TimerSeparator>.</TimerSeparator>
    <span class={styles.itemGroup}>
      <TimerItem type="milliseconds" />
      <span class={styles.itemLabel}>ms</span>
    </span>
  </TimerArea>
  <TimerControl>
    <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
    <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
    <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
  </TimerControl>
</Timer>