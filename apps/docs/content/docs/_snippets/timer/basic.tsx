/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Timer } from '@moduix/react';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';

export function TimerDemo() {
  return (
    <Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
      <Timer.Segments types={['days', 'hours', 'minutes', 'seconds']} />
      <Timer.Control>
        <Timer.ActionTrigger action="start">
          <PlayIcon /> Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="resume">
          <PlayIcon /> Resume
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