import { PauseIcon, PlayIcon, RotateCcwIcon, Timer, useTimer } from '@moduix/react';
import { useState, type ComponentProps } from 'react';

export const timerExampleCss = `
  .timer-note {
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
    color: var(--color-muted-foreground);
  }

  .timer-item-group {
    display: inline-grid;
    justify-items: center;
    gap: var(--spacing-1);
  }

  .timer-item-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-regular);
    line-height: var(--line-height-text-xs);
    color: var(--color-muted-foreground);
  }
`;

export const timerCustomStylingCss = `
  .timer-custom {
    --timer-area-font-size: var(--text-3xl);
    --timer-item-color: var(--color-primary);
    --timer-separator-color: var(--color-chart-2);
    --timer-action-trigger-bg: var(--color-muted);
    --timer-action-trigger-border-color: transparent;
  }
`;

export const timerData = `const timerDurations = {
  basic: 60 * 60 * 1000,
  elapsedStart: 40 * 60 * 1000,
  countdown: 10 * 60 * 1000,
  pomodoroWork: 25 * 60 * 1000,
  pomodoroBreak: 5 * 60 * 1000,
};`;

export const timerBasicCode = `
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";

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
`;

export const timerCountdownCode = `
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";

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
`;

export const timerIntervalCode = `
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";

  export function IntervalTimerDemo() {
    return (
      <Timer interval={100} targetMs={60 * 1000}>
        <Timer.Area>
          <span className="timer-item-group">
            <Timer.Item type="seconds" />
            <span className="timer-item-label">seconds</span>
          </span>
          <Timer.Separator>.</Timer.Separator>
          <span className="timer-item-group">
            <Timer.Item type="milliseconds" />
            <span className="timer-item-label">ms</span>
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
`;

export const timerEventsCode = `
  import { PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";
  import { useState } from "react";

  export function EventsTimerDemo() {
    const [ticks, setTicks] = useState(0);
    const [complete, setComplete] = useState(false);

    return (
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
        <p className="timer-note">
          Ticks: {ticks} / {complete ? "Complete" : "Running target"}
        </p>
      </Timer>
    );
  }
`;

export const timerPomodoroCode = `
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";
  import { useState } from "react";

  export function PomodoroTimerDemo() {
    const [mode, setMode] = useState("work" as "work" | "break");
    const targetMs = mode === "work" ? 25 * 60 * 1000 : 5 * 60 * 1000;

    return (
      <Timer
        key={mode}
        countdown
        startMs={targetMs}
        onComplete={() => setMode((value) => (value === "work" ? "break" : "work"))}
      >
        <p className="timer-note">{mode === "work" ? "Focus session" : "Break session"}</p>
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
`;

export const timerRootProviderCode = `
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer, useTimer } from "@moduix/react";

  export function RootProviderTimerDemo() {
    const timer = useTimer({ targetMs: 60 * 60 * 1000 });

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
`;

export const timerCustomStylingCode = `
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";

  export function CustomStylingTimerDemo() {
    return (
      <Timer className="timer-custom" targetMs={15 * 60 * 1000}>
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
`;

function TimerItemGroup({
  label,
  type,
}: {
  label: string;
  type: ComponentProps<typeof Timer.Item>['type'];
}) {
  return (
    <span className="timer-item-group">
      <Timer.Item type={type} />
      <span className="timer-item-label">{label}</span>
    </span>
  );
}

function FullTimerValue() {
  return (
    <Timer.Area>
      <TimerItemGroup type="days" label="days" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="hours" label="hours" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="minutes" label="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="seconds" label="seconds" />
    </Timer.Area>
  );
}

function ShortTimerValue() {
  return (
    <Timer.Area>
      <TimerItemGroup type="minutes" label="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="seconds" label="seconds" />
    </Timer.Area>
  );
}

function TimerControls() {
  return (
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
  );
}

function TimerStartResetControls() {
  return (
    <Timer.Control>
      <Timer.ActionTrigger action="start">
        <PlayIcon /> Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset">
        <RotateCcwIcon /> Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  );
}

export function TimerExample() {
  return (
    <Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
      <FullTimerValue />
      <TimerControls />
    </Timer>
  );
}

export function CountdownTimerExample() {
  return (
    <Timer countdown startMs={10 * 60 * 1000}>
      <ShortTimerValue />
      <TimerControls />
    </Timer>
  );
}

export function IntervalTimerExample() {
  return (
    <Timer interval={100} targetMs={60 * 1000}>
      <Timer.Area>
        <TimerItemGroup type="seconds" label="seconds" />
        <Timer.Separator>.</Timer.Separator>
        <TimerItemGroup type="milliseconds" label="ms" />
      </Timer.Area>
      <TimerControls />
    </Timer>
  );
}

export function EventsTimerExample() {
  const [ticks, setTicks] = useState(0);
  const [complete, setComplete] = useState(false);

  return (
    <Timer
      targetMs={10 * 1000}
      onTick={() => setTicks((value) => value + 1)}
      onComplete={() => setComplete(true)}
    >
      <Timer.Area>
        <TimerItemGroup type="seconds" label="seconds" />
      </Timer.Area>
      <TimerStartResetControls />
      <p className="timer-note">
        Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}
      </p>
    </Timer>
  );
}

export function PomodoroTimerExample() {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const targetMs = mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;

  return (
    <Timer
      key={mode}
      countdown
      startMs={targetMs}
      onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
    >
      <p className="timer-note">{mode === 'work' ? 'Focus session' : 'Break session'}</p>
      <ShortTimerValue />
      <TimerControls />
    </Timer>
  );
}

export function RootProviderTimerExample() {
  const timer = useTimer({ targetMs: 60 * 60 * 1000 });

  return (
    <Timer.RootProvider value={timer}>
      <Timer.Context>
        {(api) => <p className="timer-note">Progress: {api.progressPercent.toFixed(0)}%</p>}
      </Timer.Context>
      <Timer.Area>
        <TimerItemGroup type="hours" label="hours" />
        <Timer.Separator>:</Timer.Separator>
        <TimerItemGroup type="minutes" label="minutes" />
        <Timer.Separator>:</Timer.Separator>
        <TimerItemGroup type="seconds" label="seconds" />
      </Timer.Area>
      <TimerControls />
    </Timer.RootProvider>
  );
}

export function CustomStylingTimerExample() {
  return (
    <Timer className="timer-custom" targetMs={15 * 60 * 1000}>
      <ShortTimerValue />
      <TimerControls />
    </Timer>
  );
}