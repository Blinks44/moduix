'use client';

import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
} from '@ark-ui/react/angle-slider';
import type {
  ComponentProps,
  ComponentRef,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const AngleSliderRoot = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Root>,
  ComponentProps<typeof AngleSliderPrimitive.Root>
>(function AngleSliderRoot({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Root
      ref={ref}
      data-slot="angle-slider-root"
      className={cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        className,
      )}
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
      className={cn('text-center text-sm font-medium text-foreground', className)}
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
      className={cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        className,
      )}
      value={value}
      {...props}
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
      data-slot="angle-slider-control"
      className={cn(
        "relative box-border flex aspect-square w-32 min-w-0 cursor-pointer items-center justify-center rounded-full bg-muted shadow-[inset_0_0_0_1px_var(--color-border)] outline-0 transition-colors duration-200 select-none before:absolute before:z-1 before:size-1.5 before:rounded-[inherit] before:bg-foreground before:content-[''] after:absolute after:inset-3.5 after:z-1 after:rounded-[inherit] after:bg-background after:shadow-[inset_0_0_0_1px_var(--color-border)] after:content-[''] data-disabled:cursor-default data-invalid:shadow-[inset_0_0_0_1px_var(--color-destructive)] data-invalid:after:shadow-[inset_0_0_0_1px_var(--color-destructive)] data-readonly:cursor-default motion-reduce:transition-none [&:has([data-scope='angle-slider'][data-part='thumb']:focus-visible)]:shadow-[inset_0_0_0_1px_var(--color-border),0_0_0_3px_var(--color-ring)] [&:not([data-disabled]):not([data-readonly]):active]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly]):hover]:bg-muted",
        className,
      )}
      onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event);
        event.currentTarget
          .querySelector<HTMLElement>('[data-scope="angle-slider"][data-part="thumb"]')
          ?.blur();
      }}
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
      className={cn(
        "absolute inset-y-0 left-[calc(50%-0.09375rem)] z-2 w-[0.1875rem] outline-0 before:absolute before:top-3.5 before:left-1/2 before:box-border before:size-4 before:-translate-x-1/2 before:rounded-full before:border before:border-border before:bg-primary before:shadow-sm before:transition-[border-color,box-shadow,background-color,scale] before:duration-200 before:content-[''] after:absolute after:top-[2.125rem] after:left-1/2 after:h-[calc(50%-2.25rem)] after:w-[0.1875rem] after:-translate-x-1/2 after:rounded-full after:bg-linear-to-b after:from-primary after:to-transparent after:content-[''] focus-visible:before:border-ring focus-visible:before:ring-1 focus-visible:before:ring-ring data-disabled:pointer-events-none data-invalid:before:border-destructive data-invalid:before:bg-destructive data-invalid:after:from-destructive motion-reduce:before:transition-none [&:active:not([data-disabled]):not([data-readonly])]:before:scale-[1.08]",
        className,
      )}
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
      className={cn('pointer-events-none absolute inset-0 z-1', className)}
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
      className={cn(
        "absolute inset-0 before:absolute before:top-4 before:left-1/2 before:h-2.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-muted-foreground before:content-[''] data-[state=at-value]:before:bg-foreground data-[state=under-value]:before:bg-primary",
        className,
      )}
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
      className={cn('text-center text-sm font-medium text-foreground', className)}
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