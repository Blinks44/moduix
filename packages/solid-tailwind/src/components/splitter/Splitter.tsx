import type { SplitterPanelData } from '@ark-ui/solid/splitter';
import {
  createSplitterRegistry,
  Splitter as SplitterPrimitive,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/solid/splitter';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/internal/cn';

function getRootStyle(style: ComponentProps<typeof SplitterPrimitive.Root>['style']) {
  if (typeof style === 'string') {
    return `width:;height:;${style}`;
  }

  return { width: undefined, height: undefined, ...style } satisfies JSX.CSSProperties;
}

function SplitterRoot(props: ComponentProps<typeof SplitterPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'style']);

  return (
    <SplitterPrimitive.Root
      asChild={local.asChild}
      data-slot="splitter-root"
      class={cn(
        'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize',
        local.class,
      )}
      style={getRootStyle(local.style)}
      {...others}
    />
  );
}

function SplitterRootProvider(props: ComponentProps<typeof SplitterPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'style']);

  return (
    <SplitterPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="splitter-root-provider"
      class={cn(
        'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize',
        local.class,
      )}
      style={getRootStyle(local.style)}
      {...others}
    />
  );
}

function SplitterPanel(props: ComponentProps<typeof SplitterPrimitive.Panel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SplitterPrimitive.Panel
      data-slot="splitter-panel"
      class={cn(
        'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none group-data-[orientation=vertical]/splitter:min-h-0 data-dragging:select-none',
        local.class,
      )}
      {...others}
    />
  );
}

function SplitterResizeTriggerIndicator(
  props: ComponentProps<typeof SplitterPrimitive.ResizeTriggerIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SplitterPrimitive.ResizeTriggerIndicator
      data-slot="splitter-resize-trigger-indicator"
      class={cn(
        'pointer-events-none absolute start-1/2 top-1/2 z-2 box-border h-control-xs w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 ease-in-out group-hover/trigger:border-muted-foreground group-hover/trigger:shadow-md group-focus-visible/trigger:outline-2 group-focus-visible/trigger:outline-offset-1 group-focus-visible/trigger:outline-ring data-disabled:invisible data-dragging:scale-[1.08] data-dragging:border-border data-dragging:bg-background data-dragging:shadow-md data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-control-xs',
        local.class,
      )}
      {...others}
    />
  );
}

function SplitterResizeTrigger(props: ComponentProps<typeof SplitterPrimitive.ResizeTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <SplitterPrimitive.ResizeTrigger
      asChild={local.asChild}
      data-slot="splitter-resize-trigger"
      class={cn(
        "group/trigger relative z-1 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-200 ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-border before:transition-[background-color] before:duration-200 before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-2.5 after:content-[''] data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground data-[orientation=vertical]:h-px data-[orientation=vertical]:min-h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground",
        local.class,
      )}
      {...others}
    >
      {local.children === undefined && !local.asChild ? (
        <SplitterResizeTriggerIndicator />
      ) : (
        local.children
      )}
    </SplitterPrimitive.ResizeTrigger>
  );
}

type SplitterComponent = typeof SplitterRoot & {
  Root: typeof SplitterRoot;
  RootProvider: typeof SplitterRootProvider;
  Context: typeof SplitterPrimitive.Context;
  Panel: typeof SplitterPanel;
  ResizeTrigger: typeof SplitterResizeTrigger;
  ResizeTriggerIndicator: typeof SplitterResizeTriggerIndicator;
};

const Splitter: SplitterComponent = Object.assign(SplitterRoot, {
  Root: SplitterRoot,
  RootProvider: SplitterRootProvider,
  Context: SplitterPrimitive.Context,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
  ResizeTriggerIndicator: SplitterResizeTriggerIndicator,
});

export {
  createSplitterRegistry,
  Splitter,
  type SplitterPanelData,
  useSplitter,
  useSplitterContext,
};