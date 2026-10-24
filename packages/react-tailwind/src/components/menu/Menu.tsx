'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  Menu as MenuPrimitive,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '@ark-ui/react/menu';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { menuContentVariants, menuPositionerVariants } from './Menu.variants';

type MenuIndicatorPosition = 'start' | 'end' | 'none';
type MenuItemTone = 'default' | 'destructive';
type MenuItemProps = ComponentProps<typeof MenuPrimitive.Item> & { tone?: MenuItemTone };
type MenuCheckboxItemProps = ComponentProps<typeof MenuPrimitive.CheckboxItem> & {
  indicator?: MenuIndicatorPosition;
};
type MenuRadioItemProps = ComponentProps<typeof MenuPrimitive.RadioItem> & {
  indicator?: MenuIndicatorPosition;
};
type MenuRootProps = ComponentProps<typeof MenuPrimitive.Root> & OverlayPortalProps;
type MenuRootProviderProps = ComponentProps<typeof MenuPrimitive.RootProvider> & OverlayPortalProps;

const menuItemStyles = cva(
  "relative z-0 min-h-control-sm cursor-default rounded-sm text-sm text-inherit no-underline outline-0 select-none before:absolute before:inset-x-1 before:inset-y-0 before:-z-1 before:rounded-sm before:content-[''] data-disabled:pointer-events-none data-disabled:text-muted-foreground data-highlighted:text-accent-foreground data-highlighted:before:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:before:bg-accent",
  {
    variants: {
      layout: {
        item: 'flex items-center gap-2 px-3 py-1',
        triggerItem: 'flex items-center justify-between gap-3 px-3 py-1',
        indicatorItem: 'grid items-center gap-2 py-1 ps-2.5 pe-3',
      },
      tone: {
        default: '',
        destructive:
          'text-destructive data-highlighted:text-destructive data-highlighted:before:bg-[color-mix(in_oklab,var(--color-destructive)_12%,transparent)]',
      },
      indicator: {
        start:
          "grid-cols-[0.75rem_minmax(0,1fr)] [&>[data-slot='menu-item-indicator']]:col-start-1 [&>[data-slot='menu-item-text']]:col-start-2",
        end: "grid-cols-[minmax(0,1fr)_0.75rem] [&>[data-slot='menu-item-indicator']]:col-start-2 [&>[data-slot='menu-item-indicator']]:justify-self-end [&>[data-slot='menu-item-text']]:col-start-1",
        none: "grid-cols-[minmax(0,1fr)] ps-3 [&>[data-slot='menu-item-indicator']]:hidden [&>[data-slot='menu-item-text']]:col-start-1",
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

function Menu({
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
>(function MenuTrigger(props, ref) {
  return <MenuPrimitive.Trigger ref={ref} {...props} data-slot="menu-trigger" />;
});

const MenuIndicator = forwardRef<
  ComponentRef<typeof MenuPrimitive.Indicator>,
  ComponentProps<typeof MenuPrimitive.Indicator>
>(function MenuIndicator({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
        className,
      )}
      {...props}
      data-slot="menu-indicator"
    >
      {children ?? <ChevronDownIcon />}
    </MenuPrimitive.Indicator>
  );
});

const MenuContextTrigger = forwardRef<
  ComponentRef<typeof MenuPrimitive.ContextTrigger>,
  ComponentProps<typeof MenuPrimitive.ContextTrigger>
>(function MenuContextTrigger(props, ref) {
  return <MenuPrimitive.ContextTrigger ref={ref} {...props} data-slot="menu-context-trigger" />;
});

const MenuPositioner = forwardRef<
  ComponentRef<typeof MenuPrimitive.Positioner>,
  ComponentProps<typeof MenuPrimitive.Positioner>
>(function MenuPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <MenuPrimitive.Positioner
        ref={ref}
        className={cn(menuPositionerVariants(), className)}
        {...props}
        data-slot="menu-positioner"
      />
    </OverlayPortal>
  );
});

const MenuContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  ComponentProps<typeof MenuPrimitive.Content>
>(function MenuContent({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Content
      ref={ref}
      className={cn(menuContentVariants(), className)}
      {...props}
      data-slot="menu-content"
    />
  );
});

const MenuViewport = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function MenuViewport({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn(
          'flex max-h-[min(24rem,var(--available-height,100dvh))] flex-col overflow-auto',
          className,
        )}
        {...props}
        data-scope="menu"
        data-part="viewport"
        data-slot="menu-viewport"
      />
    );
  },
);

