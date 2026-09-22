'use client';

import {
  ScrollArea as ScrollAreaPrimitive,
  useScrollArea,
  useScrollAreaContext,
} from '@ark-ui/react/scroll-area';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './ScrollArea.module.css';

type ModuixScrollAreaRootProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  fade?: boolean;
  variant?: 'hover' | 'always';
};
type ModuixScrollAreaRootProviderProps = ComponentProps<typeof ScrollAreaPrimitive.RootProvider> & {
  fade?: boolean;
  variant?: 'hover' | 'always';
};

const ScrollArea = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ModuixScrollAreaRootProps
>(function ScrollArea({ className, fade, variant = 'hover', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      {...props}
      data-slot="scroll-area-root"
      data-fade={fade ? '' : undefined}
      data-variant={variant}
      className={clsx(styles.root, className)}
    />
  );
});

const ScrollAreaRootProvider = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.RootProvider>,
  ModuixScrollAreaRootProviderProps
>(function ScrollAreaRootProvider({ className, fade, variant = 'hover', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.RootProvider
      ref={ref}
      {...props}
      data-slot="scroll-area-root-provider"
      data-fade={fade ? '' : undefined}
      data-variant={variant}
      className={clsx(styles.root, className)}
    />
  );
});

const ScrollAreaViewport = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Viewport>,
  ComponentProps<typeof ScrollAreaPrimitive.Viewport>
>(function ScrollAreaViewport({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      {...props}
      data-slot="scroll-area-viewport"
      className={clsx(styles.viewport, className)}
    />
  );
});

const ScrollAreaContent = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Content>,
  ComponentProps<typeof ScrollAreaPrimitive.Content>
>(function ScrollAreaContent({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Content
      ref={ref}
      {...props}
      data-slot="scroll-area-content"
      className={clsx(styles.content, className)}
    />
  );
});

const ScrollAreaScrollbar = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>
>(function ScrollAreaScrollbar({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      {...props}
      data-slot="scroll-area-scrollbar"
      className={clsx(styles.scrollbar, className)}
    />
  );
});

const ScrollAreaThumb = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Thumb>,
  ComponentProps<typeof ScrollAreaPrimitive.Thumb>
>(function ScrollAreaThumb({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Thumb
      ref={ref}
      {...props}
      data-slot="scroll-area-thumb"
      className={clsx(styles.thumb, className)}
    />
  );
});

const ScrollAreaCorner = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Corner>,
  ComponentProps<typeof ScrollAreaPrimitive.Corner>
>(function ScrollAreaCorner({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Corner
      ref={ref}
      {...props}
      data-slot="scroll-area-corner"
      className={clsx(styles.corner, className)}
    />
  );
});

const ScrollAreaContext = ScrollAreaPrimitive.Context;

export {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
  useScrollAreaContext,
};
export type { ModuixScrollAreaRootProps, ModuixScrollAreaRootProviderProps };