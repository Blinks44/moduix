'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  Menu as MenuPrimitive,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '@ark-ui/react/menu';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
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

function MenuRoot({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: MenuRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <MenuPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

function MenuRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: MenuRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <MenuPrimitive.RootProvider lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

const MenuTrigger = forwardRef<
  ComponentRef<typeof MenuPrimitive.Trigger>,
  ComponentProps<typeof MenuPrimitive.Trigger>
>(function MenuTrigger({ asChild, className, ...props }, ref) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="menu-trigger"
    />
  );
});

function MenuTriggerIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span className={clsx(styles.triggerIcon, className)} {...props} data-slot="menu-trigger-icon">
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </span>
  );
}

const MenuIndicator = forwardRef<
  ComponentRef<typeof MenuPrimitive.Indicator>,
  ComponentProps<typeof MenuPrimitive.Indicator>
>(function MenuIndicator({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.Indicator
      ref={ref}
      className={clsx(styles.indicator, className)}
      {...props}
      data-slot="menu-indicator"
    >
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </MenuPrimitive.Indicator>
  );
});

const MenuContextTrigger = forwardRef<
  ComponentRef<typeof MenuPrimitive.ContextTrigger>,
  ComponentProps<typeof MenuPrimitive.ContextTrigger>
>(function MenuContextTrigger({ asChild, className, ...props }, ref) {
  return (
    <MenuPrimitive.ContextTrigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.contextTrigger, className)}
      {...props}
      data-slot="menu-context-trigger"
    />
  );
});

const MenuPositioner = forwardRef<
  ComponentRef<typeof MenuPrimitive.Positioner>,
  ComponentProps<typeof MenuPrimitive.Positioner>
>(function MenuPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <MenuPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="menu-positioner"
      />
    </OverlayPortal>
  );
});

const MenuContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  ComponentProps<typeof MenuPrimitive.Content>
>(function MenuContent({ asChild, className, children, ...props }, ref) {
  return (
    <MenuPrimitive.Content
      ref={ref}
      asChild={asChild}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="menu-content"
    >
      {children}
    </MenuPrimitive.Content>
  );
});

const MenuViewport = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function MenuViewport({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="menu"
        data-part="viewport"
        className={clsx(styles.viewport, className)}
        {...props}
        data-slot="menu-viewport"
      />
    );
  },
);

const MenuArrow = forwardRef<
  ComponentRef<typeof MenuPrimitive.Arrow>,
  ComponentProps<typeof MenuPrimitive.Arrow>
>(function MenuArrow({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.Arrow
      ref={ref}
      className={clsx(styles.arrow, className)}
      {...props}
      data-slot="menu-arrow"
    >
      {children ?? <MenuArrowTip />}
    </MenuPrimitive.Arrow>
  );
});

const MenuArrowTip = forwardRef<
  ComponentRef<typeof MenuPrimitive.ArrowTip>,
  ComponentProps<typeof MenuPrimitive.ArrowTip>
>(function MenuArrowTip({ className, ...props }, ref) {
  return (
    <MenuPrimitive.ArrowTip
      ref={ref}
      className={clsx(styles.arrowTip, className)}
      {...props}
      data-slot="menu-arrow-tip"
    />
  );
});

const MenuItem = forwardRef<ComponentRef<typeof MenuPrimitive.Item>, MenuItemProps>(
  function MenuItem({ className, tone = 'default', ...props }, ref) {
    return (
      <MenuPrimitive.Item
        ref={ref}
        data-tone={tone}
        className={clsx(styles.item, className)}
        {...props}
        data-slot="menu-item"
      />
    );
  },
);

const MenuTriggerItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.TriggerItem>,
  ComponentProps<typeof MenuPrimitive.TriggerItem>
>(function MenuTriggerItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.TriggerItem
      ref={ref}
      className={clsx(styles.triggerItem, className)}
      {...props}
      data-slot="menu-trigger-item"
    >
      {children}
    </MenuPrimitive.TriggerItem>
  );
});

function MenuTriggerItemIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={clsx(styles.triggerItemIcon, className)}
      {...props}
      data-slot="menu-trigger-item-icon"
    >
      {children ?? <ChevronRightIcon className={styles.iconSvg} />}
    </span>
  );
}

