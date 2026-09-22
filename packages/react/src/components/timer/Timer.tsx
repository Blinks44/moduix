'use client';

import { Timer as TimerPrimitive, useTimer, useTimerContext } from '@ark-ui/react/timer';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { Fragment, forwardRef } from 'react';
import styles from './Timer.module.css';

const Timer = forwardRef<
  ComponentRef<typeof TimerPrimitive.Root>,
  ComponentProps<typeof TimerPrimitive.Root>
>(function Timer({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="timer-root"
    />
  );
});

const TimerRootProvider = forwardRef<
  ComponentRef<typeof TimerPrimitive.RootProvider>,
  ComponentProps<typeof TimerPrimitive.RootProvider>
>(function TimerRootProvider({ className, ...props }, ref) {
  return (
    <TimerPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="timer-root-provider"
    />
  );
});

const TimerArea = forwardRef<
  ComponentRef<typeof TimerPrimitive.Area>,
  ComponentProps<typeof TimerPrimitive.Area>
>(function TimerArea({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Area
      ref={ref}
      className={clsx(styles.area, className)}
      {...props}
      data-slot="timer-area"
    />
  );
});

const TimerItem = forwardRef<
  ComponentRef<typeof TimerPrimitive.Item>,
  ComponentProps<typeof TimerPrimitive.Item>
>(function TimerItem({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
      data-slot="timer-item"
    />
  );
});

const TimerSeparator = forwardRef<
  ComponentRef<typeof TimerPrimitive.Separator>,
  ComponentProps<typeof TimerPrimitive.Separator>
>(function TimerSeparator({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Separator
      ref={ref}
      className={clsx(styles.separator, className)}
      {...props}
      data-slot="timer-separator"
    />
  );
});

const TimerControl = forwardRef<
  ComponentRef<typeof TimerPrimitive.Control>,
  ComponentProps<typeof TimerPrimitive.Control>
>(function TimerControl({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="timer-control"
    />
  );
});

const TimerActionTrigger = forwardRef<
  ComponentRef<typeof TimerPrimitive.ActionTrigger>,
  ComponentProps<typeof TimerPrimitive.ActionTrigger>
>(function TimerActionTrigger({ className, ...props }, ref) {
  return (
    <TimerPrimitive.ActionTrigger
      ref={ref}
      className={clsx(styles.actionTrigger, className)}
      {...props}
      data-slot="timer-action-trigger"
    />
  );
});

type TimerSegmentsProps = Omit<
  ComponentProps<typeof TimerPrimitive.Area>,
  'asChild' | 'children'
> & {
  separator?: ReactNode;
  types?: ComponentProps<typeof TimerPrimitive.Item>['type'][];
};

const defaultTimerSegmentTypes = ['hours', 'minutes', 'seconds'] satisfies ComponentProps<
  typeof TimerPrimitive.Item
>['type'][];

const TimerSegments = forwardRef<ComponentRef<typeof TimerPrimitive.Area>, TimerSegmentsProps>(
  function TimerSegments(
    { separator = ':', types = defaultTimerSegmentTypes, ...props }: TimerSegmentsProps,
    ref,
  ) {
    return (
      <TimerArea ref={ref} {...props}>
        {types.map((type, index) => (
          <Fragment key={`${type}-${index}`}>
            <TimerItem type={type} />
            {index < types.length - 1 && <TimerSeparator>{separator}</TimerSeparator>}
          </Fragment>
        ))}
      </TimerArea>
    );
  },
);

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
