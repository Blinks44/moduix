import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
} from '@ark-ui/react/angle-slider';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './AngleSlider.module.css';

const AngleSliderRoot = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Root>,
  ComponentProps<typeof AngleSliderPrimitive.Root>
>(function AngleSliderRoot({ asChild, children, className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Root
      ref={ref}
      data-slot="angle-slider-root"
      className={clsx(styles.root, normalizeClassName(className))}
      asChild={asChild}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </AngleSliderPrimitive.Root>
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
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const AngleSliderRootProvider = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.RootProvider>,
  ComponentProps<typeof AngleSliderPrimitive.RootProvider>
>(function AngleSliderRootProvider({ asChild, children, className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.RootProvider
      ref={ref}
      data-slot="angle-slider-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      asChild={asChild}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </AngleSliderPrimitive.RootProvider>
  );
});

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <AngleSliderPrimitive.HiddenInput data-slot="angle-slider-hidden-input" />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
}

const AngleSliderControl = forwardRef<
  ComponentRef<typeof AngleSliderPrimitive.Control>,
  ComponentProps<typeof AngleSliderPrimitive.Control>
>(function AngleSliderControl({ className, ...props }, ref) {
  return (
    <AngleSliderPrimitive.Control
      ref={ref}
      data-slot="angle-slider-control"
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(styles.thumb, normalizeClassName(className))}
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
      className={clsx(styles.markerGroup, normalizeClassName(className))}
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
      className={clsx(styles.marker, normalizeClassName(className))}
      {...props}
    />
  );
});

function AngleSliderMarks({
  values,
  ...props
}: ComponentProps<typeof AngleSliderPrimitive.MarkerGroup> & { values: readonly number[] }) {
  return (
    <AngleSliderMarkerGroup {...props}>
      {values.map((value) => (
        <AngleSliderMarker key={value} value={value} />
      ))}
    </AngleSliderMarkerGroup>
  );
}

function AngleSliderDial({
  children,
  thumbClassName,
  ...props
}: ComponentProps<typeof AngleSliderPrimitive.Control> & {
  thumbClassName?: string;
}) {
  return (
    <AngleSliderControl {...props}>
      {children}
      <AngleSliderThumb className={thumbClassName} />
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
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

const AngleSlider = Object.assign(AngleSliderRoot, {
  Root: AngleSliderRoot,
  RootProvider: AngleSliderRootProvider,
  Context: AngleSliderPrimitive.Context,
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