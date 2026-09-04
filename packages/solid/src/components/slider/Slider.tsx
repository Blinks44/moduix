import { Slider as SliderPrimitive, useSlider, useSliderContext } from '@ark-ui/solid/slider';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { Index, splitProps } from 'solid-js';
import styles from './Slider.module.css';

function SliderRoot(props: ComponentProps<typeof SliderPrimitive.Root>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'defaultValue',
    'readOnly',
    'value',
  ]);

  return (
    <SliderPrimitive.Root
      asChild={local.asChild}
      defaultValue={local.defaultValue}
      value={local.value}
      data-slot="slider-root"
      data-readonly={local.readOnly ? '' : undefined}
      class={clsx(styles.root, local.class)}
      readOnly={local.readOnly}
      {...others}
    >
      {local.children}
    </SliderPrimitive.Root>
  );
}

function SliderRootProvider(props: ComponentProps<typeof SliderPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'value']);

  return (
    <SliderPrimitive.RootProvider
      asChild={local.asChild}
      value={local.value}
      data-slot="slider-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function SliderLabel(props: ComponentProps<typeof SliderPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function SliderValueText(props: ComponentProps<typeof SliderPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.ValueText
      data-slot="slider-value-text"
      class={clsx(styles.valueText, local.class)}
      {...others}
    />
  );
}

function SliderControl(props: ComponentProps<typeof SliderPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function SliderTrack(props: ComponentProps<typeof SliderPrimitive.Track>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      class={clsx(styles.track, local.class)}
      {...others}
    />
  );
}

function SliderRange(props: ComponentProps<typeof SliderPrimitive.Range>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Range
      data-slot="slider-range"
      class={clsx(styles.range, local.class)}
      {...others}
    />
  );
}

function SliderThumb(props: ComponentProps<typeof SliderPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <SliderPrimitive.Thumb
      asChild={local.asChild}
      data-slot="slider-thumb"
      class={clsx(styles.thumb, local.class)}
      {...others}
    >
      {local.children}
    </SliderPrimitive.Thumb>
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
      data-slot="slider-marker-group"
      class={clsx(styles.markerGroup, local.class)}
      {...others}
    />
  );
}

function SliderMarker(props: ComponentProps<typeof SliderPrimitive.Marker>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.Marker
      data-slot="slider-marker"
      class={clsx(styles.marker, local.class)}
      {...others}
    />
  );
}

function SliderDraggingIndicator(props: ComponentProps<typeof SliderPrimitive.DraggingIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SliderPrimitive.DraggingIndicator
      data-slot="slider-dragging-indicator"
      class={clsx(styles.draggingIndicator, local.class)}
      {...others}
    />
  );
}

type SliderComponent = typeof SliderRoot & {
  Root: typeof SliderRoot;
  RootProvider: typeof SliderRootProvider;
  Context: typeof SliderPrimitive.Context;
  useSlider: typeof useSlider;
  useSliderContext: typeof useSliderContext;
  Label: typeof SliderLabel;
  ValueText: typeof SliderValueText;
  Control: typeof SliderControl;
  HiddenInput: typeof SliderPrimitive.HiddenInput;
  Track: typeof SliderTrack;
  Range: typeof SliderRange;
  Thumb: typeof SliderThumb;
  Thumbs: typeof SliderThumbs;
  MarkerGroup: typeof SliderMarkerGroup;
  Marker: typeof SliderMarker;
  DraggingIndicator: typeof SliderDraggingIndicator;
};

const Slider: SliderComponent = Object.assign(SliderRoot, {
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