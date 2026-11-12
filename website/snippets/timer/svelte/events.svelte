<script lang="ts">
  import PlayIcon from '@lucide/svelte/icons/play';
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import {
    Timer,
    TimerActionTrigger,
    TimerArea,
    TimerControl,
    TimerItem,
  } from '@moduix/svelte/timer';
  import styles from '@/components/examples/timer/timer-events.module.css';

  let ticks = $state(0);
  let complete = $state(false);

  const handleTick = () => {
    ticks += 1;
  };

  const handleComplete = () => {
    complete = true;
  };
</script>

<Timer targetMs={10 * 1000} onTick={handleTick} onComplete={handleComplete}>
  <TimerArea>
    <span class={styles.itemGroup}>
      <TimerItem type="seconds" />
      <span class={styles.itemLabel}>seconds</span>
    </span>
  </TimerArea>
  <TimerControl>
    <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
    <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
  </TimerControl>
</Timer>
<div data-preview-meta>
  <output>Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}</output>
</div>