import { Timer } from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import styles from '@/components/examples/timer/timer-interval.module.css';

export default function IntervalTimerDemo() {
  return (
    <Timer interval={100} targetMs={60 * 1000}>
      <Timer.Area>
        <span className={styles.itemGroup}>
          <Timer.Item type="seconds" />
          <span className={styles.itemLabel}>seconds</span>
        </span>
        <Timer.Separator>.</Timer.Separator>
        <span className={styles.itemGroup}>
          <Timer.Item type="milliseconds" />
          <span className={styles.itemLabel}>ms</span>
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
    </Timer>
  );
}