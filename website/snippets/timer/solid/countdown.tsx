import { Timer } from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import styles from '@/components/examples/timer/timer-countdown.module.css';

export default function CountdownTimerDemo() {
  return (
    <Timer countdown startMs={10 * 60 * 1000}>
      <Timer.Area>
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
    </Timer>
  );
}