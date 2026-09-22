import { Timer as TimerPrimitive, useTimer, useTimerContext } from '@ark-ui/solid/timer';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { Index, splitProps } from 'solid-js';
import styles from './Timer.module.css';

function Timer(props: ComponentProps<typeof TimerPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="timer-root"
    />
  );
}

function TimerRootProvider(props: ComponentProps<typeof TimerPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="timer-root-provider"
    />
  );
}

function TimerArea(props: ComponentProps<typeof TimerPrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Area
      class={clsx(styles.area, local.class)}
      {...others}
      data-slot="timer-area"
    />
  );
}

function TimerItem(props: ComponentProps<typeof TimerPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="timer-item"
    />
  );
}

function TimerSeparator(props: ComponentProps<typeof TimerPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Separator
      class={clsx(styles.separator, local.class)}
      {...others}
      data-slot="timer-separator"
    />
  );
}

function TimerControl(props: ComponentProps<typeof TimerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="timer-control"
    />
  );
}

function TimerActionTrigger(props: ComponentProps<typeof TimerPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.ActionTrigger
      class={clsx(styles.actionTrigger, local.class)}
      {...others}
      data-slot="timer-action-trigger"
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

const TimerContext = TimerPrimitive.Context;

export {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerItem,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
  type TimerSegmentsProps,
  useTimer,
  useTimerContext,
};