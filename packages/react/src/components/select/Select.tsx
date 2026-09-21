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
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Select.module.css';

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
        className={clsx(styles.root, className)}
        asChild={asChild}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="select-root"
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
        className={clsx(styles.root, className)}
        asChild={asChild}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="select-root-provider"
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(!asChild && styles.trigger, className)}
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
      className={clsx(styles.valueText, className)}
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
  const triggerClassName = clsx(styles.clearTrigger, className);

  return (
    <SelectPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="select-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton
          aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear selection' : undefined)}
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
      className={clsx(styles.indicator, className)}
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
        className={clsx(styles.positioner, className)}
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
      className={clsx(styles.content, className)}
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
      className={clsx(styles.list, className)}
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
      className={clsx(styles.itemGroup, className)}
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
      className={clsx(styles.itemGroupLabel, className)}
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
      className={clsx(styles.item, className)}
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
      className={clsx(styles.itemText, className)}
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
      className={clsx(styles.itemIndicator, className)}
      {...props}
      data-slot="select-item-indicator"
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
        className={clsx(styles.itemTextContent, className)}
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
        className={clsx(styles.itemTextIcon, className)}
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
        className={clsx(styles.itemTextLabel, className)}
        {...props}
        data-slot="select-item-text-label"
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