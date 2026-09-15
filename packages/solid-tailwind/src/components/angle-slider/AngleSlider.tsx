import {
  AngleSlider as AngleSliderPrimitive,
  useAngleSlider,
  useAngleSliderContext,
} from '@ark-ui/solid/angle-slider';
import type { ComponentProps, JSX } from 'solid-js';
import { For, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function AngleSliderRoot(props: ComponentProps<typeof AngleSliderPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <AngleSliderPrimitive.Root
      asChild={local.asChild}
      class={cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        local.class,
      )}
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
      class={cn('text-center text-sm font-medium text-foreground', local.class)}
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
      class={cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="angle-slider-root-provider"
    >
      {local.children}
    </AngleSliderPrimitive.RootProvider>
  );
}

function AngleSliderControl(props: ComponentProps<typeof AngleSliderPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class', 'onPointerDown']);

  return (
    <AngleSliderPrimitive.Control
      class={cn(
        "relative box-border flex aspect-square w-32 min-w-0 cursor-pointer items-center justify-center rounded-full bg-muted shadow-[inset_0_0_0_1px_var(--color-border)] outline-0 transition-colors duration-200 select-none before:absolute before:z-1 before:size-1.5 before:rounded-[inherit] before:bg-foreground before:content-[''] after:absolute after:inset-3.5 after:z-1 after:rounded-[inherit] after:bg-background after:shadow-[inset_0_0_0_1px_var(--color-border)] after:content-[''] data-disabled:cursor-default data-invalid:shadow-[inset_0_0_0_1px_var(--color-destructive)] data-invalid:after:shadow-[inset_0_0_0_1px_var(--color-destructive)] data-readonly:cursor-default motion-reduce:transition-none [&:has([data-scope='angle-slider'][data-part='thumb']:focus-visible)]:shadow-[inset_0_0_0_1px_var(--color-border),0_0_0_3px_var(--color-ring)] [&:not([data-disabled]):not([data-readonly]):active]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly]):hover]:bg-muted",
        local.class,
      )}
      onPointerDown={(event) => {
        (local.onPointerDown as ((event: PointerEvent) => void) | undefined)?.(event);
        (event.currentTarget as HTMLDivElement)
          .querySelector<HTMLElement>('[data-scope="angle-slider"][data-part="thumb"]')
          ?.blur();
      }}
      {...others}
      data-slot="angle-slider-control"
    />
  );
}

function AngleSliderThumb(props: ComponentProps<typeof AngleSliderPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Thumb
      class={cn(
        "absolute inset-y-0 left-[calc(50%-0.09375rem)] z-2 w-[0.1875rem] outline-0 before:absolute before:top-3.5 before:left-1/2 before:box-border before:size-4 before:-translate-x-1/2 before:rounded-full before:border before:border-border before:bg-primary before:shadow-sm before:transition-[border-color,box-shadow,background-color,scale] before:duration-200 before:content-[''] after:absolute after:top-[2.125rem] after:left-1/2 after:h-[calc(50%-2.25rem)] after:w-[0.1875rem] after:-translate-x-1/2 after:rounded-full after:bg-linear-to-b after:from-primary after:to-transparent after:content-[''] focus-visible:before:border-ring focus-visible:before:ring-1 focus-visible:before:ring-ring data-disabled:pointer-events-none data-invalid:before:border-destructive data-invalid:before:bg-destructive data-invalid:after:from-destructive motion-reduce:before:transition-none [&:active:not([data-disabled]):not([data-readonly])]:before:scale-[1.08]",
        local.class,
      )}
      {...others}
      data-slot="angle-slider-thumb"
    />
  );
}

function AngleSliderMarkerGroup(props: ComponentProps<typeof AngleSliderPrimitive.MarkerGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.MarkerGroup
      class={cn('pointer-events-none absolute inset-0 z-1', local.class)}
      {...others}
      data-slot="angle-slider-marker-group"
    />
  );
}

function AngleSliderMarker(props: ComponentProps<typeof AngleSliderPrimitive.Marker>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AngleSliderPrimitive.Marker
      class={cn(
        "absolute inset-0 before:absolute before:top-4 before:left-1/2 before:h-2.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-muted-foreground before:content-[''] data-[state=at-value]:before:bg-foreground data-[state=under-value]:before:bg-primary",
        local.class,
      )}
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
      class={cn('text-center text-sm font-medium text-foreground', local.class)}
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

export { AngleSlider, useAngleSlider, useAngleSliderContext };