import { Timer, useTimer } from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/timer/timer-root-provider.module.css';

export default function RootProviderTimerDemo() {
  const timer = useTimer({
    targetMs: 60 * 60 * 1000,
  });
  return (
    <>
      <Timer.RootProvider value={timer}>
        <Timer.Area>
          <span className={styles.itemGroup}>
            <Timer.Item type="hours" />
            <span className={styles.itemLabel}>hours</span>
          </span>
          <Timer.Separator>:</Timer.Separator>
          <span className={styles.itemGroup}>
            <Timer.Item type="minutes" />
            <span className={styles.itemLabel}>minutes</span>
          </span>
          <Timer.Separator>:</Timer.Separator>
          <span className={styles.itemGroup}>
            <Timer.Item type="seconds" />
            <span className={styles.itemLabel}>seconds</span>
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
      <PreviewMeta>
        <output>Progress: {timer.progressPercent.toFixed(0)}%</output>
      </PreviewMeta>
    </>
  );
}