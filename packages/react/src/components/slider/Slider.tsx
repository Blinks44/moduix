'use client';

import { Slider as SliderPrimitive, useSlider, useSliderContext } from '@ark-ui/react/slider';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Slider.module.css';

const Slider = forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  ComponentProps<typeof SliderPrimitive.Root>
>(function Slider({ className, readOnly, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      readOnly={readOnly}
      {...props}
      data-readonly={readOnly ? '' : undefined}
      data-slot="slider-root"
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
      className={clsx(styles.root, className)}
      {...props}
      data-slot="slider-root-provider"
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
      className={clsx(styles.label, className)}
      {...props}
      data-slot="slider-label"
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
      className={clsx(styles.valueText, className)}
      {...props}
      data-slot="slider-value-text"
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
      className={clsx(styles.control, className)}
      {...props}
      data-slot="slider-control"
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
      className={clsx(styles.track, className)}
      {...props}
      data-slot="slider-track"
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
      className={clsx(styles.range, className)}
      {...props}
      data-slot="slider-range"
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
      className={clsx(styles.thumb, className)}
      {...props}
      data-slot="slider-thumb"
    />
  );
});

function SliderThumbs({ className }: { className?: string }) {
  const slider = useSliderContext();

  return slider.value.map((_, index) => (
    <SliderThumb key={index} index={index} className={className}>
      <SliderPrimitive.HiddenInput />
    </SliderThumb>
  ));
}

const SliderMarkerGroup = forwardRef<
  ComponentRef<typeof SliderPrimitive.MarkerGroup>,
  ComponentProps<typeof SliderPrimitive.MarkerGroup>
>(function SliderMarkerGroup({ className, ...props }, ref) {
  return (
    <SliderPrimitive.MarkerGroup
      ref={ref}
      className={clsx(styles.markerGroup, className)}
      {...props}
      data-slot="slider-marker-group"
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
      className={clsx(styles.marker, className)}
      {...props}
      data-slot="slider-marker"
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
      className={clsx(styles.draggingIndicator, className)}
      {...props}
      data-slot="slider-dragging-indicator"
    />
  );
});

const SliderContext = SliderPrimitive.Context;
const SliderHiddenInput = SliderPrimitive.HiddenInput;

export {
  Slider,
  SliderContext,
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
  useSliderContext,
};