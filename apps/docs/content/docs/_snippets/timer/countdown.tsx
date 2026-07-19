/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Timer } from '@moduix/react';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';

export function CountdownTimerDemo() {
  return (
    <Timer countdown startMs={10 * 60 * 1000}>
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

//#endregion