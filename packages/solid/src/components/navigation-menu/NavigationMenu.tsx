import {
  NavigationMenu as NavigationMenuPrimitive,
  useNavigationMenu,
  useNavigationMenuContext,
} from '@ark-ui/solid/navigation-menu';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './NavigationMenu.module.css';

function NavigationMenuRoot(props: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function NavigationMenuRootProvider(
  props: ComponentProps<typeof NavigationMenuPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.RootProvider
      data-slot="navigation-menu-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function NavigationMenuList(props: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      class={clsx(styles.list, local.class)}
      {...others}
    />
  );
}

function NavigationMenuItem(props: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function NavigationMenuTrigger(props: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
    />
  );
}

function NavigationMenuContent(props: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function NavigationMenuLink(props: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      asChild={local.asChild}
      class={clsx(styles.link, local.class)}
      {...others}
    />
  );
}

function NavigationMenuIndicator(props: ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      class={clsx(styles.indicator, local.class)}
      {...others}
    />
  );
}

function NavigationMenuItemIndicator(
  props: ComponentProps<typeof NavigationMenuPrimitive.ItemIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.ItemIndicator
      data-slot="navigation-menu-item-indicator"
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
    />
  );
}

function NavigationMenuArrow(props: ComponentProps<typeof NavigationMenuPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Arrow
      data-slot="navigation-menu-arrow"
      class={clsx(styles.arrow, local.class)}
      {...others}
    />
  );
}

function NavigationMenuViewportPositioner(
  props: ComponentProps<typeof NavigationMenuPrimitive.ViewportPositioner>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.ViewportPositioner
      data-slot="navigation-menu-viewport-positioner"
      class={clsx(styles.viewportPositioner, local.class)}
      {...others}
    />
  );
}

function NavigationMenuViewport(props: ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      class={clsx(styles.viewport, local.class)}
      {...others}
    />
  );
}

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
});

export { useNavigationMenu, useNavigationMenuContext };
export { NavigationMenu };