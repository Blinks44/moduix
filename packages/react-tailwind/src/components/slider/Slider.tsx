'use client';

import { Slider as SliderPrimitive, useSlider, useSliderContext } from '@ark-ui/react/slider';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const SliderRoot = forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  ComponentProps<typeof SliderPrimitive.Root>
>(function SliderRoot({ className, readOnly, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "group flex w-48 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50 data-[orientation=vertical]:grid data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:gap-x-2 data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']",
        className,
      )}
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
      className={cn(
        "group flex w-48 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50 data-[orientation=vertical]:grid data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:gap-x-2 data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']",
        className,
      )}
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
      className={cn(
        'text-sm leading-5 font-normal text-foreground select-none group-data-[orientation=vertical]:[grid-area:label]',
        className,
      )}
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
      className={cn(
        'text-right text-sm leading-5 font-normal text-foreground group-data-[orientation=vertical]:justify-self-end group-data-[orientation=vertical]:[grid-area:value]',
        className,
      )}
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
      className={cn(
        'relative flex min-h-5 w-full cursor-pointer touch-none items-center select-none group-data-readonly:cursor-default group-data-[orientation=vertical]:[grid-area:control] data-disabled:cursor-default data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
        className,
      )}
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
      className={cn(
        'h-1.5 w-full flex-1 overflow-hidden rounded-full bg-muted ring-1 ring-border select-none ring-inset data-invalid:ring-destructive data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        className,
      )}
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
      className={cn(
        'h-full rounded-[inherit] bg-primary data-invalid:bg-destructive data-[orientation=vertical]:w-full',
        className,
      )}
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
      className={cn(
        'box-border flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm outline-0 transition-[border-color,background-color,box-shadow] duration-200 ease-in-out select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring data-disabled:pointer-events-none data-dragging:border-ring data-dragging:shadow-md data-dragging:ring-1 data-dragging:ring-ring data-invalid:border-destructive data-invalid:focus-visible:ring-destructive motion-reduce:transition-none',
        className,
      )}
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
      className={cn(
        'mt-2 flex justify-between group-data-[orientation=vertical]:m-0 group-data-[orientation=vertical]:h-full group-data-[orientation=vertical]:flex-col group-data-[orientation=vertical]:[grid-area:markers]',
        className,
      )}
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
      className={cn(
        "relative text-xs leading-4 text-muted-foreground before:absolute before:start-1/2 before:-top-2 before:size-1 before:-translate-x-1/2 before:rounded-full before:bg-border before:content-[''] data-[orientation=vertical]:before:-start-2 data-[orientation=vertical]:before:top-1/2 data-[orientation=vertical]:before:-translate-y-1/2 data-[state=at-value]:before:bg-primary group-data-invalid:data-[state=at-value]:before:bg-destructive data-[state=under-value]:before:bg-primary group-data-invalid:data-[state=under-value]:before:bg-destructive",
        className,
      )}
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
      className={cn(
        'pointer-events-none -top-8 rounded-sm bg-foreground px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-background',
        className,
      )}
      {...props}
      data-slot="slider-dragging-indicator"
    />
  );
});

const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  RootProvider: SliderRootProvider,
  Context: SliderPrimitive.Context,
  useSlider,
  useSliderContext,
  Label: SliderLabel,
  ValueText: SliderValueText,
  Control: SliderControl,
  HiddenInput: SliderPrimitive.HiddenInput,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  Thumbs: SliderThumbs,
  MarkerGroup: SliderMarkerGroup,
  Marker: SliderMarker,
  DraggingIndicator: SliderDraggingIndicator,
});

export { Slider, useSlider, useSliderContext };