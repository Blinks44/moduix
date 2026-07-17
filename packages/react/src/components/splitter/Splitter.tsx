import type { SplitterPanelData } from '@ark-ui/react/splitter';
import {
  createSplitterRegistry,
  Splitter as SplitterPrimitive,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/react/splitter';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, CSSProperties } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Splitter.module.css';

const rootStyle = {
  width: 'var(--splitter-width, 100%)',
  height: 'var(--splitter-height, 28rem)',
} satisfies CSSProperties;

const SplitterRoot = forwardRef<
  ComponentRef<typeof SplitterPrimitive.Root>,
  ComponentProps<typeof SplitterPrimitive.Root>
>(function SplitterRoot({ className, style, ...props }, ref) {
  return (
    <SplitterPrimitive.Root
      ref={ref}
      data-slot="splitter-root"
      className={clsx(styles.root, normalizeClassName(className))}
      style={{ ...rootStyle, ...style }}
      {...props}
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
      data-slot="splitter-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      style={{ ...rootStyle, ...style }}
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

const SplitterResizeTrigger = forwardRef<
  ComponentRef<typeof SplitterPrimitive.ResizeTrigger>,
  ComponentProps<typeof SplitterPrimitive.ResizeTrigger>
>(function SplitterResizeTrigger({ children, className, ...props }, ref) {
  return (
    <SplitterPrimitive.ResizeTrigger
      ref={ref}
      data-slot="splitter-resize-trigger"
      className={clsx(styles.resizeTrigger, normalizeClassName(className))}
      {...props}
    >
      {children === undefined ? <SplitterResizeTriggerIndicator /> : children}
    </SplitterPrimitive.ResizeTrigger>
  );
});

const Splitter = Object.assign(SplitterRoot, {
  Root: SplitterRoot,
  RootProvider: SplitterRootProvider,
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