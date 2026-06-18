import type { ComponentProps, ComponentRef } from 'react';
import {
  Menu as MenuPrimitive,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '@ark-ui/react/menu';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Menu.module.css';

export type MenuIndicatorPosition = 'start' | 'end' | 'none';
export type MenuItemTone = 'default' | 'destructive';
export type MenuItemProps = ComponentProps<typeof MenuPrimitive.Item> & {
  tone?: MenuItemTone;
};
export type MenuCheckboxItemProps = ComponentProps<typeof MenuPrimitive.CheckboxItem> & {
  indicator?: MenuIndicatorPosition;
};
export type MenuRadioItemProps = ComponentProps<typeof MenuPrimitive.RadioItem> & {
  indicator?: MenuIndicatorPosition;
};

function MenuRoot(props: ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root {...props} />;
}

function MenuRootProvider(props: ComponentProps<typeof MenuPrimitive.RootProvider>) {
  return <MenuPrimitive.RootProvider {...props} />;
}

const MenuTrigger = forwardRef<
  ComponentRef<typeof MenuPrimitive.Trigger>,
  ComponentProps<typeof MenuPrimitive.Trigger>
>(function MenuTrigger({ asChild, className, ...props }, ref) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="menu-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

function MenuTriggerIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span data-slot="menu-trigger-icon" className={clsx(styles.triggerIcon, className)} {...props}>
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
      data-slot="menu-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </MenuPrimitive.Indicator>
  );
});

const MenuContextTrigger = forwardRef<
  ComponentRef<typeof MenuPrimitive.ContextTrigger>,
  ComponentProps<typeof MenuPrimitive.ContextTrigger>
>(function MenuContextTrigger({ className, ...props }, ref) {
  return (
    <MenuPrimitive.ContextTrigger
      ref={ref}
      data-slot="menu-context-trigger"
      className={clsx(styles.contextTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const MenuPositioner = forwardRef<
  ComponentRef<typeof MenuPrimitive.Positioner>,
  ComponentProps<typeof MenuPrimitive.Positioner>
>(function MenuPositioner({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Positioner
      ref={ref}
      data-slot="menu-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const MenuContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  ComponentProps<typeof MenuPrimitive.Content>
>(function MenuContent({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Content
      ref={ref}
      data-slot="menu-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const MenuArrow = forwardRef<
  ComponentRef<typeof MenuPrimitive.Arrow>,
  ComponentProps<typeof MenuPrimitive.Arrow>
>(function MenuArrow({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.Arrow
      ref={ref}
      data-slot="menu-arrow"
      className={clsx(styles.arrow, normalizeClassName(className))}
      {...props}
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
      data-slot="menu-arrow-tip"
      className={clsx(styles.arrowTip, normalizeClassName(className))}
      {...props}
    />
  );
});

const MenuItem = forwardRef<ComponentRef<typeof MenuPrimitive.Item>, MenuItemProps>(
  function MenuItem({ className, tone = 'default', ...props }, ref) {
    return (
      <MenuPrimitive.Item
        ref={ref}
        data-slot="menu-item"
        data-tone={tone}
        className={clsx(styles.item, normalizeClassName(className))}
        {...props}
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
      data-slot="menu-trigger-item"
      className={clsx(styles.triggerItem, normalizeClassName(className))}
      {...props}
    >
      {children}
    </MenuPrimitive.TriggerItem>
  );
});

function MenuTriggerItemIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-trigger-item-icon"
      className={clsx(styles.triggerItemIcon, className)}
      {...props}
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
      data-slot="menu-separator"
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
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
      data-slot="menu-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="menu-item-group-label"
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
      {...props}
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
      data-slot="menu-radio-item-group"
      className={clsx(styles.radioItemGroup, normalizeClassName(className))}
      {...props}
    />
  );
});

const MenuRadioItem = forwardRef<ComponentRef<typeof MenuPrimitive.RadioItem>, MenuRadioItemProps>(
  function MenuRadioItem({ className, indicator, ...props }, ref) {
    return (
      <MenuPrimitive.RadioItem
        ref={ref}
        data-slot="menu-radio-item"
        data-indicator-position={indicator}
        className={clsx(styles.radioItem, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const MenuCheckboxItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.CheckboxItem>,
  MenuCheckboxItemProps
>(function MenuCheckboxItem({ className, indicator, ...props }, ref) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="menu-checkbox-item"
      data-indicator-position={indicator}
      className={clsx(styles.checkboxItem, normalizeClassName(className))}
      {...props}
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
      data-slot="menu-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
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
      data-slot="menu-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

function MenuItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function MenuItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function MenuItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function MenuItemShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-shortcut"
      className={clsx(styles.itemShortcut, className)}
      {...props}
    />
  );
}

const MenuContext = MenuPrimitive.Context;
const MenuItemContext = MenuPrimitive.ItemContext;

const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  RootProvider: MenuRootProvider,
  Trigger: MenuTrigger,
  TriggerIcon: MenuTriggerIcon,
  Indicator: MenuIndicator,
  ContextTrigger: MenuContextTrigger,
  Positioner: MenuPositioner,
  Content: MenuContent,
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
  Context: MenuContext,
  ItemContext: MenuItemContext,
});

export {
  Menu,
  MenuRoot,
  MenuRootProvider,
  MenuTrigger,
  MenuTriggerIcon,
  MenuIndicator,
  MenuContextTrigger,
  MenuPositioner,
  MenuContent,
  MenuArrow,
  MenuArrowTip,
  MenuItem,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuRadioItemGroup,
  MenuRadioItem,
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuItemShortcut,
  useMenu,
  useMenuContext,
  useMenuItemContext,
};

export type {
  MenuArrowProps,
  MenuArrowTipProps,
  MenuCheckboxItemProps as ArkMenuCheckboxItemProps,
  MenuContentProps,
  MenuContextProps,
  MenuContextTriggerProps,
  MenuFocusOutsideEvent,
  MenuHighlightChangeDetails,
  MenuIndicatorProps,
  MenuInteractOutsideEvent,
  MenuItemContextProps,
  MenuItemGroupLabelProps,
  MenuItemGroupProps,
  MenuItemIndicatorProps,
  MenuItemProps as ArkMenuItemProps,
  MenuItemTextProps,
  MenuOpenChangeDetails,
  MenuPointerDownOutsideEvent,
  MenuPositionerProps,
  MenuRadioItemGroupProps,
  MenuRadioItemProps as ArkMenuRadioItemProps,
  MenuRootProps,
  MenuRootProviderProps,
  MenuSelectionDetails,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
  MenuTriggerValueChangeDetails,
  MenuValueChangeDetails,
  UseMenuContext,
  UseMenuItemContext,
  UseMenuProps,
  UseMenuReturn,
} from '@ark-ui/react/menu';