'use client';

import {
  NavigationMenu as NavigationMenuPrimitive,
  useNavigationMenu,
  useNavigationMenuContext,
} from '@ark-ui/react/navigation-menu';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const NavigationMenu = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Root>,
  ComponentProps<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenu({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        'group/navigation-menu relative box-border flex w-fit max-w-full min-w-0 justify-center text-foreground',
        className,
      )}
      {...props}
      data-slot="navigation-menu-root"
    />
  );
});

const NavigationMenuRootProvider = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.RootProvider>,
  ComponentProps<typeof NavigationMenuPrimitive.RootProvider>
>(function NavigationMenuRootProvider({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.RootProvider
      ref={ref}
      className={cn(
        'group/navigation-menu relative box-border flex w-fit max-w-full min-w-0 justify-center text-foreground',
        className,
      )}
      {...props}
      data-slot="navigation-menu-root-provider"
    />
  );
});

const NavigationMenuList = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.List>,
  ComponentProps<typeof NavigationMenuPrimitive.List>
>(function NavigationMenuList({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        'group/navigation-menu-list relative m-0 box-border flex max-w-full list-none items-center gap-1 p-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch [&>[data-slot=navigation-menu-indicator]]:top-auto [&>[data-slot=navigation-menu-indicator]]:-bottom-2.5 [&>[data-slot=navigation-menu-indicator]]:z-[61]',
        className,
      )}
      {...props}
      data-slot="navigation-menu-list"
    />
  );
});

const NavigationMenuItem = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Item>,
  ComponentProps<typeof NavigationMenuPrimitive.Item>
>(function NavigationMenuItem({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:static group-has-[>[data-slot=navigation-menu-viewport-positioner]>[data-slot=navigation-menu-viewport]]/navigation-menu:static',
        className,
      )}
      {...props}
      data-slot="navigation-menu-item"
    />
  );
});

const NavigationMenuTrigger = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentProps<typeof NavigationMenuPrimitive.Trigger>
>(function NavigationMenuTrigger({ asChild, className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-[state=open]:bg-muted motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-[rotate] [&>svg]:duration-200 [&>svg]:ease-in-out data-[state=open]:[&>svg]:rotate-180 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted',
        className,
      )}
      {...props}
      data-slot="navigation-menu-trigger"
    />
  );
});

const NavigationMenuContent = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Content>,
  ComponentProps<typeof NavigationMenuPrimitive.Content>
>(function NavigationMenuContent({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        'group/navigation-menu-content absolute start-0 top-[calc(100%+0.5rem)] z-60 box-border flex max-h-[min(24rem,calc(100dvh-1.5rem))] w-max max-w-[min(20rem,calc(100vw-1.5rem))] min-w-[min(max(var(--trigger-width,0px),12rem),calc(100vw-1.5rem))] origin-top-left flex-col overflow-auto overscroll-contain rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:data-[state=closed]:animate-none data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none rtl:origin-top-right [&_[data-slot=navigation-menu-link]]:mx-1 [&_[data-slot=navigation-menu-link]]:justify-start [&_[data-slot=navigation-menu-link]]:rounded-sm [&_[data-slot=navigation-menu-link]]:px-2',
        className,
      )}
      {...props}
      data-slot="navigation-menu-content"
    />
  );
});

const NavigationMenuLink = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Link>,
  ComponentProps<typeof NavigationMenuPrimitive.Link>
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(
        'box-border inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-current:bg-transparent data-current:text-primary data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-[rotate] [&>svg]:duration-200 [&>svg]:ease-in-out [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted',
        className,
      )}
      {...props}
      data-slot="navigation-menu-link"
    />
  );
});

const NavigationMenuIndicator = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  ComponentProps<typeof NavigationMenuPrimitive.Indicator>
>(function NavigationMenuIndicator({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'pointer-events-none absolute start-0 -top-2.5 flex h-2.5 w-[var(--trigger-width,0px)] [translate:var(--trigger-x,0px)_0] justify-center transition-[translate,inline-size] duration-200 ease-in-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="navigation-menu-indicator"
    />
  );
});

