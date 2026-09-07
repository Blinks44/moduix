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
import { Children, forwardRef, isValidElement } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

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
  "relative z-0 min-h-control-sm cursor-default rounded-sm bg-transparent text-sm text-inherit no-underline outline-0 select-none before:absolute before:inset-x-1 before:inset-y-0 before:-z-1 before:rounded-sm before:bg-transparent before:content-[''] data-disabled:pointer-events-none data-disabled:text-muted-foreground data-highlighted:text-accent-foreground data-highlighted:before:bg-accent data-[state=open]:before:bg-accent",
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
      data-slot="menu-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-1 text-sm font-medium text-foreground outline-0 transition-colors duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50 data-[current]:data-[state=open]:bg-muted motion-reduce:transition-none [@media(hover:hover)]:hover:bg-muted',
        className,
      )}
      {...props}
    />
  );
});

function MenuTriggerIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-trigger-icon"
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronDownIcon />}
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
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronDownIcon />}
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
      data-slot="menu-context-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-1 text-sm font-medium text-foreground outline-0 transition-colors duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50 data-[current]:data-[state=open]:bg-muted motion-reduce:transition-none [@media(hover:hover)]:hover:bg-muted',
        className,
      )}
      {...props}
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
        data-slot="menu-positioner"
        className={cn(
          'z-[var(--z-index)] w-[var(--positioner-width,auto)] max-w-[var(--available-width)] outline-0',
          className,
        )}
        {...props}
      />
    </OverlayPortal>
  );
});

const MenuContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  ComponentProps<typeof MenuPrimitive.Content>
>(function MenuContent({ asChild, className, children, ...props }, ref) {
  const childrenArray = asChild ? [] : Children.toArray(children);
  const arrows = childrenArray.filter((child) => isValidElement(child) && child.type === MenuArrow);
  const content = childrenArray.filter(
    (child) => !isValidElement(child) || child.type !== MenuArrow,
  );

  return (
    <MenuPrimitive.Content
      ref={ref}
      data-slot="menu-content"
      asChild={asChild}
      className={cn(
        'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-w-[min(20rem,var(--available-width,100vw))] min-w-[min(max(var(--reference-width,0px),12rem),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col overflow-visible rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border [--arrow-background:var(--color-popover)] [--arrow-size:0.625rem] data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {arrows}
          <div className="flex max-h-[min(24rem,var(--available-height,100dvh))] flex-col overflow-auto">
            {content}
          </div>
        </>
      )}
    </MenuPrimitive.Content>
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
      className={cn('[--arrow-background:var(--color-popover)]', className)}
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
      className={cn(
        '[border-block-start:1px_solid_var(--color-border)] [border-inline-start:1px_solid_var(--color-border)]',
        className,
      )}
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
        className={cn(menuItemStyles({ layout: 'item', tone }), className)}
        {...props}
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
      data-slot="menu-trigger-item"
      className={cn(menuItemStyles({ layout: 'triggerItem' }), className)}
      {...props}
    />
  );
});

function MenuTriggerItemIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-trigger-item-icon"
      className={cn('inline-flex size-3.5 shrink-0 rtl:-scale-x-100 [&_svg]:size-full', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
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
      className={cn('mx-3 my-1.5 h-px border-0 bg-border', className)}
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
      className={cn('grid', className)}
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
      className={cn(
        'cursor-default px-2.5 py-1 text-xs font-normal text-muted-foreground select-none',
        className,
      )}
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
      className={cn('grid', className)}
      {...props}
    />
  );
});

const MenuRadioItem = forwardRef<ComponentRef<typeof MenuPrimitive.RadioItem>, MenuRadioItemProps>(
  function MenuRadioItem({ className, indicator = 'start', ...props }, ref) {
    return (
      <MenuPrimitive.RadioItem
        ref={ref}
        data-slot="menu-radio-item"
        data-indicator-position={indicator}
        className={cn(menuItemStyles({ layout: 'indicatorItem', indicator }), className)}
        {...props}
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
      data-slot="menu-checkbox-item"
      data-indicator-position={indicator}
      className={cn(menuItemStyles({ layout: 'indicatorItem', indicator }), className)}
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
      className={cn(
        'inline-flex size-3 items-center justify-center rounded-xs [&_svg]:size-full',
        className,
      )}
      {...props}
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
      data-slot="menu-item-text"
      className={cn('min-w-0 overflow-hidden', className)}
      {...props}
    />
  );
});

const MenuItemTextContent = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemTextContent({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="menu-item-text-content"
        className={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', className)}
        {...props}
      />
    );
  },
);

const MenuItemTextIcon = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemTextIcon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="menu-item-text-icon"
        className={cn(
          'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
          className,
        )}
        {...props}
      />
    );
  },
);

const MenuItemTextLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemTextLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="menu-item-text-label"
        className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
        {...props}
      />
    );
  },
);

const MenuItemShortcut = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function MenuItemShortcut({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="menu-item-shortcut"
        className={cn('ms-auto ps-4 text-xs whitespace-nowrap text-muted-foreground', className)}
        {...props}
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