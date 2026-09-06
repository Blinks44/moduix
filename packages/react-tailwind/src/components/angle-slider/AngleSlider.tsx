'use client';

import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
} from '@ark-ui/react/angle-slider';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const rootClassName =
  'box-border inline-flex min-w-0 flex-col items-center gap-[var(--moduix-angle-slider-gap,var(--moduix-spacing-3))] text-[color:var(--moduix-angle-slider-color,var(--moduix-color-foreground))] data-disabled:opacity-[var(--moduix-angle-slider-disabled-opacity,var(--moduix-opacity-disabled))]';

const labelClassName =
  'text-center text-[color:var(--moduix-angle-slider-label-color,var(--moduix-angle-slider-color,var(--moduix-color-foreground)))] text-[length:var(--moduix-angle-slider-label-font-size,var(--moduix-text-sm))] leading-[var(--moduix-angle-slider-label-line-height,var(--moduix-line-height-text-sm))] [font-weight:var(--moduix-angle-slider-label-font-weight,var(--moduix-weight-medium))]';

const controlClassName =
  "relative box-border flex aspect-square w-[var(--moduix-angle-slider-size,8rem)] min-w-0 cursor-pointer items-center justify-center rounded-[var(--moduix-angle-slider-radius,var(--moduix-radius-full))] bg-[var(--moduix-angle-slider-track-bg,var(--moduix-color-muted))] outline-0 select-none [--_angle-slider-control-border-color:var(--moduix-angle-slider-control-border-color,var(--moduix-color-border))] [--_angle-slider-track-border-color:var(--moduix-angle-slider-track-border-color,var(--moduix-color-border))] [box-shadow:inset_0_0_0_var(--moduix-angle-slider-track-border-width,var(--moduix-border-width-sm))_var(--_angle-slider-track-border-color),var(--moduix-angle-slider-shadow,none)] [transition:background-color_var(--moduix-angle-slider-transition,var(--moduix-transition-default))] after:absolute after:inset-[var(--moduix-angle-slider-ring-thickness,0.875rem)] after:z-1 after:rounded-[inherit] after:bg-[var(--moduix-angle-slider-control-bg,var(--moduix-color-background))] after:content-[''] after:[box-shadow:inset_0_0_0_var(--moduix-angle-slider-control-border-width,var(--moduix-border-width-sm))_var(--_angle-slider-control-border-color)] before:absolute before:z-1 before:size-[var(--moduix-angle-slider-center-dot-size,var(--moduix-spacing-1-5))] before:rounded-[inherit] before:bg-[var(--moduix-angle-slider-center-dot-color,var(--moduix-angle-slider-color,var(--moduix-color-foreground)))] before:content-[''] [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly]):hover]:bg-[var(--moduix-angle-slider-track-bg-hover,var(--moduix-angle-slider-track-bg,var(--moduix-color-muted)))] [&:not([data-disabled]):not([data-readonly]):active]:bg-[var(--moduix-angle-slider-track-bg-active,var(--moduix-angle-slider-track-bg,var(--moduix-color-muted)))] [&:has([data-slot='angle-slider-thumb']:focus-visible)]:[box-shadow:inset_0_0_0_var(--moduix-angle-slider-track-border-width,var(--moduix-border-width-sm))_var(--_angle-slider-track-border-color),0_0_0_var(--moduix-angle-slider-focus-ring-width,0.1875rem)_var(--moduix-angle-slider-focus-ring-color,var(--moduix-color-ring)),var(--moduix-angle-slider-shadow,none)] data-invalid:[--_angle-slider-control-border-color:var(--moduix-angle-slider-invalid-border-color,var(--moduix-angle-slider-invalid-color,var(--moduix-color-destructive)))] data-invalid:[--_angle-slider-track-border-color:var(--moduix-angle-slider-invalid-border-color,var(--moduix-angle-slider-invalid-color,var(--moduix-color-destructive)))] data-disabled:cursor-default data-readonly:cursor-default motion-reduce:transition-none";

