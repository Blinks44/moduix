import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  Menu as MenuPrimitive,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '@ark-ui/solid/menu';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
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

const menuPositionerVariants = cva(
  'z-[var(--z-index)] w-[var(--positioner-width,auto)] max-w-[var(--available-width)] outline-0',
);

const menuContentVariants = cva(
  'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-w-[min(20rem,var(--available-width,100vw))] min-w-[min(max(var(--reference-width,0px),12rem),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col overflow-visible rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border [--arrow-background:var(--color-popover)] [--arrow-size:0.625rem] data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
);

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
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <MenuPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-1 text-sm font-medium text-foreground outline-0 transition-colors duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50 data-[current]:data-[state=open]:bg-muted motion-reduce:transition-none [@media(hover:hover)]:hover:bg-muted',
        local.class,
      )}
      {...others}
      data-slot="menu-trigger"
    />
  );
}

function MenuTriggerIcon(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);
  return (
    <span
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
        local.class,
      )}
      {...others}
      data-slot="menu-trigger-icon"
    >
      {resolvedChildren() ?? <ChevronDownIcon />}
    </span>
  );
}

function MenuIndicator(props: ComponentProps<typeof MenuPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);
  return (
    <MenuPrimitive.Indicator
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
        local.class,
      )}
      {...others}
      data-slot="menu-indicator"
    >
      {resolvedChildren() ?? <ChevronDownIcon />}
    </MenuPrimitive.Indicator>
  );
}

function MenuContextTrigger(props: ComponentProps<typeof MenuPrimitive.ContextTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <MenuPrimitive.ContextTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-1 text-sm font-medium text-foreground outline-0 transition-colors duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50 data-[current]:data-[state=open]:bg-muted motion-reduce:transition-none [@media(hover:hover)]:hover:bg-muted',
        local.class,
      )}
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
        class={cn(menuPositionerVariants(), local.class)}
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
      class={cn(menuContentVariants(), local.class)}
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
      class={cn(
        'flex max-h-[min(24rem,var(--available-height,100dvh))] flex-col overflow-auto',
        local.class,
      )}
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
    <MenuPrimitive.Arrow
      class={cn('[--arrow-background:var(--color-popover)]', local.class)}
      {...others}
      data-slot="menu-arrow"
    >
      {resolvedChildren() ?? <MenuArrowTip />}
    </MenuPrimitive.Arrow>
  );
}

function MenuArrowTip(props: ComponentProps<typeof MenuPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.ArrowTip
      class={cn(
        '[border-block-start:1px_solid_var(--color-border)] [border-inline-start:1px_solid_var(--color-border)]',
        local.class,
      )}
      {...others}
      data-slot="menu-arrow-tip"
    />
  );
}

function MenuItem(props: MenuItemProps) {
  const [local, others] = splitProps(props, ['class', 'tone']);
  return (
    <MenuPrimitive.Item
      class={cn(menuItemStyles({ layout: 'item', tone: local.tone }), local.class)}
      {...others}
      data-tone={local.tone ?? 'default'}
      data-slot="menu-item"
    />
  );
}

function MenuTriggerItem(props: ComponentProps<typeof MenuPrimitive.TriggerItem>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.TriggerItem
      class={cn(menuItemStyles({ layout: 'triggerItem' }), local.class)}
      {...others}
      data-slot="menu-trigger-item"
    />
  );
}

function MenuTriggerItemIcon(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);
  return (
    <span
      class={cn('inline-flex size-3.5 shrink-0 rtl:-scale-x-100 [&_svg]:size-full', local.class)}
      {...others}
      data-slot="menu-trigger-item-icon"
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </span>
  );
}

function MenuSeparator(props: ComponentProps<typeof MenuPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.Separator
      class={cn('mx-3 my-1.5 h-px border-0 bg-border', local.class)}
      {...others}
      data-slot="menu-separator"
    />
  );
}

function MenuItemGroup(props: ComponentProps<typeof MenuPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.ItemGroup
      class={cn('grid', local.class)}
      {...others}
      data-slot="menu-item-group"
    />
  );
}

function MenuItemGroupLabel(props: ComponentProps<typeof MenuPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.ItemGroupLabel
      class={cn(
        'cursor-default px-2.5 py-1 text-xs font-normal text-muted-foreground select-none',
        local.class,
      )}
      {...others}
      data-slot="menu-item-group-label"
    />
  );
}

function MenuRadioItemGroup(props: ComponentProps<typeof MenuPrimitive.RadioItemGroup>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.RadioItemGroup
      class={cn('grid', local.class)}
      {...others}
      data-slot="menu-radio-item-group"
    />
  );
}

function MenuRadioItem(props: MenuRadioItemProps) {
  const [local, others] = splitProps(props, ['class', 'indicator']);
  return (
    <MenuPrimitive.RadioItem
      class={cn(
        menuItemStyles({ layout: 'indicatorItem', indicator: local.indicator ?? 'start' }),
        local.class,
      )}
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
      class={cn(
        menuItemStyles({ layout: 'indicatorItem', indicator: local.indicator ?? 'start' }),
        local.class,
      )}
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
      class={cn(
        'inline-flex size-3 items-center justify-center rounded-xs [&_svg]:size-full',
        local.class,
      )}
      {...others}
      data-slot="menu-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </MenuPrimitive.ItemIndicator>
  );
}

function MenuItemText(props: ComponentProps<typeof MenuPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <MenuPrimitive.ItemText
      class={cn('min-w-0 overflow-hidden', local.class)}
      {...others}
      data-slot="menu-item-text"
    />
  );
}

function MenuItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.span
      class={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', local.class)}
      {...others}
      data-slot="menu-item-text-content"
    />
  );
}
function MenuItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.span
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full',
        local.class,
      )}
      {...others}
      data-slot="menu-item-text-icon"
    />
  );
}
function MenuItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.span
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
      data-slot="menu-item-text-label"
    />
  );
}
function MenuItemShortcut(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.span
      class={cn('ms-auto ps-4 text-xs whitespace-nowrap text-muted-foreground', local.class)}
      {...others}
      data-slot="menu-item-shortcut"
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

export {
  Menu,
  menuContentVariants,
  menuPositionerVariants,
  useMenu,
  useMenuContext,
  useMenuItemContext,
};