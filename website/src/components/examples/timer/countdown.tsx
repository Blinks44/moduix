import { Timer } from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import styles from '@/components/examples/timer/timer-countdown.module.css';

export default function CountdownTimerDemo() {
  return (
    <Timer countdown startMs={10 * 60 * 1000}>
      <Timer.Area>
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
    </Timer>
  );
}