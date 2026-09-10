'use client';

import {
  Marquee as MarqueePrimitive,
  useMarquee as useMarqueePrimitive,
  useMarqueeContext,
} from '@ark-ui/react/marquee';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const marqueeEdgeVariants = cva('pointer-events-none z-1', {
  variants: {
    side: {
      start: 'w-1/5 bg-linear-to-r from-background to-transparent rtl:bg-linear-to-l',
      end: 'w-1/5 bg-linear-to-l from-background to-transparent rtl:bg-linear-to-r',
      top: 'h-1/5 bg-linear-to-b from-background to-transparent',
      bottom: 'h-1/5 bg-linear-to-t from-background to-transparent',
    },
  },
});

const marqueeRootVariants = cva('group relative w-full overflow-hidden text-foreground', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'h-60',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const MarqueeRoot = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Root>,
  ComponentProps<typeof MarqueePrimitive.Root>
>(function MarqueeRoot({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Root
      ref={ref}
      data-slot="marquee-root"
      className={cn(
        marqueeRootVariants({
          orientation: props.side === 'top' || props.side === 'bottom' ? 'vertical' : 'horizontal',
        }),
        className,
      )}
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
      className={cn(marqueeRootVariants({ orientation: props.value.orientation }), className)}
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
      className={cn('size-full', className)}
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
      className={cn(
        'animate-moduix-marquee-x group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[side=bottom]:animate-moduix-marquee-y data-[side=top]:animate-moduix-marquee-y motion-reduce:animate-none',
        className,
      )}
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
      className={cn('shrink-0', className)}
      {...props}
    />
  );
});

const MarqueeEdge = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Edge>,
  ComponentProps<typeof MarqueePrimitive.Edge>
>(function MarqueeEdge({ className, side, ...props }, ref) {
  return (
    <MarqueePrimitive.Edge
      ref={ref}
      data-slot="marquee-edge"
      side={side}
      className={cn(marqueeEdgeVariants({ side }), className)}
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