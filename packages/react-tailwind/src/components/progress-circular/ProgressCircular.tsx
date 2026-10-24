'use client';

import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const ProgressCircular = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(function ProgressCircular({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('inline-grid w-max max-w-full justify-items-center gap-2', className)}
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
      className={cn('inline-grid w-max max-w-full justify-items-center gap-2', className)}
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
      className={cn('text-center text-sm wrap-anywhere', className)}
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
      className={cn('text-center text-sm font-medium wrap-anywhere', className)}
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
      className={cn('block [--size:var(--spacing-control-xl)] [--thickness:0.4rem]', className)}
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
        'stroke-primary transition-[stroke-dashoffset] duration-normal ease-in-out [stroke-linecap:round] data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate data-[state=indeterminate]:[stroke-dasharray:calc(var(--circumference)/4)_var(--circumference)] motion-reduce:data-[state=indeterminate]:animate-none',
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
>(function ProgressCircularView(props, ref) {
  return <ProgressPrimitive.View ref={ref} {...props} data-slot="progress-circular-view" />;
});

const ProgressCircularContext = ProgressPrimitive.Context;

export {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  ProgressCircularView,
  useProgress,
  useProgressContext,
};
export type {
  ProgressCircleProps,
  ProgressCircleRangeProps,
  ProgressCircleTrackProps,
  ProgressContextProps,
  ProgressLabelProps,
  ProgressRootProps,
  ProgressRootProviderProps,
  ProgressValueChangeDetails,
  ProgressValueTextProps,
  ProgressValueTranslationDetails,
  ProgressViewProps,
  UseProgressContext,
  UseProgressProps,
  UseProgressReturn,
} from '@ark-ui/react/progress';