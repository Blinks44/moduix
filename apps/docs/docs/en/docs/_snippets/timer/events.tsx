import { Timer } from '@moduix/react/timer';
import { Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
        <Timer.Area>
          <span className="timer-item-group">
            <Timer.Item type="seconds" />
            <span className="timer-item-label">seconds</span>
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
      <PreviewMeta>
        <output>
          Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}
        </output>
      </PreviewMeta>
    </>
  );
}