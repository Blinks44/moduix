'use client';

import { Timer as TimerPrimitive, useTimer, useTimerContext } from '@ark-ui/react/timer';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { Fragment, forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const TimerRoot = forwardRef<
  ComponentRef<typeof TimerPrimitive.Root>,
  ComponentProps<typeof TimerPrimitive.Root>
>(function TimerRoot({ className, ...props }, ref) {
  return (
    <TimerPrimitive.Root
      ref={ref}
      data-slot="timer-root"
      className={cn(
        'inline-grid w-max max-w-full place-items-center gap-3 text-foreground',
        className,
      )}
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
      className={cn(
        'inline-grid w-max max-w-full place-items-center gap-3 text-foreground',
        className,
      )}
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
      className={cn(
        'inline-flex max-w-full min-w-0 flex-wrap items-baseline justify-center gap-1 text-2xl leading-5 font-semibold tracking-normal tabular-nums',
        className,
      )}
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
      className={cn('min-w-[2ch] text-center', className)}
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
      className={cn('text-muted-foreground', className)}
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
      className={cn('inline-flex flex-wrap items-center gap-2', className)}
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
      className={cn(
        'inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition-[background-color,border-color,color,opacity,box-shadow] duration-200 ease-in-out focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
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