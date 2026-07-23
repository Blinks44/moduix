import {
  Marquee as MarqueePrimitive,
  useMarquee as useMarqueePrimitive,
  useMarqueeContext,
} from '@ark-ui/react/marquee';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Marquee.module.css';

const MarqueeRoot = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Root>,
  ComponentProps<typeof MarqueePrimitive.Root>
>(function MarqueeRoot({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Root
      ref={ref}
      data-slot="marquee-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const MarqueeRootProvider = forwardRef<
  ComponentRef<typeof MarqueePrimitive.RootProvider>,
  ComponentProps<typeof MarqueePrimitive.RootProvider>
>(function MarqueeRootProvider({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.RootProvider
      ref={ref}
      data-slot="marquee-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const MarqueeViewport = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Viewport>,
  ComponentProps<typeof MarqueePrimitive.Viewport>
>(function MarqueeViewport({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Viewport
      ref={ref}
      data-slot="marquee-viewport"
      className={clsx(styles.viewport, normalizeClassName(className))}
      {...props}
    />
  );
});

const MarqueeContent = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Content>,
  ComponentProps<typeof MarqueePrimitive.Content>
>(function MarqueeContent({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Content
      ref={ref}
      data-slot="marquee-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const MarqueeItem = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Item>,
  ComponentProps<typeof MarqueePrimitive.Item>
>(function MarqueeItem({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Item
      ref={ref}
      data-slot="marquee-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const MarqueeEdge = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Edge>,
  ComponentProps<typeof MarqueePrimitive.Edge>
>(function MarqueeEdge({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Edge
      ref={ref}
      data-slot="marquee-edge"
      className={clsx(styles.edge, normalizeClassName(className))}
      {...props}
    />
  );
});

const Marquee = Object.assign(MarqueeRoot, {
  Root: MarqueeRoot,
  RootProvider: MarqueeRootProvider,
  Context: MarqueePrimitive.Context,
  Viewport: MarqueeViewport,
  Content: MarqueeContent,
  Item: MarqueeItem,
  Edge: MarqueeEdge,
});

const useMarquee = useMarqueePrimitive;

export { Marquee, useMarquee, useMarqueeContext };