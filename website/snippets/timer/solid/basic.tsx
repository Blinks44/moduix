import {
  Timer,
  TimerSegments,
  TimerControl,
  TimerActionTrigger,
} from '@moduix/solid/timer';
import { Pause as PauseIcon, Play as PlayIcon, RotateCcw as RotateCcwIcon } from 'lucide-solid';

export default function TimerDemo() {
  return (
    <Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
      <TimerSegments />
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
