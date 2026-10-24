import { Slider as SliderPrimitive, useSlider, useSliderContext } from '@ark-ui/solid/slider';
import type { ComponentProps } from 'solid-js';
import { Index, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function Slider(props: ComponentProps<typeof SliderPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Root
      class={cn(
        "group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-disabled:opacity-disabled data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']",
        local.class,
      )}
      {...others}
      data-readonly={props.readOnly ? '' : undefined}
      data-slot="slider-root"
    />
  );
}

function SliderRootProvider(props: ComponentProps<typeof SliderPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.RootProvider
      class={cn(
        "group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-disabled:opacity-disabled data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']",
        local.class,
      )}
      {...others}
      data-slot="slider-root-provider"
    />
  );
}

function SliderLabel(props: ComponentProps<typeof SliderPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Label
      class={cn(
        'text-sm leading-5 group-data-[orientation=vertical]:[grid-area:label]',
        local.class,
      )}
      {...others}
      data-slot="slider-label"
    />
  );
}

function SliderValueText(props: ComponentProps<typeof SliderPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.ValueText
      class={cn(
        'justify-self-end text-end text-sm leading-5 group-data-[orientation=vertical]:[grid-area:value]',
        local.class,
      )}
      {...others}
      data-slot="slider-value-text"
    />
  );
}

function SliderControl(props: ComponentProps<typeof SliderPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Control
      class={cn(
        'col-span-full flex min-h-5 cursor-pointer items-center group-data-readonly:cursor-default group-data-[orientation=vertical]:[grid-area:control] data-disabled:cursor-default data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
        local.class,
      )}
      {...others}
      data-slot="slider-control"
    />
  );
}

function SliderTrack(props: ComponentProps<typeof SliderPrimitive.Track>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Track
      class={cn(
        'h-1.5 flex-1 overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-invalid:ring-destructive data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        local.class,
      )}
      {...others}
      data-slot="slider-track"
    />
  );
}

function SliderRange(props: ComponentProps<typeof SliderPrimitive.Range>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Range
      class={cn(
        'h-full rounded-[inherit] bg-primary data-invalid:bg-destructive data-[orientation=vertical]:w-full',
        local.class,
      )}
      {...others}
      data-slot="slider-range"
    />
  );
}

function SliderThumb(props: ComponentProps<typeof SliderPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Thumb
      class={cn(
        'box-border flex size-4 items-center justify-center rounded-full border border-border bg-background shadow-sm outline-0 transition-[border-color,box-shadow] duration-normal ease-in-out focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring data-dragging:border-ring data-dragging:shadow-md data-dragging:ring-1 data-dragging:ring-ring data-invalid:border-destructive data-invalid:focus-visible:ring-destructive',
        local.class,
      )}
      {...others}
      data-slot="slider-thumb"
    />
  );
}

function SliderThumbs(props: { class?: string }) {
  const slider = useSliderContext();

  return (
    <Index each={slider().value}>
      {(_, index) => (
        <SliderThumb index={index} class={props.class}>
          <SliderPrimitive.HiddenInput />
        </SliderThumb>
      )}
    </Index>
  );
}

function SliderMarkerGroup(props: ComponentProps<typeof SliderPrimitive.MarkerGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.MarkerGroup
      class={cn(
        'col-span-full mt-2 min-h-4 group-data-[orientation=vertical]:m-0 group-data-[orientation=vertical]:h-full group-data-[orientation=vertical]:[grid-area:markers]',
        local.class,
      )}
      {...others}
      data-slot="slider-marker-group"
    />
  );
}

function SliderMarker(props: ComponentProps<typeof SliderPrimitive.Marker>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Marker
      class={cn(
        "text-xs leading-4 text-muted-foreground before:absolute before:start-1/2 before:-top-2 before:-ms-0.5 before:size-1 before:rounded-full before:bg-border before:content-[''] data-[orientation=vertical]:before:-start-2 data-[orientation=vertical]:before:top-1/2 data-[orientation=vertical]:before:-mt-0.5 data-[state=at-value]:before:bg-primary group-data-invalid:data-[state=at-value]:before:bg-destructive data-[state=under-value]:before:bg-primary group-data-invalid:data-[state=under-value]:before:bg-destructive",
        local.class,
      )}
      {...others}
      data-slot="slider-marker"
    />
  );
}

function SliderDraggingIndicator(props: ComponentProps<typeof SliderPrimitive.DraggingIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.DraggingIndicator
      class={cn(
        'pointer-events-none rounded-sm bg-foreground px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-background data-[orientation=horizontal]:bottom-full data-[orientation=horizontal]:mb-2 data-[orientation=vertical]:start-full data-[orientation=vertical]:ms-2',
        local.class,
      )}
      {...others}
      data-slot="slider-dragging-indicator"
    />
  );
}

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
} from '@ark-ui/solid/slider';