const NavigationMenuItemIndicator = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.ItemIndicator>,
  ComponentProps<typeof NavigationMenuPrimitive.ItemIndicator>
>(function NavigationMenuItemIndicator({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.ItemIndicator
      ref={ref}
      className={cn('absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-current', className)}
      {...props}
      data-slot="navigation-menu-item-indicator"
    />
  );
});

const NavigationMenuArrow = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Arrow>,
  ComponentProps<typeof NavigationMenuPrimitive.Arrow>
>(function NavigationMenuArrow({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Arrow
      ref={ref}
      className={cn(
        'relative top-1 size-2.5 rotate-45 border-s border-t border-border bg-popover',
        className,
      )}
      {...props}
      data-slot="navigation-menu-arrow"
    />
  );
});

const NavigationMenuViewportPositioner = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.ViewportPositioner>,
  ComponentProps<typeof NavigationMenuPrimitive.ViewportPositioner>
>(function NavigationMenuViewportPositioner({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.ViewportPositioner
      ref={ref}
      className={cn(
        'absolute start-0 top-full z-60 flex [translate:var(--viewport-x,0px)_0] data-[orientation=vertical]:start-full data-[orientation=vertical]:top-[var(--viewport-y,0px)] data-[orientation=vertical]:[translate:0_0] data-[orientation=vertical]:[&>[data-slot=navigation-menu-viewport]]:ms-2 data-[orientation=vertical]:[&>[data-slot=navigation-menu-viewport]]:mt-0',
        className,
      )}
      {...props}
      data-slot="navigation-menu-viewport-positioner"
    />
  );
});

const NavigationMenuViewport = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  ComponentProps<typeof NavigationMenuPrimitive.Viewport>
>(function NavigationMenuViewport({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        'relative mt-2.5 box-border h-[var(--viewport-height)] max-h-[min(32rem,calc(100dvh-1.5rem))] w-[var(--viewport-width)] max-w-[min(40rem,calc(100vw-1.5rem))] origin-top overflow-hidden rounded-md bg-popover text-popover-foreground shadow-lg outline-1 outline-border transition-[inline-size,block-size] duration-200 ease-in-out data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none motion-reduce:transition-none [&_[data-slot=navigation-menu-content]]:absolute [&_[data-slot=navigation-menu-content]]:top-0 [&_[data-slot=navigation-menu-content]]:right-auto [&_[data-slot=navigation-menu-content]]:bottom-auto [&_[data-slot=navigation-menu-content]]:left-0 [&_[data-slot=navigation-menu-content]]:m-0 [&_[data-slot=navigation-menu-content]]:max-h-none [&_[data-slot=navigation-menu-content]]:origin-center [&_[data-slot=navigation-menu-content]]:overflow-visible [&_[data-slot=navigation-menu-content]]:rounded-none [&_[data-slot=navigation-menu-content]]:bg-transparent [&_[data-slot=navigation-menu-content]]:shadow-none [&_[data-slot=navigation-menu-content]]:outline-0 [&_[data-slot=navigation-menu-content]]:will-change-[translate,opacity] [&_[data-slot=navigation-menu-content][data-motion=from-end][data-state=open]]:animate-moduix-navigation-menu-content-from-end [&_[data-slot=navigation-menu-content][data-motion=from-start][data-state=open]]:animate-moduix-navigation-menu-content-from-start [&_[data-slot=navigation-menu-content][data-motion=to-end][data-state=closed]]:animate-moduix-navigation-menu-content-to-end [&_[data-slot=navigation-menu-content][data-motion=to-start][data-state=closed]]:animate-moduix-navigation-menu-content-to-start [&_[data-slot=navigation-menu-content][data-state]]:animate-none',
        className,
      )}
      {...props}
      data-slot="navigation-menu-viewport"
    />
  );
});

const NavigationMenuContext = NavigationMenuPrimitive.Context;

export {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuContext,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuItemIndicator,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRootProvider,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
  useNavigationMenu,
  useNavigationMenuContext,
};
