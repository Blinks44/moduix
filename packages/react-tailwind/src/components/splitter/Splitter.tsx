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
import { cn } from '@/lib/moduix/cn';

const Splitter = forwardRef<
  ComponentRef<typeof SplitterPrimitive.Root>,
  ComponentProps<typeof SplitterPrimitive.Root>
>(function Splitter({ className, style, ...props }, ref) {
  return (
    <SplitterPrimitive.Root
      ref={ref}
      className={cn(
        'box-border h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm',
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
        'box-border h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm',
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
      className={cn('box-border p-4 data-dragging:select-none', className)}
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
        'pointer-events-none absolute box-border h-control-xs w-1.5 rounded-full border border-border bg-background shadow-sm transition-[border-color,box-shadow,scale] duration-normal ease-in-out group-hover/trigger:border-muted-foreground/40 group-hover/trigger:shadow-md group-[:focus-visible:not([data-dragging])]/trigger:outline-2 group-[:focus-visible:not([data-dragging])]/trigger:outline-offset-1 group-[:focus-visible:not([data-dragging])]/trigger:outline-ring data-disabled:invisible data-dragging:scale-[1.08] data-dragging:shadow-md data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-control-xs',
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
      type={asChild ? undefined : 'button'}
      className={cn(
        "group/trigger relative z-1 box-border flex w-px appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 before:absolute before:h-full before:w-[0.5px] before:bg-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:h-full after:w-2.5 after:content-[''] hover:before:bg-muted-foreground/40 data-disabled:opacity-disabled data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-2 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring",
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