import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent as ArkComboboxRootComponent,
  type ComboboxRootProps as ArkComboboxRootProps,
  type ComboboxRootProviderComponent as ArkComboboxRootProviderComponent,
  type ComboboxRootProviderProps as ArkComboboxRootProviderProps,
  useCombobox,
  useComboboxContext,
} from '@ark-ui/react/combobox';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
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

const ComboboxRoot = forwardRef(function ComboboxRoot<T extends CollectionItem>(
  { className, portalled, portalRef, ...props }: ComboboxRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ComboboxPrimitive.Root
        ref={ref}
        data-slot="combobox-root"
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortalProvider>
  );
}) as ArkComboboxRootComponent<OverlayPortalProps>;

const ComboboxRootProvider = forwardRef(function ComboboxRootProvider<T extends CollectionItem>(
  { className, portalled, portalRef, ...props }: ComboboxRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ComboboxPrimitive.RootProvider
        ref={ref}
        data-slot="combobox-root-provider"
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
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
      data-slot="combobox-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-input"
      asChild={asChild}
      className={clsx(!asChild && styles.input, normalizeClassName(className))}
      {...props}
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
  const triggerClassName = clsx(styles.clearTrigger, normalizeClassName(className));

  if (asChild) {
    return (
      <ComboboxPrimitive.ClearTrigger
        ref={ref}
        asChild
        data-slot="combobox-clear-trigger"
        className={triggerClassName}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </ComboboxPrimitive.ClearTrigger>
    );
  }

  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="combobox-clear-trigger"
      className={triggerClassName}
      {...props}
    >
      <CloseButton.Root
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear selection' : undefined)}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </CloseButton.Root>
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
      data-slot="combobox-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
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
        data-slot="combobox-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
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
      data-slot="combobox-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-empty"
      className={clsx(styles.empty, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxList = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.List>,
  ComponentProps<typeof ComboboxPrimitive.List>
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      data-slot="combobox-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-item-group-label"
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
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
      data-slot="combobox-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
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

const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  RootProvider: ComboboxRootProvider,
  Label: ComboboxLabel,
  Control: ComboboxControl,
  Input: ComboboxInput,
  ClearTrigger: ComboboxClearTrigger,
  Trigger: ComboboxTrigger,
  Positioner: ComboboxPositioner,
  Content: ComboboxContent,
  Empty: ComboboxEmpty,
  List: ComboboxList,
  ItemGroup: ComboboxItemGroup,
  ItemGroupLabel: ComboboxItemGroupLabel,
  Item: ComboboxItem,
  ItemText: ComboboxItemText,
  ItemIndicator: ComboboxItemIndicator,
  Option: ComboboxOption,
  Context: ComboboxPrimitive.Context,
});

export { Combobox, useCombobox, useComboboxContext };