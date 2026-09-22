import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const ProgressLinear = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(function ProgressLinear({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'box-border grid w-48 max-w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 text-foreground data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        className,
      )}
      {...props}
      data-slot="progress-linear-root"
    />
  );
});

const ProgressLinearRootProvider = forwardRef<
  ComponentRef<typeof ProgressPrimitive.RootProvider>,
  ComponentProps<typeof ProgressPrimitive.RootProvider>
>(function ProgressLinearRootProvider({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.RootProvider
      ref={ref}
      className={cn(
        'box-border grid w-48 max-w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 text-foreground data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        className,
      )}
      {...props}
      data-slot="progress-linear-root-provider"
    />
  );
});

const ProgressLinearLabel = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Label>,
  ComponentProps<typeof ProgressPrimitive.Label>
>(function ProgressLinearLabel({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Label
      ref={ref}
      className={cn(
        'min-w-0 text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current',
        className,
      )}
      {...props}
      data-slot="progress-linear-label"
    />
  );
});

const ProgressLinearValueText = forwardRef<
  ComponentRef<typeof ProgressPrimitive.ValueText>,
  ComponentProps<typeof ProgressPrimitive.ValueText>
>(function ProgressLinearValueText({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.ValueText
      ref={ref}
      className={cn(
        'min-w-0 justify-self-end text-end text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current',
        className,
      )}
      {...props}
      data-slot="progress-linear-value-text"
    />
  );
});

const ProgressLinearTrack = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Track>,
  ComponentProps<typeof ProgressPrimitive.Track>
>(function ProgressLinearTrack({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Track
      ref={ref}
      className={cn(
        'col-span-full box-border block h-2 w-full overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-[orientation=vertical]:flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:items-end data-[orientation=vertical]:justify-self-center',
        className,
      )}
      {...props}
      data-slot="progress-linear-track"
    />
  );
});

const ProgressLinearRange = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Range>,
  ComponentProps<typeof ProgressPrimitive.Range>
>(function ProgressLinearRange({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Range
      ref={ref}
      className={cn(
        'block h-full rounded-[inherit] bg-primary transition-[width,height] duration-200 ease-in-out data-[orientation=vertical]:w-full data-[state=indeterminate]:w-[35%] data-[state=indeterminate]:animate-moduix-progress-linear-indeterminate data-[state=indeterminate]:data-[orientation=vertical]:h-[35%] data-[state=indeterminate]:data-[orientation=vertical]:animate-moduix-progress-linear-indeterminate-vertical motion-reduce:data-[state=indeterminate]:translate-x-0 motion-reduce:data-[state=indeterminate]:translate-y-0 motion-reduce:data-[state=indeterminate]:animate-none rtl:data-[state=indeterminate]:data-[orientation=horizontal]:[animation-direction:reverse]',
        className,
      )}
      {...props}
      data-slot="progress-linear-range"
    />
  );
});

const ProgressLinearView = forwardRef<
  ComponentRef<typeof ProgressPrimitive.View>,
  ComponentProps<typeof ProgressPrimitive.View>
>(function ProgressLinearView({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.View
      ref={ref}
      className={cn('contents', className)}
      {...props}
      data-slot="progress-linear-view"
    />
  );
});

const ProgressLinearContext = ProgressPrimitive.Context;

export {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  ProgressLinearView,
  useProgress,
  useProgressContext,
};