const MenuSeparator = forwardRef<
  ComponentRef<typeof MenuPrimitive.Separator>,
  ComponentProps<typeof MenuPrimitive.Separator>
>(function MenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={clsx(styles.separator, className)}
      {...props}
      data-slot="menu-separator"
    />
  );
});

const MenuItemGroup = forwardRef<
  ComponentRef<typeof MenuPrimitive.ItemGroup>,
  ComponentProps<typeof MenuPrimitive.ItemGroup>
>(function MenuItemGroup({ className, ...props }, ref) {
  return (
    <MenuPrimitive.ItemGroup
      ref={ref}
      className={clsx(styles.itemGroup, className)}
      {...props}
      data-slot="menu-item-group"
    />
  );
});

const MenuItemGroupLabel = forwardRef<
  ComponentRef<typeof MenuPrimitive.ItemGroupLabel>,
  ComponentProps<typeof MenuPrimitive.ItemGroupLabel>
>(function MenuItemGroupLabel({ className, ...props }, ref) {
  return (
    <MenuPrimitive.ItemGroupLabel
      ref={ref}
      className={clsx(styles.itemGroupLabel, className)}
      {...props}
      data-slot="menu-item-group-label"
    />
  );
});

const MenuRadioItemGroup = forwardRef<
  ComponentRef<typeof MenuPrimitive.RadioItemGroup>,
  ComponentProps<typeof MenuPrimitive.RadioItemGroup>
>(function MenuRadioItemGroup({ className, ...props }, ref) {
  return (
    <MenuPrimitive.RadioItemGroup
      ref={ref}
      className={clsx(styles.radioItemGroup, className)}
      {...props}
      data-slot="menu-radio-item-group"
    />
  );
});

const MenuRadioItem = forwardRef<ComponentRef<typeof MenuPrimitive.RadioItem>, MenuRadioItemProps>(
  function MenuRadioItem({ className, indicator = 'start', ...props }, ref) {
    return (
      <MenuPrimitive.RadioItem
        ref={ref}
        data-indicator-position={indicator}
        className={clsx(styles.radioItem, className)}
        {...props}
        data-slot="menu-radio-item"
      />
    );
  },
);

const MenuCheckboxItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.CheckboxItem>,
  MenuCheckboxItemProps
>(function MenuCheckboxItem({ className, indicator = 'start', ...props }, ref) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-indicator-position={indicator}
      className={clsx(styles.checkboxItem, className)}
      {...props}
      data-slot="menu-checkbox-item"
    />
  );
});

const MenuItemIndicator = forwardRef<
  ComponentRef<typeof MenuPrimitive.ItemIndicator>,
  ComponentProps<typeof MenuPrimitive.ItemIndicator>
>(function MenuItemIndicator({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.ItemIndicator
      ref={ref}
      className={clsx(styles.itemIndicator, className)}
      {...props}
      data-slot="menu-item-indicator"
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </MenuPrimitive.ItemIndicator>
  );
});

const MenuItemText = forwardRef<
  ComponentRef<typeof MenuPrimitive.ItemText>,
  ComponentProps<typeof MenuPrimitive.ItemText>
>(function MenuItemText({ className, ...props }, ref) {
  return (
    <MenuPrimitive.ItemText
      ref={ref}
      className={clsx(styles.itemText, className)}
      {...props}
      data-slot="menu-item-text"
    />
  );
});

const MenuItemTextContent = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemTextContent({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemTextContent, className)}
        {...props}
        data-slot="menu-item-text-content"
      />
    );
  },
);

const MenuItemTextIcon = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemTextIcon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemTextIcon, className)}
        {...props}
        data-slot="menu-item-text-icon"
      />
    );
  },
);

const MenuItemTextLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemTextLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemTextLabel, className)}
        {...props}
        data-slot="menu-item-text-label"
      />
    );
  },
);

const MenuItemShortcut = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemShortcut({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemShortcut, className)}
        {...props}
        data-slot="menu-item-shortcut"
      />
    );
  },
);

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