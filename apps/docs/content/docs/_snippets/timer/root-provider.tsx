/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PauseIcon, PlayIcon, RotateCcwIcon, Timer, useTimer } from '@moduix/react';

export function RootProviderTimerDemo() {
  const timer = useTimer({
    targetMs: 60 * 60 * 1000,
  });
  return (
    <Timer.RootProvider value={timer}>
      <Timer.Context>
        {(api) => <p className="timer-note">Progress: {api.progressPercent.toFixed(0)}%</p>}
      </Timer.Context>
      <Timer.Area>
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
        <Timer.ActionTrigger action="pause">
          <PauseIcon /> Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="reset">
          <RotateCcwIcon /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>
    </Timer.RootProvider>
  );
}

//#endregion