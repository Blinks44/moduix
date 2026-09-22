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
import styles from './Splitter.module.css';

const rootStyle = {
  width: 'var(--moduix-splitter-width, 100%)',
  height: 'var(--moduix-splitter-height, 28rem)',
} satisfies CSSProperties;

const Splitter = forwardRef<
  ComponentRef<typeof SplitterPrimitive.Root>,
  ComponentProps<typeof SplitterPrimitive.Root>
>(function Splitter({ className, style, ...props }, ref) {
  return (
    <SplitterPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      style={{ ...rootStyle, ...style }}
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
      className={clsx(styles.root, className)}
      style={{ ...rootStyle, ...style }}
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
      className={clsx(styles.panel, className)}
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
      className={clsx(styles.resizeTriggerIndicator, className)}
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
      className={clsx(styles.resizeTrigger, className)}
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
