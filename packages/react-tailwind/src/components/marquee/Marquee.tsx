'use client';

import { Marquee as MarqueePrimitive, useMarquee, useMarqueeContext } from '@ark-ui/react/marquee';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const marqueeEdgeVariants = cva('z-1 from-background to-transparent', {
  variants: {
    side: {
      start: 'w-1/5 bg-linear-to-r rtl:bg-linear-to-l',
      end: 'w-1/5 bg-linear-to-l rtl:bg-linear-to-r',
      top: 'h-1/5 bg-linear-to-b',
      bottom: 'h-1/5 bg-linear-to-t',
    },
  },
});

const Marquee = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Root>,
  ComponentProps<typeof MarqueePrimitive.Root>
>(function Marquee({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Root
      ref={ref}
      className={cn(
        'group w-full',
        (props.side === 'top' || props.side === 'bottom') && 'h-60',
        className,
      )}
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
      className={cn('group w-full', props.value.orientation === 'vertical' && 'h-60', className)}
      {...props}
      data-slot="marquee-root-provider"
    />
  );
});

const MarqueeViewport = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Viewport>,
  ComponentProps<typeof MarqueePrimitive.Viewport>
>(function MarqueeViewport(props, ref) {
  return <MarqueePrimitive.Viewport ref={ref} {...props} data-slot="marquee-viewport" />;
});

const MarqueeContent = forwardRef<
  ComponentRef<typeof MarqueePrimitive.Content>,
  ComponentProps<typeof MarqueePrimitive.Content>
>(function MarqueeContent({ className, ...props }, ref) {
  return (
    <MarqueePrimitive.Content
      ref={ref}
      className={cn(
        'animate-moduix-marquee-x group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[orientation=vertical]:animate-moduix-marquee-y motion-reduce:data-[orientation]:animate-none',
        className,
      )}
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
      className={cn('shrink-0', className)}
      {...props}
      data-slot="marquee-item"
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
      side={side}
      className={cn(marqueeEdgeVariants({ side }), className)}
      {...props}
      data-slot="marquee-edge"
    />
  );
});

const MarqueeContext = MarqueePrimitive.Context;

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

export type {
  MarqueeContentBaseProps,
  MarqueeContentProps,
  MarqueeContextProps,
  MarqueeEdgeBaseProps,
  MarqueeEdgeProps,
  MarqueeItemBaseProps,
  MarqueeItemProps,
  MarqueePauseStatusDetails,
  MarqueeRootBaseProps,
  MarqueeRootProps,
  MarqueeRootProviderBaseProps,
  MarqueeRootProviderProps,
  MarqueeSide,
  MarqueeViewportBaseProps,
  MarqueeViewportProps,
  UseMarqueeContext,
  UseMarqueeProps,
  UseMarqueeReturn,
} from '@ark-ui/react/marquee';