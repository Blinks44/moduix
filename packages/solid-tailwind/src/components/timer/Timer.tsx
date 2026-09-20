import { Timer as TimerPrimitive, useTimer, useTimerContext } from '@ark-ui/solid/timer';
import type { ComponentProps, JSX } from 'solid-js';
import { Index, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function TimerRoot(props: ComponentProps<typeof TimerPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Root
      class={cn(
        'inline-grid w-max max-w-full place-items-center gap-3 text-foreground',
        local.class,
      )}
      {...others}
      data-slot="timer-root"
    />
  );
}

function TimerRootProvider(props: ComponentProps<typeof TimerPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.RootProvider
      class={cn(
        'inline-grid w-max max-w-full place-items-center gap-3 text-foreground',
        local.class,
      )}
      {...others}
      data-slot="timer-root-provider"
    />
  );
}

function TimerArea(props: ComponentProps<typeof TimerPrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Area
      class={cn(
        'inline-flex max-w-full min-w-0 flex-wrap items-baseline justify-center gap-1 text-2xl leading-5 font-semibold tracking-normal tabular-nums',
        local.class,
      )}
      {...others}
      data-slot="timer-area"
    />
  );
}

function TimerItem(props: ComponentProps<typeof TimerPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Item
      class={cn('min-w-[2ch] text-center', local.class)}
      {...others}
      data-slot="timer-item"
    />
  );
}

function TimerSeparator(props: ComponentProps<typeof TimerPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Separator
      class={cn('text-muted-foreground', local.class)}
      {...others}
      data-slot="timer-separator"
    />
  );
}

function TimerControl(props: ComponentProps<typeof TimerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.Control
      class={cn('inline-flex flex-wrap items-center gap-2', local.class)}
      {...others}
      data-slot="timer-control"
    />
  );
}

function TimerActionTrigger(props: ComponentProps<typeof TimerPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TimerPrimitive.ActionTrigger
      class={cn(
        'inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition-[background-color,border-color,color,opacity,box-shadow] duration-200 ease-in-out focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="timer-action-trigger"
    />
  );
}

type TimerSegmentsProps = Omit<
  ComponentProps<typeof TimerPrimitive.Area>,
  'asChild' | 'children'
> & {
  separator?: JSX.Element;
  types?: ComponentProps<typeof TimerPrimitive.Item>['type'][];
};

const defaultTimerSegmentTypes = ['hours', 'minutes', 'seconds'] satisfies ComponentProps<
  typeof TimerPrimitive.Item
>['type'][];

function TimerSegments(props: TimerSegmentsProps) {
  const [local, others] = splitProps(props, ['separator', 'types']);
  const segmentTypes = () => local.types ?? defaultTimerSegmentTypes;

  return (
    <TimerArea {...others}>
      <Index each={segmentTypes()}>
        {(type, index) => (
          <>
            <TimerItem type={type()} />
            {index < segmentTypes().length - 1 && (
              <TimerSeparator>{local.separator ?? ':'}</TimerSeparator>
            )}
          </>
        )}
      </Index>
    </TimerArea>
  );
}

const Timer = Object.assign(TimerRoot, {
  Root: TimerRoot,
  RootProvider: TimerRootProvider,
  Area: TimerArea,
  Item: TimerItem,
  Separator: TimerSeparator,
  Control: TimerControl,
  ActionTrigger: TimerActionTrigger,
  Context: TimerPrimitive.Context,
  Segments: TimerSegments,
});

export { Timer, type TimerSegmentsProps, useTimer, useTimerContext };