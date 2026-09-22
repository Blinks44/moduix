import {
  TimerRootProvider,
  TimerArea,
  TimerItem,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
  useTimer,
} from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import styles from '@/components/examples/timer/timer-root-provider.module.css';

export default function RootProviderTimerDemo() {
  const timer = useTimer({
    targetMs: 60 * 60 * 1000,
  });

  return (
    <>
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
      </TimerRootProvider>
      <output>Progress: {(timer().progressPercent * 100).toFixed(0)}%</output>
    </>
  );
}
