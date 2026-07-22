import { Timer } from '@moduix/react';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { useState } from 'react';

export default function PomodoroTimerDemo() {
  const [mode, setMode] = useState('work' as 'work' | 'break');
  const targetMs = mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;
  return (
    <Timer
      key={mode}
      countdown
      startMs={targetMs}
      onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
    >
      <p className="timer-note">{mode === 'work' ? 'Focus session' : 'Break session'}</p>
      <Timer.Area>
        <span className="timer-item-group">
          <Timer.Item type="minutes" />
          <span className="timer-item-label">minutes</span>
        </span>
        <Timer.Separator>:</Timer.Separator>
        <span className="timer-item-group">
          <Timer.Item type="seconds" />
          <span className="timer-item-label">seconds</span>
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
  );
}