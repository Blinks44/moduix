'use client';

import { Slider as SliderPrimitive, useSlider, useSliderContext } from '@ark-ui/react/slider';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const Slider = forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  ComponentProps<typeof SliderPrimitive.Root>
>(function Slider({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-disabled:opacity-disabled data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']",
        className,
      )}
      {...props}
      data-readonly={props.readOnly ? '' : undefined}
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
        "group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-disabled:opacity-disabled data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']",
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
        'text-sm leading-5 group-data-[orientation=vertical]:[grid-area:label]',
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
        'justify-self-end text-end text-sm leading-5 group-data-[orientation=vertical]:[grid-area:value]',
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
        'col-span-full flex min-h-5 cursor-pointer items-center group-data-readonly:cursor-default group-data-[orientation=vertical]:[grid-area:control] data-disabled:cursor-default data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
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
        'h-1.5 flex-1 overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-invalid:ring-destructive data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
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
        'box-border flex size-4 items-center justify-center rounded-full border border-border bg-background shadow-sm outline-0 transition-[border-color,box-shadow] duration-normal ease-in-out focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring data-dragging:border-ring data-dragging:shadow-md data-dragging:ring-1 data-dragging:ring-ring data-invalid:border-destructive data-invalid:focus-visible:ring-destructive',
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
        'col-span-full mt-2 min-h-4 group-data-[orientation=vertical]:m-0 group-data-[orientation=vertical]:h-full group-data-[orientation=vertical]:[grid-area:markers]',
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
        "text-xs leading-4 text-muted-foreground before:absolute before:start-1/2 before:-top-2 before:-ms-0.5 before:size-1 before:rounded-full before:bg-border before:content-[''] data-[orientation=vertical]:before:-start-2 data-[orientation=vertical]:before:top-1/2 data-[orientation=vertical]:before:-mt-0.5 data-[state=at-value]:before:bg-primary group-data-invalid:data-[state=at-value]:before:bg-destructive data-[state=under-value]:before:bg-primary group-data-invalid:data-[state=under-value]:before:bg-destructive",
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
        'pointer-events-none rounded-sm bg-foreground px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-background data-[orientation=horizontal]:bottom-full data-[orientation=horizontal]:mb-2 data-[orientation=vertical]:start-full data-[orientation=vertical]:ms-2',
        className,
      )}
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
export type {
  SliderContextProps,
  SliderControlProps,
  SliderDraggingIndicatorProps,
  SliderFocusChangeDetails,
  SliderHiddenInputProps,
  SliderLabelProps,
  SliderMarkerGroupProps,
  SliderMarkerProps,
  SliderRangeProps,
  SliderRootProps,
  SliderRootProviderProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderValueChangeDetails,
  SliderValueTextProps,
  UseSliderContext,
  UseSliderProps,
  UseSliderReturn,
} from '@ark-ui/react/slider';