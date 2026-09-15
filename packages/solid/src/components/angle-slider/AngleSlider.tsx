import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
} from '@ark-ui/solid/angle-slider';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { For, splitProps } from 'solid-js';
import styles from './AngleSlider.module.css';

function AngleSliderRoot(props: ComponentProps<typeof AngleSliderPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <AngleSliderPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="angle-slider-root"
    >
      {local.children}
    </AngleSliderPrimitive.Root>
  );
}

function AngleSliderLabel(props: ComponentProps<typeof AngleSliderPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="angle-slider-label"
    />
  );
}

function AngleSliderRootProvider(props: ComponentProps<typeof AngleSliderPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'value']);

  return (
    <AngleSliderPrimitive.RootProvider
      asChild={local.asChild}
      value={local.value}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="angle-slider-root-provider"
    >
      {local.children}
    </AngleSliderPrimitive.RootProvider>
  );
}

function AngleSliderControl(props: ComponentProps<typeof AngleSliderPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="angle-slider-control"
    />
  );
}

function AngleSliderThumb(props: ComponentProps<typeof AngleSliderPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Thumb
      class={clsx(styles.thumb, local.class)}
      {...others}
      data-slot="angle-slider-thumb"
    />
  );
}

function AngleSliderMarkerGroup(props: ComponentProps<typeof AngleSliderPrimitive.MarkerGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.MarkerGroup
      class={clsx(styles.markerGroup, local.class)}
      {...others}
      data-slot="angle-slider-marker-group"
    />
  );
}

function AngleSliderMarker(props: ComponentProps<typeof AngleSliderPrimitive.Marker>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Marker
      class={clsx(styles.marker, local.class)}
      {...others}
      data-slot="angle-slider-marker"
    />
  );
}

type AngleSliderMarksProps = Omit<
  ComponentProps<typeof AngleSliderPrimitive.MarkerGroup>,
  'asChild' | 'children'
> & {
  values: readonly number[];
};

function AngleSliderMarks(props: AngleSliderMarksProps) {
  const [local, others] = splitProps(props, ['values']);

  return (
    <AngleSliderMarkerGroup {...others}>
      <For each={local.values}>{(value) => <AngleSliderMarker value={value} />}</For>
    </AngleSliderMarkerGroup>
  );
}

type AngleSliderDialProps = Omit<
  ComponentProps<typeof AngleSliderPrimitive.Control>,
  'asChild' | 'children'
> & {
  children?: JSX.Element;
};

function AngleSliderDial(props: AngleSliderDialProps) {
  const [local, others] = splitProps(props, ['children']);

  return (
    <AngleSliderControl {...others}>
      {local.children}
      <AngleSliderThumb />
    </AngleSliderControl>
  );
}

function AngleSliderValueText(props: ComponentProps<typeof AngleSliderPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="angle-slider-value-text"
    />
  );
}

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