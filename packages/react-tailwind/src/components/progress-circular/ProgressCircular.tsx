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
      data-slot="progress-circular-root"
      className={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        className,
      )}
      {...props}
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
      data-slot="progress-circular-root-provider"
      className={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        className,
      )}
      {...props}
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
      data-slot="progress-circular-label"
      className={cn(
        'max-w-full min-w-0 text-center text-sm font-regular [overflow-wrap:anywhere]',
        className,
      )}
      {...props}
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
      data-slot="progress-circular-value-text"
      className={cn(
        'max-w-full min-w-0 text-center text-sm font-medium [overflow-wrap:anywhere]',
        className,
      )}
      {...props}
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
      data-slot="progress-circular-circle"
      className={cn(
        'block overflow-visible [--size:var(--spacing-control-xl)] [--thickness:0.4rem]',
        className,
      )}
      {...props}
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
      data-slot="progress-circular-circle-track"
      className={cn('stroke-muted', className)}
      {...props}
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
      data-slot="progress-circular-circle-range"
      className={cn(
        'origin-center stroke-primary transition-[stroke-dashoffset] duration-200 ease-in-out [stroke-linecap:round] [transform-box:fill-box] data-[state=indeterminate]:animate-[moduix-spin_1.4s_linear_infinite] data-[state=indeterminate]:[stroke-dasharray:1_200] motion-reduce:transition-none motion-reduce:data-[state=indeterminate]:animate-none motion-reduce:data-[state=indeterminate]:[stroke-dasharray:20_200]',
        className,
      )}
      {...props}
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
      data-slot="progress-circular-view"
      className={cn('contents', className)}
      {...props}
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