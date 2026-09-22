'use client';

import {
  NavigationMenu as NavigationMenuPrimitive,
  useNavigationMenu,
  useNavigationMenuContext,
} from '@ark-ui/react/navigation-menu';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './NavigationMenu.module.css';

const NavigationMenu = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Root>,
  ComponentProps<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenu({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.list, className)}
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
      className={clsx(styles.item, className)}
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
      className={clsx(!asChild && styles.trigger, className)}
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
      className={clsx(styles.content, className)}
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
      className={clsx(styles.link, className)}
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
      className={clsx(styles.indicator, className)}
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
      className={clsx(styles.itemIndicator, className)}
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
      className={clsx(styles.arrow, className)}
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
      className={clsx(styles.viewportPositioner, className)}
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
      className={clsx(styles.viewport, className)}
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