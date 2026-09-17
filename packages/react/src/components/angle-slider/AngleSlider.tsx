'use client';

import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
} from '@ark-ui/react/angle-slider';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './AngleSlider.module.css';

const AngleSliderRoot = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Root>,
  ComponentProps<typeof AngleSliderPrimitive.Root>
>(function AngleSliderRoot({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.thumb, className)}
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
      className={clsx(styles.markerGroup, className)}
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
      className={clsx(styles.marker, className)}
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
      className={clsx(styles.valueText, className)}
      {...props}
      data-slot="angle-slider-value-text"
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