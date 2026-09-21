import {
  Marquee as MarqueePrimitive,
  useMarquee as useMarqueePrimitive,
  useMarqueeContext,
} from '@ark-ui/react/marquee';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Marquee.module.css';

const Marquee = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Root>,
  ComponentProps<typeof MarqueePrimitive.Root>
>(function Marquee({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="marquee-root"
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
      className={clsx(styles.root, className)}
      {...props}
      data-slot="marquee-root-provider"
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
      className={clsx(styles.viewport, className)}
      {...props}
      data-slot="marquee-viewport"
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
      className={clsx(styles.content, className)}
      {...props}
      data-slot="marquee-content"
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
      className={clsx(styles.item, className)}
      {...props}
      data-slot="marquee-item"
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
      className={clsx(styles.edge, className)}
      {...props}
      data-slot="marquee-edge"
    />
  );
});

const MarqueeContext = MarqueePrimitive.Context;
const useMarquee = useMarqueePrimitive;

export {
  Marquee,
  MarqueeContext,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
  useMarqueeContext,
};
