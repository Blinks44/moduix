import { Timer, TimerArea, TimerItem, TimerControl, TimerActionTrigger } from '@moduix/solid/timer';
import { Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/timer/timer-events.module.css';

export default function EventsTimerDemo() {
  const [ticks, setTicks] = createSignal(0);
  const [complete, setComplete] = createSignal(false);

  return (
    <>
      <Timer
        targetMs={10 * 1000}
        onTick={() => setTicks((value) => value + 1)}
        onComplete={() => setComplete(true)}
      >
        <TimerArea>
          <span class={styles.itemGroup}>
            <TimerItem type="seconds" />
            <span class={styles.itemLabel}>seconds</span>
          </span>
        </TimerArea>
        <TimerControl>
          <TimerActionTrigger action="start">
            <PlayIcon /> Start
          </TimerActionTrigger>
          <TimerActionTrigger action="reset">
            <RotateCcwIcon /> Reset
          </TimerActionTrigger>
        </TimerControl>
      </Timer>
      <output>
        Ticks: {ticks()} / {complete() ? 'Complete' : 'Running target'}
      </output>
    </>
  );
}