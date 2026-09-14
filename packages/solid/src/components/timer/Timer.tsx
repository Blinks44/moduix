import { Timer as TimerPrimitive, useTimer, useTimerContext } from '@ark-ui/solid/timer';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { Index, splitProps } from 'solid-js';
import styles from './Timer.module.css';

function TimerRoot(props: ComponentProps<typeof TimerPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Root
      data-slot="timer-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function TimerRootProvider(props: ComponentProps<typeof TimerPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.RootProvider
      data-slot="timer-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function TimerArea(props: ComponentProps<typeof TimerPrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Area
      data-slot="timer-area"
      class={clsx(styles.area, local.class)}
      {...others}
    />
  );
}

function TimerItem(props: ComponentProps<typeof TimerPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Item
      data-slot="timer-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function TimerSeparator(props: ComponentProps<typeof TimerPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Separator
      data-slot="timer-separator"
      class={clsx(styles.separator, local.class)}
      {...others}
    />
  );
}

function TimerControl(props: ComponentProps<typeof TimerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Control
      data-slot="timer-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function TimerActionTrigger(props: ComponentProps<typeof TimerPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.ActionTrigger
      data-slot="timer-action-trigger"
      class={clsx(styles.actionTrigger, local.class)}
      {...others}
    />
  );
}

type TimerSegmentsProps = Omit<
  ComponentProps<typeof TimerPrimitive.Area>,
  'asChild' | 'children'
> & {
  separator?: JSX.Element;
  types?: ComponentProps<typeof TimerPrimitive.Item>['type'][];
};

const defaultTimerSegmentTypes = ['hours', 'minutes', 'seconds'] satisfies ComponentProps<
  typeof TimerPrimitive.Item
>['type'][];

function TimerSegments(props: TimerSegmentsProps) {
  const [local, others] = splitProps(props, ['separator', 'types']);
  const segmentTypes = () => local.types ?? defaultTimerSegmentTypes;

  return (
    <TimerArea {...others}>
      <Index each={segmentTypes()}>
        {(type, index) => (
          <>
            <TimerItem type={type()} />
            {index < segmentTypes().length - 1 && (
              <TimerSeparator>{local.separator ?? ':'}</TimerSeparator>
            )}
          </>
        )}
      </Index>
    </TimerArea>
  );
}

const Timer = Object.assign(TimerRoot, {
  Root: TimerRoot,
  RootProvider: TimerRootProvider,
  Area: TimerArea,
  Item: TimerItem,
  Separator: TimerSeparator,
  Control: TimerControl,
  ActionTrigger: TimerActionTrigger,
  Context: TimerPrimitive.Context,
  Segments: TimerSegments,
});

export { Timer, type TimerSegmentsProps, useTimer, useTimerContext };