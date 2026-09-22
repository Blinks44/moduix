import {
  Timer,
  TimerArea,
  TimerItem,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
} from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/timer/timer-pomodoro.module.css';

export default function PomodoroTimerDemo() {
  const [mode, setMode] = createSignal<'work' | 'break'>('work');
  const targetMs = () => (mode() === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000);

  return (
    <>
      <Timer
        countdown
        startMs={targetMs()}
        onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
      >
        <TimerArea>
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
      </Timer>
      <output>Mode: {mode() === 'work' ? 'Focus session' : 'Break session'}</output>
    </>
  );
}
