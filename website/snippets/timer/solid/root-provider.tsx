import { Timer, useTimer } from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import styles from '@/components/examples/timer/timer-root-provider.module.css';

export default function RootProviderTimerDemo() {
  const timer = useTimer({
    targetMs: 60 * 60 * 1000,
  });

  return (
    <>
      <Timer.RootProvider value={timer}>
        <Timer.Area>
          <span class={styles.itemGroup}>
            <Timer.Item type="hours" />
            <span class={styles.itemLabel}>hours</span>
          </span>
          <Timer.Separator>:</Timer.Separator>
          <span class={styles.itemGroup}>
            <Timer.Item type="minutes" />
            <span class={styles.itemLabel}>minutes</span>
          </span>
          <Timer.Separator>:</Timer.Separator>
          <span class={styles.itemGroup}>
            <Timer.Item type="seconds" />
            <span class={styles.itemLabel}>seconds</span>
          </span>
        </Timer.Area>
        <Timer.Control>
          <Timer.ActionTrigger action="start">
            <PlayIcon /> Start
          </Timer.ActionTrigger>
          <Timer.ActionTrigger action="pause">
            <PauseIcon /> Pause
          </Timer.ActionTrigger>
          <Timer.ActionTrigger action="reset">
            <RotateCcwIcon /> Reset
          </Timer.ActionTrigger>
        </Timer.Control>
      </Timer.RootProvider>
      <output>Progress: {(timer().progressPercent * 100).toFixed(0)}%</output>
    </>
  );
}