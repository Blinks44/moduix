'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  Select as SelectPrimitive,
  type CollectionItem,
  type SelectRootComponent as ArkSelectRootComponent,
  type SelectRootProps as ArkSelectRootProps,
  type SelectRootProviderComponent as ArkSelectRootProviderComponent,
  type SelectRootProviderProps as ArkSelectRootProviderProps,
  useSelect,
  useSelectContext,
  useSelectItemContext,
} from '@ark-ui/react/select';
import type { ComponentProps, ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type SelectRootProps<T extends CollectionItem> = ArkSelectRootProps<T> & OverlayPortalProps;
type SelectRootProviderProps<T extends CollectionItem> = ArkSelectRootProviderProps<T> &
  OverlayPortalProps;
type SelectRootComponent = ArkSelectRootComponent<OverlayPortalProps>;
type SelectRootProviderComponent = ArkSelectRootProviderComponent<OverlayPortalProps>;
type SelectFieldProps = Omit<
  ComponentProps<typeof SelectPrimitive.Control>,
  'asChild' | 'children'
> & {
  clearLabel?: string;
  indicator?: ReactNode;
  placeholder?: ComponentProps<typeof SelectPrimitive.ValueText>['placeholder'];
};

const SelectRoot = forwardRef(function SelectRoot<T extends CollectionItem>(
  {
    asChild,
    children,
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  }: SelectRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <SelectPrimitive.Root
        ref={ref}
        data-slot="select-root"
        className={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', className)}
        asChild={asChild}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </OverlayPortalProvider>
  );
}) as SelectRootComponent;

const SelectRootProvider = forwardRef(function SelectRootProvider<T extends CollectionItem>(
  {
    asChild,
    children,
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  }: SelectRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <SelectPrimitive.RootProvider
        ref={ref}
        data-slot="select-root-provider"
        className={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', className)}
        asChild={asChild}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      >
        {children}
      </SelectPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}) as SelectRootProviderComponent;

const SelectLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.Label>,
  ComponentProps<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      data-slot="select-label"
      className={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

const SelectControl = forwardRef<
  ComponentRef<typeof SelectPrimitive.Control>,
  ComponentProps<typeof SelectPrimitive.Control>
>(function SelectControl({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Control
      ref={ref}
      data-slot="select-control"
      className={cn(
        'group/select-control relative flex w-full min-w-0 items-center text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

const SelectTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitive.Trigger>,
  ComponentProps<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ asChild, className, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'peer/select-trigger relative inline-flex h-control-md w-full min-w-0 cursor-pointer items-center justify-start rounded-md border border-border bg-background px-3.5 pe-[2.875rem] text-start text-inherit outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out select-none [font:inherit] group-has-[>[data-slot=select-clear-trigger]:not([hidden])]/select-control:pe-[4.25rem] group-data-invalid/select-control:border-destructive group-data-invalid/select-control:outline-destructive focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
});

const SelectValueText = forwardRef<
  ComponentRef<typeof SelectPrimitive.ValueText>,
  ComponentProps<typeof SelectPrimitive.ValueText>
>(function SelectValueText({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ValueText
      ref={ref}
      data-slot="select-value-text"
      className={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
    />
  );
});

const SelectClearTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitive.ClearTrigger>,
  ComponentProps<typeof SelectPrimitive.ClearTrigger>
>(function SelectClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="select-clear-trigger"
      className={cn(
        'pointer-events-auto absolute inset-y-0 end-[2.125rem] my-auto size-control-xs transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none [&>svg]:size-4',
        className,
      )}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <CloseButton.Root
          aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear selection' : undefined)}
          aria-labelledby={ariaLabelledBy}
        >
          {children}
        </CloseButton.Root>
      )}
    </SelectPrimitive.ClearTrigger>
  );
});

const SelectIndicator = forwardRef<
  ComponentRef<typeof SelectPrimitive.Indicator>,
  ComponentProps<typeof SelectPrimitive.Indicator>
>(function SelectIndicator({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Indicator
      ref={ref}
      data-slot="select-indicator"
      className={cn(
        'pointer-events-none absolute end-2 top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-[:not([disabled]):not([data-disabled]):hover]/select-trigger:bg-muted peer-[:not([disabled]):not([data-disabled]):hover]/select-trigger:text-foreground motion-reduce:transition-none [&>svg]:block [&>svg]:size-4',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronUpDownIcon />}
    </SelectPrimitive.Indicator>
  );
});

const SelectField = forwardRef<ComponentRef<typeof SelectPrimitive.Control>, SelectFieldProps>(
  function SelectField({ clearLabel, indicator, placeholder, ...props }, ref) {
    return (
      <SelectControl ref={ref} {...props}>
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        {clearLabel && <SelectClearTrigger aria-label={clearLabel} />}
        <SelectIndicator>{indicator}</SelectIndicator>
      </SelectControl>
    );
  },
);

const SelectPositioner = forwardRef<
  ComponentRef<typeof SelectPrimitive.Positioner>,
  ComponentProps<typeof SelectPrimitive.Positioner>
>(function SelectPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <SelectPrimitive.Positioner
        ref={ref}
        data-slot="select-positioner"
        className={cn('z-[var(--z-index)] outline-0', className)}
        {...props}
      />
    </OverlayPortal>
  );
});

const SelectContent = forwardRef<
  ComponentRef<typeof SelectPrimitive.Content>,
  ComponentProps<typeof SelectPrimitive.Content>
>(function SelectContent({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        'z-[calc(60+var(--layer-index,0))] flex max-h-[min(24rem,var(--available-height))] max-w-[var(--available-width)] min-w-[var(--reference-width)] origin-[var(--transform-origin)] scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
});

const SelectList = forwardRef<
  ComponentRef<typeof SelectPrimitive.List>,
  ComponentProps<typeof SelectPrimitive.List>
>(function SelectList({ className, ...props }, ref) {
  return (
    <SelectPrimitive.List
      ref={ref}
      data-slot="select-list"
      className={cn(
        'flex min-h-0 scroll-py-1 flex-col overflow-y-auto overscroll-contain outline-0',
        className,
      )}
      {...props}
    />
  );
});

const SelectItemGroup = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemGroup>,
  ComponentProps<typeof SelectPrimitive.ItemGroup>
>(function SelectItemGroup({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ItemGroup
      ref={ref}
      data-slot="select-item-group"
      className={cn('flex flex-col [&+&]:mt-2', className)}
      {...props}
    />
  );
});

const SelectItemGroupLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemGroupLabel>,
  ComponentProps<typeof SelectPrimitive.ItemGroupLabel>
>(function SelectItemGroupLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ItemGroupLabel
      ref={ref}
      data-slot="select-item-group-label"
      className={cn('px-2.5 py-1 text-xs font-normal text-muted-foreground', className)}
      {...props}
    />
  );
});

const SelectItem = forwardRef<
  ComponentRef<typeof SelectPrimitive.Item>,
  ComponentProps<typeof SelectPrimitive.Item>
>(function SelectItem({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        'relative mx-1 flex min-h-control-sm w-[calc(100%-0.5rem)] cursor-default items-center justify-between gap-2 rounded-sm bg-transparent px-3 py-1 text-sm text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
});

const SelectItemText = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemText>,
  ComponentProps<typeof SelectPrimitive.ItemText>
>(function SelectItemText({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ItemText
      ref={ref}
      data-slot="select-item-text"
      className={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
    />
  );
});

const SelectItemIndicator = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentProps<typeof SelectPrimitive.ItemIndicator>
>(function SelectItemIndicator({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      data-slot="select-item-indicator"
      className={cn(
        'inline-flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3',
        className,
      )}
      {...props}
    >
      {children ?? <CheckIcon />}
    </SelectPrimitive.ItemIndicator>
  );
});

const SelectItemTextContent = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function SelectItemTextContent({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="select-item-text-content"
        className={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', className)}
        {...props}
      />
    );
  },
);

const SelectItemTextIcon = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function SelectItemTextIcon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="select-item-text-icon"
        className={cn('inline-flex size-4 shrink-0 items-center justify-center', className)}
        {...props}
      />
    );
  },
);

const SelectItemTextLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function SelectItemTextLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="select-item-text-label"
        className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
        {...props}
      />
    );
  },
);

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  RootProvider: SelectRootProvider,
  Context: SelectPrimitive.Context,
  HiddenSelect: SelectPrimitive.HiddenSelect,
  ItemContext: SelectPrimitive.ItemContext,
  useSelect,
  useSelectContext,
  useSelectItemContext,
  Label: SelectLabel,
  Control: SelectControl,
  Field: SelectField,
  Trigger: SelectTrigger,
  ValueText: SelectValueText,
  ClearTrigger: SelectClearTrigger,
  Indicator: SelectIndicator,
  Positioner: SelectPositioner,
  Content: SelectContent,
  List: SelectList,
  ItemGroup: SelectItemGroup,
  ItemGroupLabel: SelectItemGroupLabel,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  ItemTextContent: SelectItemTextContent,
  ItemTextIcon: SelectItemTextIcon,
  ItemTextLabel: SelectItemTextLabel,
});

export { Select, useSelect, useSelectContext, useSelectItemContext };