import {
  Timer,
  TimerArea,
  TimerItem,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
} from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/timer/timer-pomodoro.module.css';

export default function PomodoroTimerDemo() {
  const [mode, setMode] = useState('work' as 'work' | 'break');
  const targetMs = mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;
  return (
    <>
      <Timer
        key={mode}
        countdown
        startMs={targetMs}
        onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
      >
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
      <PreviewMeta>
        <output>{mode === 'work' ? 'Mode: Focus session' : 'Mode: Break session'}</output>
      </PreviewMeta>
    </>
  );
}
