'use client';

import type { SplitterPanelData } from '@ark-ui/react/splitter';
import {
  createSplitterRegistry,
  Splitter as SplitterPrimitive,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/react/splitter';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/internal/cn';

const Splitter = forwardRef<
  ComponentRef<typeof SplitterPrimitive.Root>,
  ComponentProps<typeof SplitterPrimitive.Root>
>(function Splitter({ className, style, ...props }, ref) {
  return (
    <SplitterPrimitive.Root
      ref={ref}
      className={cn(
        'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize',
        className,
      )}
      style={{ width: undefined, height: undefined, ...style }}
      {...props}
      data-slot="splitter-root"
    />
  );
});

const SplitterRootProvider = forwardRef<
  ComponentRef<typeof SplitterPrimitive.RootProvider>,
  ComponentProps<typeof SplitterPrimitive.RootProvider>
>(function SplitterRootProvider({ className, style, ...props }, ref) {
  return (
    <SplitterPrimitive.RootProvider
      ref={ref}
      className={cn(
        'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize',
        className,
      )}
      style={{ width: undefined, height: undefined, ...style }}
      {...props}
      data-slot="splitter-root-provider"
    />
  );
});

const SplitterPanel = forwardRef<
  ComponentRef<typeof SplitterPrimitive.Panel>,
  ComponentProps<typeof SplitterPrimitive.Panel>
>(function SplitterPanel({ className, ...props }, ref) {
  return (
    <SplitterPrimitive.Panel
      ref={ref}
      className={cn(
        'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none group-data-[orientation=vertical]/splitter:min-h-0 data-dragging:select-none',
        className,
      )}
      {...props}
      data-slot="splitter-panel"
    />
  );
});

const SplitterResizeTriggerIndicator = forwardRef<
  ComponentRef<typeof SplitterPrimitive.ResizeTriggerIndicator>,
  ComponentProps<typeof SplitterPrimitive.ResizeTriggerIndicator>
>(function SplitterResizeTriggerIndicator({ className, ...props }, ref) {
  return (
    <SplitterPrimitive.ResizeTriggerIndicator
      ref={ref}
      className={cn(
        'pointer-events-none absolute start-1/2 top-1/2 z-2 box-border h-control-xs w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 ease-in-out group-hover/trigger:border-muted-foreground/40 group-hover/trigger:shadow-md group-focus-visible/trigger:outline-2 group-focus-visible/trigger:outline-offset-1 group-focus-visible/trigger:outline-ring data-disabled:invisible data-dragging:scale-[1.08] data-dragging:bg-background data-dragging:shadow-md data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-control-xs motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="splitter-resize-trigger-indicator"
    />
  );
});

const SplitterResizeTrigger = forwardRef<
  ComponentRef<typeof SplitterPrimitive.ResizeTrigger>,
  ComponentProps<typeof SplitterPrimitive.ResizeTrigger>
>(function SplitterResizeTrigger({ asChild, children, className, ...props }, ref) {
  return (
    <SplitterPrimitive.ResizeTrigger
      ref={ref}
      asChild={asChild}
      className={cn(
        "group/trigger relative z-1 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-200 ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-border before:transition-[background-color] before:duration-200 before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-2.5 after:content-[''] data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:min-h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full motion-reduce:transition-none motion-reduce:before:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40",
        className,
      )}
      {...props}
      data-slot="splitter-resize-trigger"
    >
      {children === undefined && !asChild ? <SplitterResizeTriggerIndicator /> : children}
    </SplitterPrimitive.ResizeTrigger>
  );
});

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
