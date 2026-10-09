'use client';

import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent as ArkComboboxRootComponent,
  type ComboboxRootProps as ArkComboboxRootProps,
  type ComboboxRootProviderComponent as ArkComboboxRootProviderComponent,
  type ComboboxRootProviderProps as ArkComboboxRootProviderProps,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
} from '@ark-ui/react/combobox';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Combobox.module.css';

type ComboboxRootProps<T extends CollectionItem> = ArkComboboxRootProps<T> & OverlayPortalProps;
type ComboboxRootProviderProps<T extends CollectionItem> = ArkComboboxRootProviderProps<T> &
  OverlayPortalProps;

const Combobox = forwardRef(function Combobox<T extends CollectionItem>(
  {
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  }: ComboboxRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ComboboxPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="combobox-root"
      />
    </OverlayPortalProvider>
  );
}) as ArkComboboxRootComponent<OverlayPortalProps>;

const ComboboxRootProvider = forwardRef(function ComboboxRootProvider<T extends CollectionItem>(
  {
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  }: ComboboxRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ComboboxPrimitive.RootProvider
        ref={ref}
        className={clsx(styles.root, className)}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="combobox-root-provider"
      />
    </OverlayPortalProvider>
  );
}) as ArkComboboxRootProviderComponent<OverlayPortalProps>;

const ComboboxLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Label>,
  ComponentProps<typeof ComboboxPrimitive.Label>
>(function ComboboxLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="combobox-label"
    />
  );
});

const ComboboxControl = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Control>,
  ComponentProps<typeof ComboboxPrimitive.Control>
>(function ComboboxControl({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="combobox-control"
    />
  );
});

const ComboboxInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComponentProps<typeof ComboboxPrimitive.Input>
>(function ComboboxInput({ asChild, className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.input, className)}
      {...props}
      data-slot="combobox-input"
    />
  );
});

const ComboboxClearTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ClearTrigger>,
  ComponentProps<typeof ComboboxPrimitive.ClearTrigger>
>(function ComboboxClearTrigger(
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
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="combobox-clear-trigger"
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
    </ComboboxPrimitive.ClearTrigger>
  );
});

const ComboboxTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Trigger>,
  ComponentProps<typeof ComboboxPrimitive.Trigger>
>(function ComboboxTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="combobox-trigger"
    >
      {children ?? <ChevronUpDownIcon />}
    </ComboboxPrimitive.Trigger>
  );
});

const ComboboxPositioner = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Positioner>,
  ComponentProps<typeof ComboboxPrimitive.Positioner>
>(function ComboboxPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <ComboboxPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="combobox-positioner"
      />
    </OverlayPortal>
  );
});

const ComboboxContent = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Content>,
  ComponentProps<typeof ComboboxPrimitive.Content>
>(function ComboboxContent({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="combobox-content"
    />
  );
});

const ComboboxEmpty = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Empty>,
  ComponentProps<typeof ComboboxPrimitive.Empty>
>(function ComboboxEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={clsx(styles.empty, className)}
      {...props}
      data-slot="combobox-empty"
    />
  );
});

const ComboboxStatus = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function ComboboxStatus({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.status, className)}
        {...props}
        data-slot="combobox-status"
      />
    );
  },
);

const ComboboxList = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.List>,
  ComponentProps<typeof ComboboxPrimitive.List>
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      className={clsx(styles.list, className)}
      {...props}
      data-slot="combobox-list"
    />
  );
});

const ComboboxItemGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemGroup>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroup>
>(function ComboboxItemGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroup
      ref={ref}
      className={clsx(styles.itemGroup, className)}
      {...props}
      data-slot="combobox-item-group"
    />
  );
});

const ComboboxItemGroupLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemGroupLabel>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>
>(function ComboboxItemGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroupLabel
      ref={ref}
      className={clsx(styles.itemGroupLabel, className)}
      {...props}
      data-slot="combobox-item-group-label"
    />
  );
});

const ComboboxItem = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Item>,
  ComponentProps<typeof ComboboxPrimitive.Item>
>(function ComboboxItem({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
      data-slot="combobox-item"
    />
  );
});

const ComboboxItemText = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemText>,
  ComponentProps<typeof ComboboxPrimitive.ItemText>
>(function ComboboxItemText({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemText
      ref={ref}
      className={clsx(styles.itemText, className)}
      {...props}
      data-slot="combobox-item-text"
    />
  );
});

const ComboboxItemIndicator = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemIndicator>,
  ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
>(function ComboboxItemIndicator({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      className={clsx(styles.itemIndicator, className)}
      {...props}
      data-slot="combobox-item-indicator"
    >
      {children ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
});

type ComboboxOptionProps = Omit<
  ComponentProps<typeof ComboboxPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: ReactNode;
  indicator?: ReactNode | false;
};

const ComboboxOption = forwardRef<ComponentRef<typeof ComboboxPrimitive.Item>, ComboboxOptionProps>(
  function ComboboxOption({ children, indicator, ...props }, ref) {
    return (
      <ComboboxItem ref={ref} {...props}>
        <ComboboxItemText>{children}</ComboboxItemText>
        {indicator !== false ? <ComboboxItemIndicator>{indicator}</ComboboxItemIndicator> : null}
      </ComboboxItem>
    );
  },
);

const ComboboxContext = ComboboxPrimitive.Context;
const ComboboxItemContext = ComboboxPrimitive.ItemContext;

export {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContext,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
};