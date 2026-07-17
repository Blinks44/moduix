import { ScrollArea as ScrollAreaPrimitive, useScrollArea } from '@ark-ui/react/scroll-area';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './ScrollArea.module.css';

type ModuixScrollAreaRootProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  fade?: boolean;
  variant?: 'hover' | 'always';
};
type ModuixScrollAreaRootProviderProps = ComponentProps<typeof ScrollAreaPrimitive.RootProvider> & {
  fade?: boolean;
  variant?: 'hover' | 'always';
};

const ScrollAreaRoot = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ModuixScrollAreaRootProps
>(function ScrollAreaRoot({ className, fade, variant = 'hover', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area-root"
      data-fade={fade ? '' : undefined}
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="scroll-area-root-provider"
      data-fade={fade ? '' : undefined}
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="scroll-area-viewport"
      className={clsx(styles.viewport, normalizeClassName(className))}
      {...props}
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
      data-slot="scroll-area-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="scroll-area-scrollbar"
      className={clsx(styles.scrollbar, normalizeClassName(className))}
      {...props}
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
      data-slot="scroll-area-thumb"
      className={clsx(styles.thumb, normalizeClassName(className))}
      {...props}
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
      data-slot="scroll-area-corner"
      className={clsx(styles.corner, normalizeClassName(className))}
      {...props}
    />
  );
});

const ScrollArea = Object.assign(ScrollAreaRoot, {
  Root: ScrollAreaRoot,
  RootProvider: ScrollAreaRootProvider,
  Viewport: ScrollAreaViewport,
  Content: ScrollAreaContent,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
  useScrollArea,
});

export { ScrollArea, useScrollArea };
export type { ModuixScrollAreaRootProps, ModuixScrollAreaRootProviderProps };