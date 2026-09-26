import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  Menu as MenuPrimitive,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '@ark-ui/solid/menu';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './Menu.module.css';

type MenuIndicatorPosition = 'start' | 'end' | 'none';
type MenuItemTone = 'default' | 'destructive';
type MenuItemProps = ComponentProps<typeof MenuPrimitive.Item> & {
  tone?: MenuItemTone;
};
type MenuCheckboxItemProps = ComponentProps<typeof MenuPrimitive.CheckboxItem> & {
  indicator?: MenuIndicatorPosition;
};
type MenuRadioItemProps = ComponentProps<typeof MenuPrimitive.RadioItem> & {
  indicator?: MenuIndicatorPosition;
};
type MenuRootProps = ComponentProps<typeof MenuPrimitive.Root> & OverlayPortalProps;
type MenuRootProviderProps = ComponentProps<typeof MenuPrimitive.RootProvider> & OverlayPortalProps;

function Menu(props: MenuRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <MenuPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </MenuPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function MenuRootProvider(props: MenuRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <MenuPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </MenuPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function MenuTrigger(props: ComponentProps<typeof MenuPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <MenuPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="menu-trigger"
    />
  );
}

function MenuTriggerIcon(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <span class={clsx(styles.triggerIcon, local.class)} {...others} data-slot="menu-trigger-icon">
      {resolvedChildren() ?? <ChevronDownIcon class={styles.iconSvg} />}
    </span>
  );
}

function MenuIndicator(props: ComponentProps<typeof MenuPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <MenuPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="menu-indicator"
    >
      {resolvedChildren() ?? <ChevronDownIcon class={styles.iconSvg} />}
    </MenuPrimitive.Indicator>
  );
}

function MenuContextTrigger(props: ComponentProps<typeof MenuPrimitive.ContextTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <MenuPrimitive.ContextTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.contextTrigger, local.class)}
      {...others}
      data-slot="menu-context-trigger"
    />
  );
}

function MenuPositioner(props: ComponentProps<typeof MenuPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <MenuPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="menu-positioner"
      />
    </OverlayPortal>
  );
}

function MenuContent(props: ComponentProps<typeof MenuPrimitive.Content>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <MenuPrimitive.Content
      asChild={local.asChild}
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="menu-content"
    >
      {local.children}
    </MenuPrimitive.Content>
  );
}

function MenuViewport(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.viewport, local.class)}
      {...others}
      data-scope="menu"
      data-part="viewport"
      data-slot="menu-viewport"
    />
  );
}

function MenuArrow(props: ComponentProps<typeof MenuPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <MenuPrimitive.Arrow class={clsx(styles.arrow, local.class)} {...others} data-slot="menu-arrow">
      {resolvedChildren() ?? <MenuArrowTip />}
    </MenuPrimitive.Arrow>
  );
}

function MenuArrowTip(props: ComponentProps<typeof MenuPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ArrowTip
      class={clsx(styles.arrowTip, local.class)}
      {...others}
      data-slot="menu-arrow-tip"
    />
  );
}

function MenuItem(props: MenuItemProps) {
  const [local, others] = splitProps(props, ['class', 'tone']);

  return (
    <MenuPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-tone={local.tone ?? 'default'}
      data-slot="menu-item"
    />
  );
}

function MenuTriggerItem(props: ComponentProps<typeof MenuPrimitive.TriggerItem>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <MenuPrimitive.TriggerItem
      class={clsx(styles.triggerItem, local.class)}
      {...others}
      data-slot="menu-trigger-item"
    >
      {local.children}
    </MenuPrimitive.TriggerItem>
  );
}

function MenuTriggerItemIcon(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      class={clsx(styles.triggerItemIcon, local.class)}
      {...others}
      data-slot="menu-trigger-item-icon"
    >
      {resolvedChildren() ?? <ChevronRightIcon class={styles.iconSvg} />}
    </span>
  );
}

function MenuSeparator(props: ComponentProps<typeof MenuPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.Separator
      class={clsx(styles.separator, local.class)}
      {...others}
      data-slot="menu-separator"
    />
  );
}

function MenuItemGroup(props: ComponentProps<typeof MenuPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
      {...others}
      data-slot="menu-item-group"
    />
  );
}

function MenuItemGroupLabel(props: ComponentProps<typeof MenuPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ItemGroupLabel
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
      data-slot="menu-item-group-label"
    />
  );
}

function MenuRadioItemGroup(props: ComponentProps<typeof MenuPrimitive.RadioItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.RadioItemGroup
      class={clsx(styles.radioItemGroup, local.class)}
      {...others}
      data-slot="menu-radio-item-group"
    />
  );
}

function MenuRadioItem(props: MenuRadioItemProps) {
  const [local, others] = splitProps(props, ['class', 'indicator']);

  return (
    <MenuPrimitive.RadioItem
      class={clsx(styles.radioItem, local.class)}
      {...others}
      data-indicator-position={local.indicator ?? 'start'}
      data-slot="menu-radio-item"
    />
  );
}

function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const [local, others] = splitProps(props, ['class', 'indicator']);

  return (
    <MenuPrimitive.CheckboxItem
      class={clsx(styles.checkboxItem, local.class)}
      {...others}
      data-indicator-position={local.indicator ?? 'start'}
      data-slot="menu-checkbox-item"
    />
  );
}

function MenuItemIndicator(props: ComponentProps<typeof MenuPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <MenuPrimitive.ItemIndicator
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="menu-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon class={styles.itemIndicatorIcon} />}
    </MenuPrimitive.ItemIndicator>
  );
}

function MenuItemText(props: ComponentProps<typeof MenuPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
      {...others}
      data-slot="menu-item-text"
    />
  );
}

function MenuItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextContent, local.class)}
      {...others}
      data-slot="menu-item-text-content"
    />
  );
}

function MenuItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextIcon, local.class)}
      {...others}
      data-slot="menu-item-text-icon"
    />
  );
}

function MenuItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextLabel, local.class)}
      {...others}
      data-slot="menu-item-text-label"
    />
  );
}

function MenuItemShortcut(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemShortcut, local.class)}
      {...others}
      data-slot="menu-item-shortcut"
    />
  );
}

const MenuContext = MenuPrimitive.Context;
const MenuItemContext = MenuPrimitive.ItemContext;

export {
  Menu,
  MenuArrow,
  MenuArrowTip,
  MenuCheckboxItem,
  MenuContext,
  MenuContextTrigger,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemContext,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemShortcut,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRootProvider,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerIcon,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuViewport,
  useMenu,
  useMenuContext,
  useMenuItemContext,
};