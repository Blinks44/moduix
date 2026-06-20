import type { ComponentProps, ComponentRef } from 'react';
import { Slider as SliderPrimitive, useSlider, useSliderContext } from '@ark-ui/react/slider';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Slider.module.css';

const SliderRoot = forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  ComponentProps<typeof SliderPrimitive.Root>
>(function SliderRoot({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderRootProvider = forwardRef<
  ComponentRef<typeof SliderPrimitive.RootProvider>,
  ComponentProps<typeof SliderPrimitive.RootProvider>
>(function SliderRootProvider({ className, ...props }, ref) {
  return (
    <SliderPrimitive.RootProvider
      ref={ref}
      data-slot="slider-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderLabel = forwardRef<
  ComponentRef<typeof SliderPrimitive.Label>,
  ComponentProps<typeof SliderPrimitive.Label>
>(function SliderLabel({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Label
      ref={ref}
      data-slot="slider-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderValueText = forwardRef<
  ComponentRef<typeof SliderPrimitive.ValueText>,
  ComponentProps<typeof SliderPrimitive.ValueText>
>(function SliderValueText({ className, ...props }, ref) {
  return (
    <SliderPrimitive.ValueText
      ref={ref}
      data-slot="slider-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderControl = forwardRef<
  ComponentRef<typeof SliderPrimitive.Control>,
  ComponentProps<typeof SliderPrimitive.Control>
>(function SliderControl({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Control
      ref={ref}
      data-slot="slider-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderTrack = forwardRef<
  ComponentRef<typeof SliderPrimitive.Track>,
  ComponentProps<typeof SliderPrimitive.Track>
>(function SliderTrack({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Track
      ref={ref}
      data-slot="slider-track"
      className={clsx(styles.track, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderRange = forwardRef<
  ComponentRef<typeof SliderPrimitive.Range>,
  ComponentProps<typeof SliderPrimitive.Range>
>(function SliderRange({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Range
      ref={ref}
      data-slot="slider-range"
      className={clsx(styles.range, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderThumb = forwardRef<
  ComponentRef<typeof SliderPrimitive.Thumb>,
  ComponentProps<typeof SliderPrimitive.Thumb>
>(function SliderThumb({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      data-slot="slider-thumb"
      className={clsx(styles.thumb, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderHiddenInput = forwardRef<
  ComponentRef<typeof SliderPrimitive.HiddenInput>,
  ComponentProps<typeof SliderPrimitive.HiddenInput>
>(function SliderHiddenInput({ className, ...props }, ref) {
  return (
    <SliderPrimitive.HiddenInput
      ref={ref}
      data-slot="slider-hidden-input"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const SliderMarkerGroup = forwardRef<
  ComponentRef<typeof SliderPrimitive.MarkerGroup>,
  ComponentProps<typeof SliderPrimitive.MarkerGroup>
>(function SliderMarkerGroup({ className, ...props }, ref) {
  return (
    <SliderPrimitive.MarkerGroup
      ref={ref}
      data-slot="slider-marker-group"
      className={clsx(styles.markerGroup, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderMarker = forwardRef<
  ComponentRef<typeof SliderPrimitive.Marker>,
  ComponentProps<typeof SliderPrimitive.Marker>
>(function SliderMarker({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Marker
      ref={ref}
      data-slot="slider-marker"
      className={clsx(styles.marker, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderDraggingIndicator = forwardRef<
  ComponentRef<typeof SliderPrimitive.DraggingIndicator>,
  ComponentProps<typeof SliderPrimitive.DraggingIndicator>
>(function SliderDraggingIndicator({ className, ...props }, ref) {
  return (
    <SliderPrimitive.DraggingIndicator
      ref={ref}
      data-slot="slider-dragging-indicator"
      className={clsx(styles.draggingIndicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const SliderContext = SliderPrimitive.Context;

const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  RootProvider: SliderRootProvider,
  Label: SliderLabel,
  ValueText: SliderValueText,
  Control: SliderControl,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  HiddenInput: SliderHiddenInput,
  MarkerGroup: SliderMarkerGroup,
  Marker: SliderMarker,
  DraggingIndicator: SliderDraggingIndicator,
  Context: SliderContext,
});

export { Slider, useSlider, useSliderContext };
export type {
  SliderContextProps,
  SliderFocusChangeDetails,
  SliderValueChangeDetails,
  UseSliderContext,
  UseSliderProps,
  UseSliderReturn,
} from '@ark-ui/react/slider';