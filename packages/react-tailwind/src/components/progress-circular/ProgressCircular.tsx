'use client';

import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const ProgressCircularRoot = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(function ProgressCircularRoot({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        className,
      )}
      {...props}
      data-slot="progress-circular-root"
    />
  );
});

const ProgressCircularRootProvider = forwardRef<
  ComponentRef<typeof ProgressPrimitive.RootProvider>,
  ComponentProps<typeof ProgressPrimitive.RootProvider>
>(function ProgressCircularRootProvider({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.RootProvider
      ref={ref}
      className={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        className,
      )}
      {...props}
      data-slot="progress-circular-root-provider"
    />
  );
});

const ProgressCircularLabel = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Label>,
  ComponentProps<typeof ProgressPrimitive.Label>
>(function ProgressCircularLabel({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Label
      ref={ref}
      className={cn('max-w-full min-w-0 text-center text-sm font-regular wrap-anywhere', className)}
      {...props}
      data-slot="progress-circular-label"
    />
  );
});

const ProgressCircularValueText = forwardRef<
  ComponentRef<typeof ProgressPrimitive.ValueText>,
  ComponentProps<typeof ProgressPrimitive.ValueText>
>(function ProgressCircularValueText({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.ValueText
      ref={ref}
      className={cn('max-w-full min-w-0 text-center text-sm font-medium wrap-anywhere', className)}
      {...props}
      data-slot="progress-circular-value-text"
    />
  );
});

const ProgressCircularCircle = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Circle>,
  ComponentProps<typeof ProgressPrimitive.Circle>
>(function ProgressCircularCircle({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Circle
      ref={ref}
      className={cn(
        'block overflow-visible [--size:var(--spacing-control-xl)] [--thickness:0.4rem]',
        className,
      )}
      {...props}
      data-slot="progress-circular-circle"
    />
  );
});

const ProgressCircularCircleTrack = forwardRef<
  ComponentRef<typeof ProgressPrimitive.CircleTrack>,
  ComponentProps<typeof ProgressPrimitive.CircleTrack>
>(function ProgressCircularCircleTrack({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.CircleTrack
      ref={ref}
      className={cn('stroke-muted', className)}
      {...props}
      data-slot="progress-circular-circle-track"
    />
  );
});

const ProgressCircularCircleRange = forwardRef<
  ComponentRef<typeof ProgressPrimitive.CircleRange>,
  ComponentProps<typeof ProgressPrimitive.CircleRange>
>(function ProgressCircularCircleRange({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.CircleRange
      ref={ref}
      className={cn(
        'origin-center stroke-primary transition-[stroke-dashoffset] duration-200 ease-in-out [stroke-linecap:round] [transform-box:fill-box] data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate data-[state=indeterminate]:[stroke-dasharray:1_200] motion-reduce:transition-none motion-reduce:data-[state=indeterminate]:animate-none motion-reduce:data-[state=indeterminate]:[stroke-dasharray:20_200]',
        className,
      )}
      {...props}
      data-slot="progress-circular-circle-range"
    />
  );
});

type ProgressCircularRingProps = Omit<
  ComponentProps<typeof ProgressPrimitive.Circle>,
  'asChild' | 'children'
>;

const ProgressCircularRing = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Circle>,
  ProgressCircularRingProps
>(function ProgressCircularRing(props, ref) {
  return (
    <ProgressCircularCircle ref={ref} {...props}>
      <ProgressCircularCircleTrack />
      <ProgressCircularCircleRange />
    </ProgressCircularCircle>
  );
});

const ProgressCircularView = forwardRef<
  ComponentRef<typeof ProgressPrimitive.View>,
  ComponentProps<typeof ProgressPrimitive.View>
>(function ProgressCircularView({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.View
      ref={ref}
      className={cn('contents', className)}
      {...props}
      data-slot="progress-circular-view"
    />
  );
});

const ProgressCircular = Object.assign(ProgressCircularRoot, {
  Root: ProgressCircularRoot,
  RootProvider: ProgressCircularRootProvider,
  Context: ProgressPrimitive.Context,
  Label: ProgressCircularLabel,
  ValueText: ProgressCircularValueText,
  Circle: ProgressCircularCircle,
  CircleTrack: ProgressCircularCircleTrack,
  CircleRange: ProgressCircularCircleRange,
  Ring: ProgressCircularRing,
  View: ProgressCircularView,
  useProgress,
  useProgressContext,
});

export { ProgressCircular };