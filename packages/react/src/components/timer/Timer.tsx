import type { ComponentProps, ComponentRef } from 'react';
import { Timer as TimerPrimitive } from '@ark-ui/react/timer';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Timer.module.css';

const TimerRoot = forwardRef<
  ComponentRef<typeof TimerPrimitive.Root>,
  ComponentProps<typeof TimerPrimitive.Root>
>(function TimerRoot({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Root
      ref={ref}
      data-slot="timer-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="timer-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="timer-area"
      className={clsx(styles.area, normalizeClassName(className))}
      {...props}
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
      data-slot="timer-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="timer-separator"
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
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
      data-slot="timer-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="timer-action-trigger"
      className={clsx(styles.actionTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const Timer = Object.assign(TimerRoot, {
  Root: TimerRoot,
  RootProvider: TimerRootProvider,
  Area: TimerArea,
  Item: TimerItem,
  Separator: TimerSeparator,
  Control: TimerControl,
  ActionTrigger: TimerActionTrigger,
});

export { Timer };