import { Timer } from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import styles from '@/components/examples/timer/timer-interval.module.css';

export default function IntervalTimerDemo() {
  return (
    <Timer interval={100} targetMs={60 * 1000}>
      <Timer.Area>
        <span class={styles.itemGroup}>
          <Timer.Item type="seconds" />
          <span class={styles.itemLabel}>seconds</span>
        </span>
        <Timer.Separator>.</Timer.Separator>
        <span class={styles.itemGroup}>
          <Timer.Item type="milliseconds" />
          <span class={styles.itemLabel}>ms</span>
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