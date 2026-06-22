import type { ComponentProps, ComponentRef } from 'react';
import {
  Splitter as SplitterPrimitive,
  createSplitterRegistry,
  getSplitterLayout,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/react/splitter';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Splitter.module.css';

const SplitterRoot = forwardRef<
  ComponentRef<typeof SplitterPrimitive.Root>,
  ComponentProps<typeof SplitterPrimitive.Root>
>(function SplitterRoot({ className, ...props }, ref) {
  return (
    <SplitterPrimitive.Root
      ref={ref}
      data-slot="splitter-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SplitterRootProvider = forwardRef<
  ComponentRef<typeof SplitterPrimitive.RootProvider>,
  ComponentProps<typeof SplitterPrimitive.RootProvider>
>(function SplitterRootProvider({ className, ...props }, ref) {
  return (
    <SplitterPrimitive.RootProvider
      ref={ref}
      data-slot="splitter-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="splitter-panel"
      className={clsx(styles.panel, normalizeClassName(className))}
      {...props}
    />
  );
});

const SplitterResizeTrigger = forwardRef<
  ComponentRef<typeof SplitterPrimitive.ResizeTrigger>,
  ComponentProps<typeof SplitterPrimitive.ResizeTrigger>
>(function SplitterResizeTrigger({ className, ...props }, ref) {
  return (
    <SplitterPrimitive.ResizeTrigger
      ref={ref}
      data-slot="splitter-resize-trigger"
      className={clsx(styles.resizeTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="splitter-resize-trigger-indicator"
      className={clsx(styles.resizeTriggerIndicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const SplitterContext = SplitterPrimitive.Context;

const Splitter = Object.assign(SplitterRoot, {
  Root: SplitterRoot,
  RootProvider: SplitterRootProvider,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
  ResizeTriggerIndicator: SplitterResizeTriggerIndicator,
  Context: SplitterContext,
  createRegistry: SplitterPrimitive.createRegistry,
  getLayout: SplitterPrimitive.getLayout,
});

export { Splitter, createSplitterRegistry, getSplitterLayout, useSplitter, useSplitterContext };
export type {
  SplitterContextProps,
  SplitterExpandCollapseDetails,
  SplitterPanelBaseProps,
  SplitterPanelData,
  SplitterPanelProps,
  SplitterRegistryProps,
  SplitterRegistryReturn,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
  SplitterResizeTriggerBaseProps,
  SplitterResizeTriggerIndicatorBaseProps,
  SplitterResizeTriggerIndicatorProps,
  SplitterResizeTriggerProps,
  SplitterRootBaseProps,
  SplitterRootProps,
  SplitterRootProviderBaseProps,
  SplitterRootProviderProps,
  UseSplitterContext,
  UseSplitterProps,
  UseSplitterReturn,
} from '@ark-ui/react/splitter';