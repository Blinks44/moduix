import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function ProgressLinearRoot(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Root
      asChild={local.asChild}
      data-slot="progress-linear-root"
      class={cn(
        'box-border grid w-48 max-w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 text-foreground data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </ProgressPrimitive.Root>
  );
}

function ProgressLinearRootProvider(props: ComponentProps<typeof ProgressPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="progress-linear-root-provider"
      class={cn(
        'box-border grid w-48 max-w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 text-foreground data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </ProgressPrimitive.RootProvider>
  );
}

function ProgressLinearLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.Label
      asChild={local.asChild}
      data-slot="progress-linear-label"
      class={cn(
        'min-w-0 text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current',
        local.class,
      )}
      {...others}
    />
  );
}

function ProgressLinearValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.ValueText
      asChild={local.asChild}
      data-slot="progress-linear-value-text"
      class={cn(
        'min-w-0 justify-self-end text-end text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current',
        local.class,
      )}
      {...others}
    />
  );
}

function ProgressLinearTrack(props: ComponentProps<typeof ProgressPrimitive.Track>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.Track
      asChild={local.asChild}
      data-slot="progress-linear-track"
      class={cn(
        'col-span-full box-border block h-2 w-full overflow-hidden rounded-full bg-muted outline-1 -outline-offset-1 outline-border data-[orientation=vertical]:flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:items-end data-[orientation=vertical]:justify-self-center',
        local.class,
      )}
      {...others}
    />
  );
}

function ProgressLinearRange(props: ComponentProps<typeof ProgressPrimitive.Range>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.Range
      asChild={local.asChild}
      data-slot="progress-linear-range"
      class={cn(
        'block h-full rounded-[inherit] bg-primary transition-[width,height] duration-200 ease-in-out data-[orientation=vertical]:w-full data-[state=indeterminate]:w-[35%] data-[state=indeterminate]:animate-moduix-progress-linear-indeterminate data-[state=indeterminate]:data-[orientation=vertical]:h-[35%] data-[state=indeterminate]:data-[orientation=vertical]:animate-moduix-progress-linear-indeterminate-vertical motion-reduce:data-[state=indeterminate]:translate-x-0 motion-reduce:data-[state=indeterminate]:translate-y-0 motion-reduce:data-[state=indeterminate]:animate-none rtl:data-[state=indeterminate]:data-[orientation=horizontal]:[animation-direction:reverse]',
        local.class,
      )}
      {...others}
    />
  );
}

function ProgressLinearView(props: ComponentProps<typeof ProgressPrimitive.View>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.View
      asChild={local.asChild}
      data-slot="progress-linear-view"
      class={cn('contents', local.class)}
      {...others}
    />
  );
}

type ProgressLinearComponent = typeof ProgressLinearRoot & {
  Root: typeof ProgressLinearRoot;
  RootProvider: typeof ProgressLinearRootProvider;
  Context: typeof ProgressPrimitive.Context;
  Label: typeof ProgressLinearLabel;
  ValueText: typeof ProgressLinearValueText;
  Track: typeof ProgressLinearTrack;
  Range: typeof ProgressLinearRange;
  View: typeof ProgressLinearView;
  useProgress: typeof useProgress;
  useProgressContext: typeof useProgressContext;
};

const ProgressLinear: ProgressLinearComponent = Object.assign(ProgressLinearRoot, {
  Root: ProgressLinearRoot,
  RootProvider: ProgressLinearRootProvider,
  Context: ProgressPrimitive.Context,
  Label: ProgressLinearLabel,
  ValueText: ProgressLinearValueText,
  Track: ProgressLinearTrack,
  Range: ProgressLinearRange,
  View: ProgressLinearView,
  useProgress,
  useProgressContext,
});

export { ProgressLinear };