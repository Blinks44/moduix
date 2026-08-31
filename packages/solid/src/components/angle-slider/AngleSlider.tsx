import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider as useAngleSliderPrimitive,
  useAngleSliderContext,
  type UseAngleSliderProps,
  type UseAngleSliderReturn,
} from '@ark-ui/solid/angle-slider';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { For, onCleanup, onMount, splitProps } from 'solid-js';
import styles from './AngleSlider.module.css';

type AngleSliderRootProps = ComponentProps<typeof AngleSliderPrimitive.Root> & {
  form?: string;
};

function AngleSliderRoot(props: AngleSliderRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'defaultValue',
    'form',
    'value',
  ]);

  return (
    <AngleSliderPrimitive.Root
      asChild={local.asChild}
      defaultValue={local.defaultValue}
      value={local.value}
      data-slot="angle-slider-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <AngleSliderHiddenInput
        form={local.form}
        resetValue={local.value === undefined ? (local.defaultValue ?? 0) : undefined}
      />
    </AngleSliderPrimitive.Root>
  );
}

function AngleSliderLabel(props: ComponentProps<typeof AngleSliderPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Label
      data-slot="angle-slider-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

type AngleSliderRootProviderProps = ComponentProps<typeof AngleSliderPrimitive.RootProvider> & {
  form?: string;
};

function AngleSliderRootProvider(props: AngleSliderRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'form', 'value']);
  const initialValue = local.value().value;

  return (
    <AngleSliderPrimitive.RootProvider
      asChild={local.asChild}
      value={local.value}
      data-slot="angle-slider-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <AngleSliderHiddenInput form={local.form} resetValue={initialValue} />
    </AngleSliderPrimitive.RootProvider>
  );
}

function AngleSliderHiddenInput(props: { form?: string; resetValue?: number }) {
  const angleSlider = useAngleSliderContext();
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    const formElement = inputRef?.form;

    if (!formElement || props.resetValue === undefined) return;

    const handleReset = () => angleSlider().setValue(props.resetValue!);

    formElement.addEventListener('reset', handleReset);
    onCleanup(() => formElement.removeEventListener('reset', handleReset));
  });

  return (
    <AngleSliderPrimitive.HiddenInput
      ref={(element) => (inputRef = element)}
      data-slot="angle-slider-hidden-input"
      form={props.form}
    />
  );
}

function AngleSliderControl(props: ComponentProps<typeof AngleSliderPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Control
      data-slot="angle-slider-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function AngleSliderThumb(props: ComponentProps<typeof AngleSliderPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Thumb
      data-slot="angle-slider-thumb"
      class={clsx(styles.thumb, local.class)}
      {...others}
    />
  );
}

function AngleSliderMarkerGroup(props: ComponentProps<typeof AngleSliderPrimitive.MarkerGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.MarkerGroup
      data-slot="angle-slider-marker-group"
      class={clsx(styles.markerGroup, local.class)}
      {...others}
    />
  );
}

function AngleSliderMarker(props: ComponentProps<typeof AngleSliderPrimitive.Marker>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Marker
      data-slot="angle-slider-marker"
      class={clsx(styles.marker, local.class)}
      {...others}
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
      data-slot="angle-slider-value-text"
      class={clsx(styles.valueText, local.class)}
      {...others}
    />
  );
}

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

const useAngleSlider: (
  props?: UseAngleSliderProps | (() => UseAngleSliderProps),
) => UseAngleSliderReturn = useAngleSliderPrimitive;

export { AngleSlider, useAngleSlider, useAngleSliderContext };