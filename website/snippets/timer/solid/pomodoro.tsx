import { Timer } from '@moduix/solid/timer';
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
      <output>Mode: {mode() === 'work' ? 'Focus session' : 'Break session'}</output>
    </>
  );
}