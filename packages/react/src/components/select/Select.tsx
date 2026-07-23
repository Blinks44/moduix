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
import type { ComponentProps, ComponentRef, ForwardedRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Select.module.css';

type SelectNativeFormControl = 'select' | 'input';
type SelectRootOwnProps = OverlayPortalProps & {
  nativeFormControl?: SelectNativeFormControl;
};
type SelectRootProps<T extends CollectionItem> = ArkSelectRootProps<T> & SelectRootOwnProps;
type SelectRootProviderProps<T extends CollectionItem> = ArkSelectRootProviderProps<T> &
  SelectRootOwnProps;
type SelectRootComponent = ArkSelectRootComponent<SelectRootOwnProps>;
type SelectRootProviderComponent = ArkSelectRootProviderComponent<SelectRootOwnProps>;
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
    nativeFormControl = 'select',
    portalled,
    portalRef,
    ...props
  }: SelectRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <SelectPrimitive.Root
        ref={ref}
        data-slot="select-root"
        className={clsx(styles.root, normalizeClassName(className))}
        asChild={asChild}
        {...props}
      >
        {withNativeFormControl(children, asChild, nativeFormControl)}
      </SelectPrimitive.Root>
    </OverlayPortalProvider>
  );
}) as SelectRootComponent;

const SelectRootProvider = forwardRef(function SelectRootProvider<T extends CollectionItem>(
  {
    asChild,
    children,
    className,
    nativeFormControl = 'select',
    portalled,
    portalRef,
    ...props
  }: SelectRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <SelectPrimitive.RootProvider
        ref={ref}
        data-slot="select-root-provider"
        className={clsx(styles.root, normalizeClassName(className))}
        asChild={asChild}
        {...props}
      >
        {withNativeFormControl(children, asChild, nativeFormControl)}
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
      className={clsx(styles.label, normalizeClassName(className))}
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
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
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
      className={clsx(styles.valueText, normalizeClassName(className))}
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
  const triggerClassName = clsx(styles.clearTrigger, normalizeClassName(className));

  if (asChild) {
    return (
      <SelectPrimitive.ClearTrigger
        ref={ref}
        asChild
        data-slot="select-clear-trigger"
        className={triggerClassName}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </SelectPrimitive.ClearTrigger>
    );
  }

  return (
    <SelectPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="select-clear-trigger"
      className={triggerClassName}
      {...props}
    >
      <CloseButton.Root
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear selection' : undefined)}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </CloseButton.Root>
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
      className={clsx(styles.indicator, normalizeClassName(className))}
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
          <SelectIndicator>{indicator}</SelectIndicator>
        </SelectTrigger>
        {clearLabel && <SelectClearTrigger aria-label={clearLabel} />}
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
        className={clsx(styles.positioner, normalizeClassName(className))}
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
      className={clsx(styles.content, normalizeClassName(className))}
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
      className={clsx(styles.list, normalizeClassName(className))}
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
      className={clsx(styles.itemGroup, normalizeClassName(className))}
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
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
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
      className={clsx(styles.item, normalizeClassName(className))}
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
      className={clsx(styles.itemText, normalizeClassName(className))}
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
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </SelectPrimitive.ItemIndicator>
  );
});

function withNativeFormControl(
  children: ReactNode,
  asChild: boolean | undefined,
  nativeFormControl: SelectNativeFormControl,
) {
  const formControl = <SelectFormControl nativeFormControl={nativeFormControl} />;

  if (!asChild) {
    return (
      <>
        {children}
        {formControl}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, formControl);
}

function SelectFormControl({ nativeFormControl }: { nativeFormControl: SelectNativeFormControl }) {
  const select = useSelectContext();

  if (nativeFormControl === 'select') {
    return <SelectPrimitive.HiddenSelect data-slot="select-hidden-select" />;
  }

  const hiddenSelectProps = select.getHiddenSelectProps();

  return (
    <>
      {select.value.map((value) => (
        <input
          key={value}
          type="hidden"
          data-slot="select-hidden-input"
          name={hiddenSelectProps.name}
          form={hiddenSelectProps.form}
          autoComplete={hiddenSelectProps.autoComplete}
          disabled={hiddenSelectProps.disabled}
          value={value}
        />
      ))}
    </>
  );
}

function SelectItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-content"
      className={clsx(styles.itemTextContent, normalizeClassName(className))}
      {...props}
    />
  );
}

function SelectItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-icon"
      className={clsx(styles.itemTextIcon, normalizeClassName(className))}
      {...props}
    />
  );
}

function SelectItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-label"
      className={clsx(styles.itemTextLabel, normalizeClassName(className))}
      {...props}
    />
  );
}

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  RootProvider: SelectRootProvider,
  Context: SelectPrimitive.Context,
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