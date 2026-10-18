import {
  NavigationMenu as NavigationMenuPrimitive,
  useNavigationMenu,
  useNavigationMenuContext,
} from '@ark-ui/solid/navigation-menu';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const rootClassName = 'relative box-border flex w-fit max-w-full min-w-0 text-foreground';

function NavigationMenu(props: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Root
      class={cn(rootClassName, local.class)}
      {...others}
      data-slot="navigation-menu-root"
    />
  );
}

function NavigationMenuRootProvider(
  props: ComponentProps<typeof NavigationMenuPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.RootProvider
      class={cn(rootClassName, local.class)}
      {...others}
      data-slot="navigation-menu-root-provider"
    />
  );
}

function NavigationMenuList(props: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.List
      class={cn(
        'group/navigation-menu-list m-0 box-border flex max-w-full list-none items-center gap-1 p-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-list"
    />
  );
}

function NavigationMenuItem(props: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Item
      class={cn(
        'relative group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:static',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-item"
    />
  );
}

function NavigationMenuTrigger(props: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <NavigationMenuPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-[state=open]:bg-muted [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-[rotate] [&>svg]:duration-normal [&>svg]:ease-in-out data-[state=open]:[&>svg]:rotate-180 motion-reduce:[&>svg]:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-trigger"
    />
  );
}

function NavigationMenuContent(props: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Content
      class={cn(
        'absolute start-0 top-[calc(100%+0.5rem)] z-60 box-border flex max-h-[min(24rem,calc(100dvh-1.5rem))] w-max max-w-[min(20rem,calc(100vw-1.5rem))] min-w-[min(max(var(--trigger-width,0px),12rem),calc(100vw-1.5rem))] origin-top-left flex-col overflow-auto overscroll-contain rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:data-[state=closed]:animate-none data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none rtl:origin-top-right [&_[data-slot=navigation-menu-link]]:mx-1 [&_[data-slot=navigation-menu-link]]:justify-start [&_[data-slot=navigation-menu-link]]:rounded-sm [&_[data-slot=navigation-menu-link]]:px-2',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-content"
    />
  );
}

function NavigationMenuLink(props: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Link
      class={cn(
        'box-border inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-current:text-primary data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-link"
    />
  );
}

function NavigationMenuIndicator(props: ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Indicator
      class={cn(
        'pointer-events-none absolute -bottom-2.5 left-0 z-61 flex h-2.5 w-[var(--trigger-width,0px)] [translate:var(--trigger-x,0px)_0] justify-center transition-[translate,width] duration-normal ease-in-out data-[state=closed]:animate-[moduix-fade-out_var(--moduix-transition-default)_forwards] data-[state=open]:animate-[moduix-fade-in_var(--moduix-transition-default)] motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-indicator"
    />
  );
}

function NavigationMenuItemIndicator(
  props: ComponentProps<typeof NavigationMenuPrimitive.ItemIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.ItemIndicator
      class={cn('absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-current', local.class)}
      {...others}
      data-slot="navigation-menu-item-indicator"
    />
  );
}

function NavigationMenuArrow(props: ComponentProps<typeof NavigationMenuPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Arrow
      class={cn(
        'relative top-1 size-2.5 rotate-45 border-s border-t border-border bg-popover',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-arrow"
    />
  );
}

function NavigationMenuViewportPositioner(
  props: ComponentProps<typeof NavigationMenuPrimitive.ViewportPositioner>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.ViewportPositioner
      class={cn(
        'absolute z-60 flex data-[orientation=horizontal]:top-full data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:[translate:var(--viewport-x,0px)_0] data-[orientation=vertical]:start-full data-[orientation=vertical]:top-[var(--viewport-y,0px)]',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-viewport-positioner"
    />
  );
}

function NavigationMenuViewport(props: ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Viewport
      class={cn(
        'relative mt-2.5 box-border h-[var(--viewport-height)] max-h-[min(32rem,calc(100dvh-1.5rem))] w-[var(--viewport-width)] max-w-[min(40rem,calc(100vw-1.5rem))] origin-top overflow-hidden rounded-md bg-popover text-popover-foreground shadow-lg outline-1 outline-border transition-[width,height] duration-normal ease-in-out data-[orientation=vertical]:ms-2 data-[orientation=vertical]:mt-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none [&_[data-slot=navigation-menu-content]]:absolute [&_[data-slot=navigation-menu-content]]:top-0 [&_[data-slot=navigation-menu-content]]:right-auto [&_[data-slot=navigation-menu-content]]:left-0 [&_[data-slot=navigation-menu-content]]:max-h-none [&_[data-slot=navigation-menu-content]]:overflow-visible [&_[data-slot=navigation-menu-content]]:rounded-none [&_[data-slot=navigation-menu-content]]:bg-transparent [&_[data-slot=navigation-menu-content]]:shadow-none [&_[data-slot=navigation-menu-content]]:outline-0 [&_[data-slot=navigation-menu-content]]:will-change-[translate,opacity] [&_[data-slot=navigation-menu-content][data-motion=from-end][data-state=open]]:animate-moduix-navigation-menu-content-from-end [&_[data-slot=navigation-menu-content][data-motion=from-start][data-state=open]]:animate-moduix-navigation-menu-content-from-start [&_[data-slot=navigation-menu-content][data-motion=to-end][data-state=closed]]:animate-moduix-navigation-menu-content-to-end [&_[data-slot=navigation-menu-content][data-motion=to-start][data-state=closed]]:animate-moduix-navigation-menu-content-to-start motion-reduce:[&_[data-slot=navigation-menu-content][data-motion][data-state]]:animate-none [&_[data-slot=navigation-menu-content][data-state]]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="navigation-menu-viewport"
    />
  );
}

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

export type {
  NavigationMenuArrowProps,
  NavigationMenuContentProps,
  NavigationMenuContextProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuRootProps,
  NavigationMenuRootProviderProps,
  NavigationMenuTriggerProps,
  NavigationMenuValueChangeDetails,
  NavigationMenuViewportPositionerProps,
  NavigationMenuViewportProps,
  UseNavigationMenuContext,
  UseNavigationMenuProps,
  UseNavigationMenuReturn,
} from '@ark-ui/solid/navigation-menu';