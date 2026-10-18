import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function ProgressLinear(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ProgressPrimitive.Root
      class={cn(
        'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        local.class,
      )}
      {...others}
      data-slot="progress-linear-root"
    >
      {local.children}
    </ProgressPrimitive.Root>
  );
}

function ProgressLinearRootProvider(props: ComponentProps<typeof ProgressPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ProgressPrimitive.RootProvider
      class={cn(
        'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        local.class,
      )}
      {...others}
      data-slot="progress-linear-root-provider"
    >
      {local.children}
    </ProgressPrimitive.RootProvider>
  );
}

function ProgressLinearLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Label
      class={cn('text-sm wrap-anywhere', local.class)}
      {...others}
      data-slot="progress-linear-label"
    />
  );
}

function ProgressLinearValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.ValueText
      class={cn('justify-self-end text-end text-sm wrap-anywhere', local.class)}
      {...others}
      data-slot="progress-linear-value-text"
    />
  );
}

function ProgressLinearTrack(props: ComponentProps<typeof ProgressPrimitive.Track>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Track
      class={cn(
        'col-span-full h-2 overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-[orientation=vertical]:flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:items-end data-[orientation=vertical]:justify-self-center',
        local.class,
      )}
      {...others}
      data-slot="progress-linear-track"
    />
  );
}

function ProgressLinearRange(props: ComponentProps<typeof ProgressPrimitive.Range>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Range
      class={cn(
        'h-full rounded-[inherit] bg-primary transition-[width,height] duration-normal ease-in-out data-[orientation=vertical]:w-full data-[state=indeterminate]:data-[orientation=horizontal]:w-[35%] data-[state=indeterminate]:data-[orientation=horizontal]:animate-moduix-progress-linear-indeterminate data-[state=indeterminate]:data-[orientation=vertical]:h-[35%] data-[state=indeterminate]:data-[orientation=vertical]:animate-moduix-progress-linear-indeterminate-vertical motion-reduce:data-[state=indeterminate]:data-[orientation]:animate-none [&:dir(rtl)]:data-[state=indeterminate]:data-[orientation=horizontal]:-scale-x-100',
        local.class,
      )}
      {...others}
      data-slot="progress-linear-range"
    />
  );
}

function ProgressLinearView(props: ComponentProps<typeof ProgressPrimitive.View>) {
  return <ProgressPrimitive.View {...props} data-slot="progress-linear-view" />;
}

const ProgressLinearContext = ProgressPrimitive.Context;

export {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  ProgressLinearView,
  useProgress,
  useProgressContext,
};
export type {
  ProgressContextProps,
  ProgressLabelProps,
  ProgressRangeProps,
  ProgressRootProps,
  ProgressRootProviderProps,
  ProgressTrackProps,
  ProgressValueChangeDetails,
  ProgressValueTextProps,
  ProgressValueTranslationDetails,
  ProgressViewProps,
  UseProgressContext,
  UseProgressProps,
  UseProgressReturn,
} from '@ark-ui/solid/progress';