const thumbClassName =
  "absolute inset-y-0 left-[calc(50%-var(--moduix-angle-slider-thumb-line-width,0.1875rem)/2)] z-2 w-[var(--moduix-angle-slider-thumb-line-width,0.1875rem)] outline-0 before:absolute before:top-[var(--moduix-angle-slider-ring-thickness,0.875rem)] before:left-1/2 before:box-border before:size-[var(--moduix-angle-slider-thumb-size,var(--moduix-spacing-4))] before:[transform:translateX(-50%)] before:rounded-[var(--moduix-angle-slider-thumb-radius,var(--moduix-radius-full))] before:border-[length:var(--moduix-angle-slider-thumb-border-width,var(--moduix-border-width-sm))] before:border-[var(--moduix-angle-slider-thumb-border-color,var(--moduix-color-border))] before:border-solid before:bg-[var(--moduix-angle-slider-thumb-bg,var(--moduix-angle-slider-indicator-bg,var(--moduix-color-primary)))] before:shadow-[var(--moduix-angle-slider-thumb-shadow,var(--moduix-shadow-sm))] before:content-[''] before:[transition:border-color_var(--moduix-angle-slider-transition,var(--moduix-transition-default)),box-shadow_var(--moduix-angle-slider-transition,var(--moduix-transition-default)),background-color_var(--moduix-angle-slider-transition,var(--moduix-transition-default)),transform_var(--moduix-angle-slider-transition,var(--moduix-transition-default))] after:absolute after:top-[calc(var(--moduix-angle-slider-ring-thickness,0.875rem)+var(--moduix-angle-slider-thumb-size,var(--moduix-spacing-4))+var(--moduix-spacing-1))] after:left-1/2 after:h-[calc(50%-var(--moduix-angle-slider-ring-thickness,0.875rem)-var(--moduix-angle-slider-thumb-size,var(--moduix-spacing-4))-var(--moduix-spacing-1-5))] after:w-[var(--moduix-angle-slider-thumb-line-width,0.1875rem)] after:-translate-x-1/2 after:rounded-[var(--moduix-radius-full)] after:bg-[linear-gradient(to_bottom,var(--moduix-angle-slider-indicator-bg,var(--moduix-color-primary)),transparent)] after:content-[''] focus-visible:before:border-[var(--moduix-angle-slider-focus-ring-color,var(--moduix-color-ring))] focus-visible:before:shadow-[0_0_0_var(--moduix-border-width-sm)_var(--moduix-angle-slider-focus-ring-color,var(--moduix-color-ring))] [&:active:not([data-disabled]):not([data-readonly])::before]:[transform:translateX(-50%)_scale(1.08)] data-invalid:before:border-[var(--moduix-angle-slider-invalid-border-color,var(--moduix-angle-slider-invalid-color,var(--moduix-color-destructive)))] data-invalid:before:bg-[var(--moduix-angle-slider-invalid-indicator-bg,var(--moduix-angle-slider-invalid-color,var(--moduix-color-destructive)))] data-invalid:after:bg-[linear-gradient(to_bottom,var(--moduix-angle-slider-invalid-indicator-bg,var(--moduix-angle-slider-invalid-color,var(--moduix-color-destructive))),transparent)] data-disabled:pointer-events-none motion-reduce:[&::before]:transition-none";

const markerGroupClassName = 'pointer-events-none absolute inset-0 z-1';

const markerClassName =
  "absolute inset-0 before:absolute before:top-[calc(var(--moduix-angle-slider-ring-thickness,0.875rem)+0.125rem)] before:left-1/2 before:h-[var(--moduix-angle-slider-marker-height,0.625rem)] before:w-[var(--moduix-angle-slider-marker-width,0.125rem)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-[var(--moduix-radius-full)] before:bg-[var(--moduix-angle-slider-marker-color,var(--moduix-color-muted-foreground))] before:content-[''] data-[state=under-value]:before:bg-[var(--moduix-angle-slider-marker-active-color,var(--moduix-color-primary))] data-[state=at-value]:before:bg-[var(--moduix-angle-slider-marker-current-color,var(--moduix-color-foreground))]";

const valueTextClassName =
  'text-center text-[color:var(--moduix-angle-slider-value-text-color,var(--moduix-angle-slider-color,var(--moduix-color-foreground)))] text-[length:var(--moduix-angle-slider-value-text-font-size,var(--moduix-text-sm))] leading-[var(--moduix-angle-slider-value-text-line-height,var(--moduix-line-height-text-sm))] [font-weight:var(--moduix-angle-slider-value-text-font-weight,var(--moduix-weight-medium))]';

const AngleSliderRoot = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Root>,
  ComponentProps<typeof AngleSliderPrimitive.Root>
>(function AngleSliderRoot({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Root
      ref={ref}
      data-slot="angle-slider-root"
      className={cn(rootClassName, className)}
      {...props}
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
      data-slot="angle-slider-label"
      className={cn(labelClassName, className)}
      {...props}
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
      data-slot="angle-slider-root-provider"
      className={cn(rootClassName, className)}
      value={value}
      {...props}
    />
  );
});

const AngleSliderControl = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Control>,
  ComponentProps<typeof AngleSliderPrimitive.Control>
>(function AngleSliderControl({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Control
      ref={ref}
      data-slot="angle-slider-control"
      className={cn(controlClassName, className)}
      {...props}
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
      data-slot="angle-slider-thumb"
      className={cn(thumbClassName, className)}
      {...props}
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
      data-slot="angle-slider-marker-group"
      className={cn(markerGroupClassName, className)}
      {...props}
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
      data-slot="angle-slider-marker"
      className={cn(markerClassName, className)}
      {...props}
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
      data-slot="angle-slider-value-text"
      className={cn(valueTextClassName, className)}
      {...props}
    />
  );
});

const AngleSlider = Object.assign(AngleSliderRoot, {
  Root: AngleSliderRoot,
  RootProvider: AngleSliderRootProvider,
  Context: AngleSliderPrimitive.Context,
  HiddenInput: AngleSliderPrimitive.HiddenInput,
  Label: AngleSliderLabel,
  Control: AngleSliderControl,
  Dial: AngleSliderDial,
  Thumb: AngleSliderThumb,
  MarkerGroup: AngleSliderMarkerGroup,
  Marker: AngleSliderMarker,
  Marks: AngleSliderMarks,
  ValueText: AngleSliderValueText,
});

const useAngleSlider = useAngleSliderPrimitive;

export { AngleSlider, useAngleSlider, useAngleSliderContext };