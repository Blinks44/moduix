'use client';

import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
} from '@ark-ui/react/angle-slider';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const AngleSliderRoot = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Root>,
  ComponentProps<typeof AngleSliderPrimitive.Root>
>(function AngleSliderRoot({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Root
      ref={ref}
      className={cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="angle-slider-root"
    />
  );
});

const AngleSliderLabel = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Label>,
  ComponentProps<typeof AngleSliderPrimitive.Label>
>(function AngleSliderLabel({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Label
      ref={ref}
      className={cn('text-center text-sm font-medium text-foreground', className)}
      {...props}
      data-slot="angle-slider-label"
    />
  );
});

const AngleSliderRootProvider = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.RootProvider>,
  ComponentProps<typeof AngleSliderPrimitive.RootProvider>
>(function AngleSliderRootProvider({ className, value, ...props }, ref) {
  return (
    <AngleSliderPrimitive.RootProvider
      ref={ref}
      className={cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        className,
      )}
      value={value}
      {...props}
      data-slot="angle-slider-root-provider"
    />
  );
});

const AngleSliderControl = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Control>,
  ComponentProps<typeof AngleSliderPrimitive.Control>
>(function AngleSliderControl({ className, onPointerDown, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Control
      ref={ref}
      className={cn(
        "relative box-border aspect-square w-32 min-w-0 cursor-pointer rounded-full outline-0 select-none [--angle-slider-fill:var(--color-primary)] before:absolute before:inset-0 before:rounded-full before:bg-[conic-gradient(from_0deg,var(--angle-slider-fill)_var(--angle,0deg),var(--color-muted)_var(--angle,0deg))] before:[mask-image:radial-gradient(closest-side,transparent_calc(100%-0.5rem-1px),#000_calc(100%-0.5rem))] before:content-[''] after:absolute after:top-1 after:left-1/2 after:z-1 after:size-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--angle-slider-fill)] after:content-[''] data-disabled:cursor-default data-invalid:[--angle-slider-fill:var(--color-destructive)] data-readonly:cursor-default",
        className,
      )}
      {...props}
      onPointerDown={(event) => {
        onPointerDown?.(event);

        if (event.defaultPrevented || event.button !== 0) return;
        if (event.currentTarget.matches('[data-disabled], [data-readonly]')) return;

        event.preventDefault();
        event.currentTarget
          .querySelector<HTMLElement>('[data-scope="angle-slider"][data-part="thumb"]')
          ?.focus({ preventScroll: true, focusVisible: false });
      }}
      data-slot="angle-slider-control"
    />
  );
});

const AngleSliderThumb = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Thumb>,
  ComponentProps<typeof AngleSliderPrimitive.Thumb>
>(function AngleSliderThumb({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Thumb
      ref={ref}
      className={cn(
        "absolute inset-y-0 left-1/2 z-2 w-0 outline-0 before:absolute before:top-1 before:left-0 before:box-border before:size-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-border before:bg-background before:shadow-sm before:transition-[border-color,background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] focus-visible:before:border-ring focus-visible:before:ring-1 focus-visible:before:ring-ring data-disabled:pointer-events-none data-invalid:before:border-destructive motion-reduce:before:transition-none [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:border-ring [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:shadow-md [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:ring-1 [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:ring-ring",
        className,
      )}
      {...props}
      data-slot="angle-slider-thumb"
    />
  );
});

const AngleSliderMarkerGroup = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.MarkerGroup>,
  ComponentProps<typeof AngleSliderPrimitive.MarkerGroup>
>(function AngleSliderMarkerGroup({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.MarkerGroup
      ref={ref}
      className={cn('pointer-events-none absolute inset-0 z-1', className)}
      {...props}
      data-slot="angle-slider-marker-group"
    />
  );
});

const AngleSliderMarker = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Marker>,
  ComponentProps<typeof AngleSliderPrimitive.Marker>
>(function AngleSliderMarker({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Marker
      ref={ref}
      className={cn(
        "absolute inset-0 before:absolute before:top-1 before:left-1/2 before:h-2 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-muted-foreground before:content-[''] data-[state=at-value]:before:bg-foreground data-[state=under-value]:before:bg-primary",
        className,
      )}
      {...props}
      data-slot="angle-slider-marker"
    />
  );
});

type AngleSliderMarksProps = Omit<
  ComponentProps<typeof AngleSliderPrimitive.MarkerGroup>,
  'asChild' | 'children'
> & {
  values: readonly number[];
};

function AngleSliderMarks({ values, ...props }: AngleSliderMarksProps) {
  return (
    <AngleSliderMarkerGroup {...props}>
      {values.map((value, index) => (
        <AngleSliderMarker key={`${value}-${index}`} value={value} />
      ))}
    </AngleSliderMarkerGroup>
  );
}

type AngleSliderDialProps = Omit<
  ComponentProps<typeof AngleSliderPrimitive.Control>,
  'asChild' | 'children'
> & {
  children?: ReactNode;
};

function AngleSliderDial({ children, ...props }: AngleSliderDialProps) {
  return (
    <AngleSliderControl {...props}>
      {children}
      <AngleSliderValueText />
      <AngleSliderThumb />
    </AngleSliderControl>
  );
}

const AngleSliderValueText = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.ValueText>,
  ComponentProps<typeof AngleSliderPrimitive.ValueText>
>(function AngleSliderValueText({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.ValueText
      ref={ref}
      className={cn(
        'absolute inset-0 z-1 grid place-items-center text-center text-lg font-medium text-foreground tabular-nums',
        className,
      )}
      {...props}
      data-slot="angle-slider-value-text"
    />
  );
});

const AngleSlider = AngleSliderRoot;

const AngleSliderContext = AngleSliderPrimitive.Context;
const AngleSliderHiddenInput = AngleSliderPrimitive.HiddenInput;

const useAngleSlider = useAngleSliderPrimitive;

export {
  AngleSlider,
  AngleSliderContext,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  AngleSliderValueText,
  useAngleSlider,
  useAngleSliderContext,
};