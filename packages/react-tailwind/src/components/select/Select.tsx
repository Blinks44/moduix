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
import { a11yLabels } from '@/lib/moduix/a11yLabels';
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
type SelectFieldProps = Omit<
  ComponentProps<typeof SelectPrimitive.Control>,
  'asChild' | 'children'
> & {
  clearLabel?: string;
  indicator?: ReactNode;
  placeholder?: ComponentProps<typeof SelectPrimitive.ValueText>['placeholder'];
};

const Select = forwardRef(function Select<T extends CollectionItem>(
  {
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
        className={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', className)}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="select-root"
      />
    </OverlayPortalProvider>
  );
}) as ArkSelectRootComponent<OverlayPortalProps>;

const SelectRootProvider = forwardRef(function SelectRootProvider<T extends CollectionItem>(
  {
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
        className={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', className)}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="select-root-provider"
      />
    </OverlayPortalProvider>
  );
}) as ArkSelectRootProviderComponent<OverlayPortalProps>;

const SelectLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.Label>,
  ComponentProps<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-disabled',
        className,
      )}
      {...props}
      data-slot="select-label"
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
      className={cn(
        'group/select-control relative flex w-full min-w-0 items-center data-disabled:opacity-disabled',
        className,
      )}
      {...props}
      data-slot="select-control"
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
      asChild={asChild}
      className={cn(
        !asChild &&
          'peer/select-trigger inline-flex h-control-md w-full min-w-0 cursor-pointer items-center rounded-md border border-border bg-background px-3.5 pe-[2.875rem] text-start text-inherit outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out select-none [font:inherit] group-has-[>[data-slot=select-clear-trigger]:not([hidden])]/select-control:pe-[4.25rem] group-data-invalid/select-control:border-destructive group-data-invalid/select-control:outline-destructive focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-placeholder-shown:text-muted-foreground data-[state=open]:border-ring data-[state=open]:outline-ring',
        className,
      )}
      {...props}
      data-slot="select-trigger"
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
      className={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="select-value-text"
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
      className={cn('absolute inset-y-0 end-[2.125rem] my-auto size-control-xs', className)}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="select-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton
          aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.clearSelection : undefined)}
          aria-labelledby={ariaLabelledBy}
        >
          {children}
        </CloseButton>
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
      className={cn(
        'pointer-events-none absolute end-2 top-1/2 inline-flex size-control-xs -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [&>svg]:size-4 [@media(hover:hover)]:peer-[:enabled:hover]/select-trigger:bg-muted [@media(hover:hover)]:peer-[:enabled:hover]/select-trigger:text-foreground',
        className,
      )}
      {...props}
      data-slot="select-indicator"
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
        className={cn('z-(--z-index)', className)}
        {...props}
        data-slot="select-positioner"
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
      className={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(24rem,var(--available-height))] max-w-(--available-width) min-w-(--reference-width) origin-(--transform-origin) scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        className,
      )}
      {...props}
      data-slot="select-content"
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
      className={cn(
        'flex min-h-0 scroll-py-1 flex-col overflow-y-auto overscroll-contain outline-0',
        className,
      )}
      {...props}
      data-slot="select-list"
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
      className={cn('flex flex-col [&+&]:mt-2', className)}
      {...props}
      data-slot="select-item-group"
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
      className={cn('px-2.5 py-1 text-xs font-normal text-muted-foreground', className)}
      {...props}
      data-slot="select-item-group-label"
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
      className={cn(
        'relative mx-1 flex min-h-control-sm cursor-default items-center justify-between gap-2 rounded-sm px-3 py-1 text-sm outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )}
      {...props}
      data-slot="select-item"
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
      className={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="select-item-text"
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
      className={cn(
        'inline-flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3',
        className,
      )}
      {...props}
      data-slot="select-item-indicator"
    >
      {children ?? <CheckIcon />}
    </SelectPrimitive.ItemIndicator>
  );
});

type SelectOptionProps = Omit<
  ComponentProps<typeof SelectPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: ReactNode;
  indicator?: ReactNode | false;
};

const SelectOption = forwardRef<ComponentRef<typeof SelectPrimitive.Item>, SelectOptionProps>(
  function SelectOption({ children, indicator, ...props }, ref) {
    return (
      <SelectItem ref={ref} {...props}>
        <SelectItemText>{children}</SelectItemText>
        {indicator !== false ? <SelectItemIndicator>{indicator}</SelectItemIndicator> : null}
      </SelectItem>
    );
  },
);

const SelectItemTextContent = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function SelectItemTextContent({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', className)}
        {...props}
        data-slot="select-item-text-content"
      />
    );
  },
);

const SelectItemTextIcon = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function SelectItemTextIcon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn('inline-flex size-4 shrink-0 items-center justify-center', className)}
        {...props}
        data-slot="select-item-text-icon"
      />
    );
  },
);

const SelectItemTextLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function SelectItemTextLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
        {...props}
        data-slot="select-item-text-label"
      />
    );
  },
);

const SelectContext = SelectPrimitive.Context;
const SelectHiddenSelect = SelectPrimitive.HiddenSelect;
const SelectItemContext = SelectPrimitive.ItemContext;

export {
  Select,
  SelectClearTrigger,
  SelectContext,
  SelectControl,
  SelectContent,
  SelectField,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemContext,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectList,
  SelectOption,
  SelectPositioner,
  SelectRootProvider,
  SelectTrigger,
  SelectValueText,
  useSelect,
  useSelectContext,
  useSelectItemContext,
};

export type { SelectFieldProps, SelectOptionProps, SelectRootProps, SelectRootProviderProps };

export type {
  SelectClearTriggerProps,
  SelectContentProps,
  SelectContextProps,
  SelectControlProps,
  SelectHiddenSelectProps,
  SelectHighlightChangeDetails,
  SelectIndicatorProps,
  SelectItemContextProps,
  SelectItemGroupLabelProps,
  SelectItemGroupProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectListProps,
  SelectOpenChangeDetails,
  SelectPositionerProps,
  SelectTriggerProps,
  SelectValueChangeDetails,
  SelectValueTextProps,
  UseSelectContext,
  UseSelectItemContext,
  UseSelectProps,
  UseSelectReturn,
} from '@ark-ui/react/select';