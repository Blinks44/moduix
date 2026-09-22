import {
  NavigationMenu as NavigationMenuPrimitive,
  useNavigationMenu,
  useNavigationMenuContext,
} from '@ark-ui/solid/navigation-menu';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './NavigationMenu.module.css';

function NavigationMenu(props: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Root
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="navigation-menu-root-provider"
    />
  );
}

function NavigationMenuList(props: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.List
      class={clsx(styles.list, local.class)}
      {...others}
      data-slot="navigation-menu-list"
    />
  );
}

function NavigationMenuItem(props: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Item
      class={clsx(styles.item, local.class)}
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
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="navigation-menu-trigger"
    />
  );
}

function NavigationMenuContent(props: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="navigation-menu-content"
    />
  );
}

function NavigationMenuLink(props: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <NavigationMenuPrimitive.Link
      asChild={local.asChild}
      class={clsx(styles.link, local.class)}
      {...others}
      data-slot="navigation-menu-link"
    />
  );
}

function NavigationMenuIndicator(props: ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
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
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="navigation-menu-item-indicator"
    />
  );
}

function NavigationMenuArrow(props: ComponentProps<typeof NavigationMenuPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Arrow
      class={clsx(styles.arrow, local.class)}
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
      class={clsx(styles.viewportPositioner, local.class)}
      {...others}
      data-slot="navigation-menu-viewport-positioner"
    />
  );
}

function NavigationMenuViewport(props: ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NavigationMenuPrimitive.Viewport
      class={clsx(styles.viewport, local.class)}
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
