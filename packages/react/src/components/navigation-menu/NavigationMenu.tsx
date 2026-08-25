'use client';

import {
  NavigationMenu as NavigationMenuPrimitive,
  useNavigationMenu,
  useNavigationMenuContext,
} from '@ark-ui/react/navigation-menu';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { Children, forwardRef, isValidElement } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './NavigationMenu.module.css';

const NavigationMenuRoot = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Root>,
  ComponentProps<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenuRoot({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      data-slot="navigation-menu-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-trigger"
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const NavigationMenuContent = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Content>,
  ComponentProps<typeof NavigationMenuPrimitive.Content>
>(function NavigationMenuContent({ asChild, className, children, ...props }, ref) {
  if (asChild) {
    return (
      <NavigationMenuPrimitive.Content
        ref={ref}
        asChild
        data-slot="navigation-menu-content"
        className={clsx(styles.content, normalizeClassName(className))}
        {...props}
      >
        {children}
      </NavigationMenuPrimitive.Content>
    );
  }

  const childrenArray = Children.toArray(children);
  const indicators = childrenArray.filter(
    (child) => isValidElement(child) && child.type === NavigationMenuIndicator,
  );
  const content = childrenArray.filter(
    (child) => !isValidElement(child) || child.type !== NavigationMenuIndicator,
  );

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      data-slot="navigation-menu-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    >
      {indicators}
      <div className={styles.contentViewport}>{content}</div>
    </NavigationMenuPrimitive.Content>
  );
});

const NavigationMenuLink = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Link>,
  ComponentProps<typeof NavigationMenuPrimitive.Link>
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      data-slot="navigation-menu-link"
      className={clsx(styles.link, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-arrow"
      className={clsx(styles.arrow, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-viewport-positioner"
      className={clsx(styles.viewportPositioner, normalizeClassName(className))}
      {...props}
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
      data-slot="navigation-menu-viewport"
      className={clsx(styles.viewport, normalizeClassName(className))}
      {...props}
    />
  );
});

const NavigationMenu = Object.assign(NavigationMenuRoot, {
  Root: NavigationMenuRoot,
  RootProvider: NavigationMenuRootProvider,
  Context: NavigationMenuPrimitive.Context,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  ItemIndicator: NavigationMenuItemIndicator,
  Arrow: NavigationMenuArrow,
  ViewportPositioner: NavigationMenuViewportPositioner,
  Viewport: NavigationMenuViewport,
  useNavigationMenu,
});

export { NavigationMenu, useNavigationMenu, useNavigationMenuContext };