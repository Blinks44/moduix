'use client';

import {
  ScrollArea as ScrollAreaPrimitive,
  useScrollArea,
  useScrollAreaContext,
} from '@ark-ui/react/scroll-area';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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
      className={cn(
        'group/scroll-area relative h-full min-h-0 w-full min-w-0 text-foreground',
        className,
      )}
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
      className={cn(
        'group/scroll-area relative h-full min-h-0 w-full min-w-0 text-foreground',
        className,
      )}
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
      className={cn(
        'h-full min-h-0 w-full min-w-0 [scrollbar-width:none] rounded-md bg-transparent outline-0 group-data-[fade]/scroll-area:not-forced-colors:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--spacing-10),var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(var(--spacing-10),var(--scroll-area-overflow-y-end,0px))),transparent_100%)] group-data-[fade]/scroll-area:not-forced-colors:mask-no-repeat focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring forced-colors:focus-visible:outline-[Highlight] [&::-webkit-scrollbar]:hidden',
        className,
      )}
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
      className={cn('block', className)}
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
      className={cn(
        "pointer-events-none absolute hidden touch-none justify-center rounded-md bg-transparent opacity-0 transition-[opacity,width,height] duration-[200ms,150ms,150ms] ease-in-out select-none group-data-[variant=always]/scroll-area:pointer-events-auto group-data-[variant=always]/scroll-area:opacity-100 before:absolute before:content-[''] data-dragging:pointer-events-auto data-hover:pointer-events-auto data-hover:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:start-0 data-[orientation=horizontal]:end-[var(--corner-width,0px)] data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:mb-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:bottom-1/2 data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:translate-y-1/2 data-[orientation=horizontal]:hover:h-1.5 data-[orientation=horizontal]:data-dragging:h-1.5 data-[orientation=horizontal]:data-overflow-x:flex data-[orientation=vertical]:end-0 data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-[var(--corner-height,0px)] data-[orientation=vertical]:my-1 data-[orientation=vertical]:me-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=vertical]:hover:w-1.5 data-[orientation=vertical]:data-dragging:w-1.5 data-[orientation=vertical]:data-overflow-y:flex motion-reduce:transition-none",
        className,
      )}
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
      className={cn(
        'rounded-full bg-border data-[orientation=horizontal]:h-full data-[orientation=horizontal]:min-w-control-xs data-[orientation=vertical]:min-h-control-xs data-[orientation=vertical]:w-full forced-colors:bg-[ButtonText]',
        className,
      )}
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
      className={cn('bg-transparent', className)}
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