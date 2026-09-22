import {
  Timer,
  TimerArea,
  TimerItem,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
} from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import styles from '@/components/examples/timer/timer-countdown.module.css';

export default function CountdownTimerDemo() {
  return (
    <Timer countdown startMs={10 * 60 * 1000}>
      <TimerArea>
        <span className={styles.itemGroup}>
          <TimerItem type="minutes" />
          <span className={styles.itemLabel}>minutes</span>
        </span>
        <TimerSeparator>:</TimerSeparator>
        <span className={styles.itemGroup}>
          <TimerItem type="seconds" />
          <span className={styles.itemLabel}>seconds</span>
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
