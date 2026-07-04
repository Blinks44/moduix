/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from '@moduix/react';

export function TimerDemo() {
  return (
    <Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
      <Timer.Area>
        <span className="timer-item-group">
          <Timer.Item type="days" />
          <span className="timer-item-label">days</span>
        </span>
        <Timer.Separator>:</Timer.Separator>
        <span className="timer-item-group">
          <Timer.Item type="hours" />
          <span className="timer-item-label">hours</span>
        </span>
        <Timer.Separator>:</Timer.Separator>
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