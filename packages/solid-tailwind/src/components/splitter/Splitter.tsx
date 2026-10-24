import type { SplitterPanelData } from '@ark-ui/solid/splitter';
import {
  createSplitterRegistry,
  Splitter as SplitterPrimitive,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/solid/splitter';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function getRootStyle(style: ComponentProps<typeof SplitterPrimitive.Root>['style']) {
  if (typeof style === 'string') {
    return `width:;height:;${style}`;
  }

  return { width: undefined, height: undefined, ...style } satisfies JSX.CSSProperties;
}

function Splitter(props: ComponentProps<typeof SplitterPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class', 'style']);

  return (
    <SplitterPrimitive.Root
      class={cn(
        'h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm',
        local.class,
      )}
      style={getRootStyle(local.style)}
      {...others}
      data-slot="splitter-root"
    />
  );
}

function SplitterRootProvider(props: ComponentProps<typeof SplitterPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class', 'style']);

  return (
    <SplitterPrimitive.RootProvider
      class={cn(
        'h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm',
        local.class,
      )}
      style={getRootStyle(local.style)}
      {...others}
      data-slot="splitter-root-provider"
    />
  );
}

function SplitterPanel(props: ComponentProps<typeof SplitterPrimitive.Panel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SplitterPrimitive.Panel
      class={cn('p-4 data-dragging:select-none', local.class)}
      {...others}
      data-slot="splitter-panel"
    />
  );
}

function SplitterResizeTriggerIndicator(
  props: ComponentProps<typeof SplitterPrimitive.ResizeTriggerIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SplitterPrimitive.ResizeTriggerIndicator
      class={cn(
        'pointer-events-none absolute h-control-xs w-1.5 rounded-full border border-border bg-background shadow-sm transition-[border-color,box-shadow,scale] duration-normal ease-in-out group-hover/trigger:border-muted-foreground/40 group-hover/trigger:shadow-md group-[:focus-visible:not([data-dragging])]/trigger:outline-focus group-[:focus-visible:not([data-dragging])]/trigger:outline-offset-1 group-[:focus-visible:not([data-dragging])]/trigger:outline-ring data-disabled:invisible data-dragging:scale-[1.08] data-dragging:shadow-md data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-control-xs',
        local.class,
      )}
      {...others}
      data-slot="splitter-resize-trigger-indicator"
    />
  );
}

function SplitterResizeTrigger(props: ComponentProps<typeof SplitterPrimitive.ResizeTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <SplitterPrimitive.ResizeTrigger
      asChild={local.asChild}
      type={local.asChild ? undefined : 'button'}
      class={cn(
        "group/trigger relative z-1 flex w-px appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 before:absolute before:h-full before:w-[0.5px] before:bg-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:h-full after:w-2.5 after:content-[''] hover:before:bg-muted-foreground/40 data-disabled:opacity-disabled data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-focus [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring",
        local.class,
      )}
      {...others}
      data-slot="splitter-resize-trigger"
    >
      {local.children === undefined && !local.asChild ? (
        <SplitterResizeTriggerIndicator />
      ) : (
        local.children
      )}
    </SplitterPrimitive.ResizeTrigger>
  );
}

const SplitterContext = SplitterPrimitive.Context;

export {
  createSplitterRegistry,
  Splitter,
  SplitterContext,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
  type SplitterPanelData,
  useSplitter,
  useSplitterContext,
};