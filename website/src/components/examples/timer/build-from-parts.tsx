import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerControl,
  TimerItem,
  TimerSeparator,
} from '@moduix/react/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';

export default function BuildFromPartsTimerDemo() {
  return (
    <Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
      <TimerArea>
        <TimerItem type="hours" />
        <TimerSeparator>:</TimerSeparator>
        <TimerItem type="minutes" />
        <TimerSeparator>:</TimerSeparator>
        <TimerItem type="seconds" />
      </TimerArea>
      <TimerControl>
        <TimerActionTrigger action="start">
          <PlayIcon /> Start
        </TimerActionTrigger>
        <TimerActionTrigger action="resume">
          <PlayIcon /> Resume
        </TimerActionTrigger>
        <TimerActionTrigger action="pause">
          <PauseIcon /> Pause
        </TimerActionTrigger>
        <TimerActionTrigger action="reset">
          <RotateCcwIcon /> Reset
        </TimerActionTrigger>
      </TimerControl>
    </Timer>
  );
}