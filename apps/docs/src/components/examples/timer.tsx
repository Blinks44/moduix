import { Timer as TimerPrimitive, useTimer } from '@ark-ui/react/timer';
import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

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

export const timerCssProperties: CssPropertyInput[] = [
  ['--timer-color', 'var(--color-foreground)', 'Controls the timer text color.'],
  ['--timer-gap', 'var(--spacing-3)', 'Controls the gap between timer sections.'],
  ['--timer-width', 'max-content', 'Controls the timer root width.'],
  ['--timer-area-gap', 'var(--spacing-1)', 'Controls the gap between time items.'],
  ['--timer-area-font-size', 'var(--text-2xl)', 'Controls the time display font size.'],
  ['--timer-area-font-weight', 'var(--weight-semibold)', 'Controls the time display font weight.'],
  [
    '--timer-area-line-height',
    'var(--line-height-heading-sm)',
    'Controls the time display line height.',
  ],
  ['--timer-item-color', 'currentColor', 'Controls time item color.'],
  ['--timer-item-min-width', '2ch', 'Controls the minimum width of each time item.'],
  ['--timer-item-text-align', 'center', 'Controls time item text alignment.'],
  ['--timer-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  ['--timer-control-gap', 'var(--spacing-2)', 'Controls the gap between action triggers.'],
  ['--timer-action-trigger-bg', 'var(--color-background)', 'Controls action trigger background.'],
  [
    '--timer-action-trigger-bg-hover',
    'var(--color-accent)',
    'Controls action trigger hover background.',
  ],
  [
    '--timer-action-trigger-border-color',
    'var(--color-border)',
    'Controls action trigger border color.',
  ],
  [
    '--timer-action-trigger-border-width',
    'var(--border-width-sm)',
    'Controls action trigger border width.',
  ],
  [
    '--timer-action-trigger-color',
    'var(--color-foreground)',
    'Controls action trigger text color.',
  ],
  [
    '--timer-action-trigger-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled action trigger opacity.',
  ],
  [
    '--timer-action-trigger-focus-ring-color',
    'var(--color-ring)',
    'Controls action trigger focus ring color.',
  ],
  [
    '--timer-action-trigger-focus-ring-offset',
    '-1px',
    'Controls action trigger focus ring offset.',
  ],
  [
    '--timer-action-trigger-focus-ring-width',
    'var(--border-width-md)',
    'Controls action trigger focus ring width.',
  ],
  ['--timer-action-trigger-font-size', 'var(--text-sm)', 'Controls action trigger font size.'],
  [
    '--timer-action-trigger-font-weight',
    'var(--weight-medium)',
    'Controls action trigger font weight.',
  ],
  ['--timer-action-trigger-gap', 'var(--spacing-2)', 'Controls action trigger content gap.'],
  ['--timer-action-trigger-height', 'var(--size-md)', 'Controls action trigger minimum height.'],
  ['--timer-action-trigger-icon-size', '1rem', 'Controls icons inside action triggers.'],
  [
    '--timer-action-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls action trigger line height.',
  ],
  ['--timer-action-trigger-padding-x', '0.75rem', 'Controls horizontal trigger padding.'],
  ['--timer-action-trigger-padding-y', '0.375rem', 'Controls vertical trigger padding.'],
  ['--timer-action-trigger-radius', 'var(--radius-md)', 'Controls action trigger radius.'],
  [
    '--timer-action-trigger-transition',
    'var(--transition-default)',
    'Controls action trigger transitions.',
  ],
];

const timerCssPropertiesReference = timerCssProperties.map(normalizeCssProperty);

export function TimerCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={timerCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

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
  import { Timer as TimerPrimitive, useTimer } from "@ark-ui/react/timer";
  import { PauseIcon, PlayIcon, RotateCcwIcon, Timer } from "@moduix/react";

  export function RootProviderTimerDemo() {
    const timer = useTimer({ targetMs: 60 * 60 * 1000 });

    return (
      <Timer.RootProvider value={timer}>
        <TimerPrimitive.Context>
          {(api) => <p className="timer-note">Progress: {api.progressPercent.toFixed(0)}%</p>}
        </TimerPrimitive.Context>
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
      <TimerPrimitive.Context>
        {(api) => <p className="timer-note">Progress: {api.progressPercent.toFixed(0)}%</p>}
      </TimerPrimitive.Context>
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