import { useFocusVisible } from '@ark-ui/solid';
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

function MenuRoot(props: MenuRootProps) {
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
  const focusVisible = useFocusVisible();
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <MenuPrimitive.Trigger
      asChild={local.asChild}
      data-slot="menu-trigger"
      data-focus-visible={focusVisible() ? '' : undefined}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
    />
  );
}

function MenuTriggerIcon(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <span data-slot="menu-trigger-icon" class={clsx(styles.triggerIcon, local.class)} {...others}>
      {resolvedChildren() ?? <ChevronDownIcon class={styles.iconSvg} />}
    </span>
  );
}

function MenuIndicator(props: ComponentProps<typeof MenuPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <MenuPrimitive.Indicator
      data-slot="menu-indicator"
      class={clsx(styles.indicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <ChevronDownIcon class={styles.iconSvg} />}
    </MenuPrimitive.Indicator>
  );
}

function MenuContextTrigger(props: ComponentProps<typeof MenuPrimitive.ContextTrigger>) {
  const focusVisible = useFocusVisible();
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <MenuPrimitive.ContextTrigger
      asChild={local.asChild}
      data-slot="menu-context-trigger"
      data-focus-visible={focusVisible() ? '' : undefined}
      class={clsx(!local.asChild && styles.contextTrigger, local.class)}
      {...others}
    />
  );
}

function MenuPositioner(props: ComponentProps<typeof MenuPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <MenuPrimitive.Positioner
        data-slot="menu-positioner"
        class={clsx(styles.positioner, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function MenuContent(props: ComponentProps<typeof MenuPrimitive.Content>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <MenuPrimitive.Content
      asChild={local.asChild}
      data-slot="menu-content"
      class={clsx(styles.content, local.class)}
      {...others}
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
      data-scope="menu"
      data-part="viewport"
      data-slot="menu-viewport"
      class={clsx(styles.viewport, local.class)}
      {...others}
    />
  );
}

function MenuArrow(props: ComponentProps<typeof MenuPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <MenuPrimitive.Arrow data-slot="menu-arrow" class={clsx(styles.arrow, local.class)} {...others}>
      {resolvedChildren() ?? <MenuArrowTip />}
    </MenuPrimitive.Arrow>
  );
}

function MenuArrowTip(props: ComponentProps<typeof MenuPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ArrowTip
      data-slot="menu-arrow-tip"
      class={clsx(styles.arrowTip, local.class)}
      {...others}
    />
  );
}

function MenuItem(props: MenuItemProps) {
  const [local, others] = splitProps(props, ['class', 'tone']);

  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      data-tone={local.tone ?? 'default'}
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function MenuTriggerItem(props: ComponentProps<typeof MenuPrimitive.TriggerItem>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <MenuPrimitive.TriggerItem
      data-slot="menu-trigger-item"
      class={clsx(styles.triggerItem, local.class)}
      {...others}
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
      data-slot="menu-trigger-item-icon"
      class={clsx(styles.triggerItemIcon, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <ChevronRightIcon class={styles.iconSvg} />}
    </span>
  );
}

function MenuSeparator(props: ComponentProps<typeof MenuPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      class={clsx(styles.separator, local.class)}
      {...others}
    />
  );
}

function MenuItemGroup(props: ComponentProps<typeof MenuPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ItemGroup
      data-slot="menu-item-group"
      class={clsx(styles.itemGroup, local.class)}
      {...others}
    />
  );
}

function MenuItemGroupLabel(props: ComponentProps<typeof MenuPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ItemGroupLabel
      data-slot="menu-item-group-label"
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
    />
  );
}

function MenuRadioItemGroup(props: ComponentProps<typeof MenuPrimitive.RadioItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.RadioItemGroup
      data-slot="menu-radio-item-group"
      class={clsx(styles.radioItemGroup, local.class)}
      {...others}
    />
  );
}

function MenuRadioItem(props: MenuRadioItemProps) {
  const [local, others] = splitProps(props, ['class', 'indicator']);

  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      data-indicator-position={local.indicator ?? 'start'}
      class={clsx(styles.radioItem, local.class)}
      {...others}
    />
  );
}

function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const [local, others] = splitProps(props, ['class', 'indicator']);

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      data-indicator-position={local.indicator ?? 'start'}
      class={clsx(styles.checkboxItem, local.class)}
      {...others}
    />
  );
}

function MenuItemIndicator(props: ComponentProps<typeof MenuPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <MenuPrimitive.ItemIndicator
      data-slot="menu-item-indicator"
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <CheckIcon class={styles.itemIndicatorIcon} />}
    </MenuPrimitive.ItemIndicator>
  );
}

function MenuItemText(props: ComponentProps<typeof MenuPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MenuPrimitive.ItemText
      data-slot="menu-item-text"
      class={clsx(styles.itemText, local.class)}
      {...others}
    />
  );
}

function MenuItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="menu-item-text-content"
      class={clsx(styles.itemTextContent, local.class)}
      {...others}
    />
  );
}

function MenuItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="menu-item-text-icon"
      class={clsx(styles.itemTextIcon, local.class)}
      {...others}
    />
  );
}

function MenuItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="menu-item-text-label"
      class={clsx(styles.itemTextLabel, local.class)}
      {...others}
    />
  );
}

function MenuItemShortcut(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="menu-item-shortcut"
      class={clsx(styles.itemShortcut, local.class)}
      {...others}
    />
  );
}

const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  RootProvider: MenuRootProvider,
  Context: MenuPrimitive.Context,
  Trigger: MenuTrigger,
  TriggerIcon: MenuTriggerIcon,
  Indicator: MenuIndicator,
  ContextTrigger: MenuContextTrigger,
  Positioner: MenuPositioner,
  Content: MenuContent,
  Viewport: MenuViewport,
  Arrow: MenuArrow,
  ArrowTip: MenuArrowTip,
  Item: MenuItem,
  TriggerItem: MenuTriggerItem,
  TriggerItemIcon: MenuTriggerItemIcon,
  Separator: MenuSeparator,
  ItemGroup: MenuItemGroup,
  ItemGroupLabel: MenuItemGroupLabel,
  RadioItemGroup: MenuRadioItemGroup,
  RadioItem: MenuRadioItem,
  CheckboxItem: MenuCheckboxItem,
  ItemIndicator: MenuItemIndicator,
  ItemText: MenuItemText,
  ItemTextContent: MenuItemTextContent,
  ItemTextIcon: MenuItemTextIcon,
  ItemTextLabel: MenuItemTextLabel,
  ItemShortcut: MenuItemShortcut,
  ItemContext: MenuPrimitive.ItemContext,
});

export { Menu, useMenu, useMenuContext, useMenuItemContext };