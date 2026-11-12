<script lang="ts">
  import PauseIcon from '@lucide/svelte/icons/pause';
  import PlayIcon from '@lucide/svelte/icons/play';
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import {
    TimerActionTrigger,
    TimerArea,
    TimerControl,
    TimerItem,
    TimerRootProvider,
    TimerSeparator,
    useTimer,
  } from '@moduix/svelte/timer';
  import styles from '@/components/examples/timer/timer-root-provider.module.css';

  const id = $props.id();
  const timer = useTimer({
    id,
    targetMs: 60 * 60 * 1000,
  });
</script>

<TimerRootProvider value={timer}>
  <TimerArea>
    <span class={styles.itemGroup}>
      <TimerItem type="hours" />
      <span class={styles.itemLabel}>hours</span>
    </span>
    <TimerSeparator>:</TimerSeparator>
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
</TimerRootProvider>
<div data-preview-meta>
  <output>Progress: {(timer().progressPercent * 100).toFixed(0)}%</output>
</div>