const MenuArrow = forwardRef<
  ComponentRef<typeof MenuPrimitive.Arrow>,
  ComponentProps<typeof MenuPrimitive.Arrow>
>(function MenuArrow({ children, ...props }, ref) {
  return (
    <MenuPrimitive.Arrow ref={ref} {...props} data-slot="menu-arrow">
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
      className={cn(
        '[border-block-start:1px_solid_var(--color-border)] [border-inline-start:1px_solid_var(--color-border)]',
        className,
      )}
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
        className={cn(menuItemStyles({ layout: 'item', tone }), className)}
        {...props}
        data-tone={tone}
        data-slot="menu-item"
      />
    );
  },
);

const MenuTriggerItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.TriggerItem>,
  ComponentProps<typeof MenuPrimitive.TriggerItem>
>(function MenuTriggerItem({ className, ...props }, ref) {
  return (
    <MenuPrimitive.TriggerItem
      ref={ref}
      className={cn(menuItemStyles({ layout: 'triggerItem' }), className)}
      {...props}
      data-slot="menu-trigger-item"
    />
  );
});

const MenuTriggerItemIcon = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  function MenuTriggerItemIcon({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex size-3.5 shrink-0 rtl:-scale-x-100 [&_svg]:size-full',
          className,
        )}
        {...props}
        data-slot="menu-trigger-item-icon"
      >
        {children ?? <ChevronRightIcon />}
      </span>
    );
  },
);

const MenuSeparator = forwardRef<
  ComponentRef<typeof MenuPrimitive.Separator>,
  ComponentProps<typeof MenuPrimitive.Separator>
>(function MenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn('mx-3 my-1.5 h-px border-0 bg-border', className)}
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
      className={cn('grid', className)}
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
      className={cn(
        'cursor-default px-2.5 py-1 text-xs font-normal text-muted-foreground select-none',
        className,
      )}
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
      className={cn('grid', className)}
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
        className={cn(menuItemStyles({ layout: 'indicatorItem', indicator }), className)}
        {...props}
        data-indicator-position={indicator}
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
      className={cn(menuItemStyles({ layout: 'indicatorItem', indicator }), className)}
      {...props}
      data-indicator-position={indicator}
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
      className={cn('inline-flex size-3 items-center justify-center [&_svg]:size-full', className)}
      {...props}
      data-slot="menu-item-indicator"
    >
      {children ?? <CheckIcon />}
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
      className={cn('min-w-0 overflow-hidden', className)}
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
        className={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', className)}
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
        className={cn(
          'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
          className,
        )}
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
        className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
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
        className={cn('ms-auto ps-4 text-xs whitespace-nowrap text-muted-foreground', className)}
        {...props}
        data-slot="menu-item-shortcut"
      />
    );
  },
);

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
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuViewport,
  useMenu,
  useMenuContext,
  useMenuItemContext,
};

export type {
  MenuArrowProps,
  MenuArrowTipProps,
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
  MenuItemTextProps,
  MenuOpenChangeDetails,
  MenuPointerDownOutsideEvent,
  MenuPositionerProps,
  MenuRadioItemGroupProps,
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

export type {
  MenuCheckboxItemProps,
  MenuIndicatorPosition,
  MenuItemProps,
  MenuItemTone,
  MenuRadioItemProps,
  MenuRootProps,
  MenuRootProviderProps,
};