import {
  Timer,
  TimerArea,
  TimerItem,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
} from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import styles from '@/components/examples/timer/timer-interval.module.css';

export default function IntervalTimerDemo() {
  return (
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
        <TimerActionTrigger action="start">
          <PlayIcon /> Start
        </TimerActionTrigger>
        <TimerActionTrigger action="pause">
          <PauseIcon /> Pause
        </TimerActionTrigger>
        <TimerActionTrigger action="reset">
          <RotateCcwIcon /> Reset
        </TimerActionTrigger>
      </TimerControl>
    </Timer>
  );
}
