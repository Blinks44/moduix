import {
  TimerRootProvider,
  TimerArea,
  TimerItem,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
  useTimer,
} from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/timer/timer-root-provider.module.css';

export default function RootProviderTimerDemo() {
  const timer = useTimer({
    targetMs: 60 * 60 * 1000,
  });
  return (
    <>
      <TimerRootProvider value={timer}>
        <TimerArea>
          <span className={styles.itemGroup}>
            <TimerItem type="hours" />
            <span className={styles.itemLabel}>hours</span>
          </span>
          <TimerSeparator>:</TimerSeparator>
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
      </TimerRootProvider>
      <PreviewMeta>
        <output>Progress: {(timer.progressPercent * 100).toFixed(0)}%</output>
      </PreviewMeta>
    </>
  );
}
