import { Timer, TimerArea, TimerItem, TimerControl, TimerActionTrigger } from '@moduix/react/timer';
import { Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/timer/timer-events.module.css';

export default function EventsTimerDemo() {
  const [ticks, setTicks] = useState(0);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <Timer
        targetMs={10 * 1000}
        onTick={() => setTicks((value) => value + 1)}
        onComplete={() => setComplete(true)}
      >
        <TimerArea>
          <span className={styles.itemGroup}>
            <TimerItem type="seconds" />
            <span className={styles.itemLabel}>seconds</span>
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
      <PreviewMeta>
        <output>
          Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}
        </output>
      </PreviewMeta>
    </>
  );
}