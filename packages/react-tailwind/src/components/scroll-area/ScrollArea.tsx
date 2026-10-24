'use client';

import {
  ScrollArea as ScrollAreaPrimitive,
  useScrollArea,
  useScrollAreaContext,
} from '@ark-ui/react/scroll-area';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type ScrollAreaVariant = 'hover' | 'always';
type ScrollAreaRootProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  fade?: boolean;
  variant?: ScrollAreaVariant;
};
type ScrollAreaRootProviderProps = ComponentProps<typeof ScrollAreaPrimitive.RootProvider> & {
  fade?: boolean;
  variant?: ScrollAreaVariant;
};

const ScrollArea = forwardRef<ComponentRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaRootProps>(
  function ScrollArea({ className, fade, variant = 'hover', ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        {...props}
        data-slot="scroll-area-root"
        data-fade={fade ? '' : undefined}
        data-variant={variant}
        className={cn('group/scroll-area h-full min-h-0 w-full min-w-0', className)}
      />
    );
  },
);

const ScrollAreaRootProvider = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.RootProvider>,
  ScrollAreaRootProviderProps
>(function ScrollAreaRootProvider({ className, fade, variant = 'hover', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.RootProvider
      ref={ref}
      {...props}
      data-slot="scroll-area-root-provider"
      data-fade={fade ? '' : undefined}
      data-variant={variant}
      className={cn('group/scroll-area h-full min-h-0 w-full min-w-0', className)}
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
        'h-full min-h-0 w-full min-w-0 [scrollbar-width:none] rounded-[inherit] outline-0 group-data-[fade]/scroll-area:not-forced-colors:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--spacing-10),var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(var(--spacing-10),var(--scroll-area-overflow-y-end,0px))),transparent_100%)] group-data-[fade]/scroll-area:not-forced-colors:mask-no-repeat focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring forced-colors:focus-visible:outline-[Highlight] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    />
  );
});

const ScrollAreaContent = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Content>,
  ComponentProps<typeof ScrollAreaPrimitive.Content>
>(function ScrollAreaContent(props, ref) {
  return <ScrollAreaPrimitive.Content ref={ref} {...props} data-slot="scroll-area-content" />;
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
        "pointer-events-none hidden opacity-0 transition-[opacity,width,height] duration-[var(--moduix-duration-normal),var(--moduix-duration-fast),var(--moduix-duration-fast)] ease-in-out group-data-[variant=always]/scroll-area:pointer-events-auto group-data-[variant=always]/scroll-area:opacity-100 before:absolute before:content-[''] data-hover:pointer-events-auto data-hover:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:mb-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:-inset-y-2 data-[orientation=horizontal]:hover:h-1.5 data-[orientation=horizontal]:data-dragging:h-1.5 data-[orientation=horizontal]:data-overflow-x:block data-[orientation=vertical]:my-1 data-[orientation=vertical]:me-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:-inset-x-2 data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:hover:w-1.5 data-[orientation=vertical]:data-dragging:w-1.5 data-[orientation=vertical]:data-overflow-y:block",
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
>(function ScrollAreaCorner(props, ref) {
  return <ScrollAreaPrimitive.Corner ref={ref} {...props} data-slot="scroll-area-corner" />;
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
export type { ScrollAreaRootProps, ScrollAreaRootProviderProps, ScrollAreaVariant };