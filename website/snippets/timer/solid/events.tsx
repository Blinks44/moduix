import { Timer } from '@moduix/solid/timer';
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
        <Timer.Area>
          <span class={styles.itemGroup}>
            <Timer.Item type="seconds" />
            <span class={styles.itemLabel}>seconds</span>
          </span>
        </Timer.Area>
        <Timer.Control>
          <Timer.ActionTrigger action="start">
            <PlayIcon /> Start
          </Timer.ActionTrigger>
          <Timer.ActionTrigger action="reset">
            <RotateCcwIcon /> Reset
          </Timer.ActionTrigger>
        </Timer.Control>
      </Timer>
      <output>
        Ticks: {ticks()} / {complete() ? 'Complete' : 'Running target'}
      </output>
    </>
  );
}