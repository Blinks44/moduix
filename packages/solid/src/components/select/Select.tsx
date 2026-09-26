import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
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
} from '@ark-ui/solid/select';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui/Icons';
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
  indicator?: JSX.Element;
  placeholder?: ComponentProps<typeof SelectPrimitive.ValueText>['placeholder'];
};

const Select = function Select<T extends CollectionItem>(props: SelectRootProps<T>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <SelectPrimitive.Root
        asChild={local.asChild}
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="select-root"
      >
        {local.children}
      </SelectPrimitive.Root>
    </OverlayPortalProvider>
  );
} as SelectRootComponent;

const SelectRootProvider = function SelectRootProvider<T extends CollectionItem>(
  props: SelectRootProviderProps<T>,
) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <SelectPrimitive.RootProvider
        asChild={local.asChild}
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="select-root-provider"
      >
        {local.children}
      </SelectPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
} as SelectRootProviderComponent;

function SelectLabel(props: ComponentProps<typeof SelectPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="select-label"
    />
  );
}

function SelectControl(props: ComponentProps<typeof SelectPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="select-control"
    />
  );
}

function SelectTrigger(props: ComponentProps<typeof SelectPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <SelectPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="select-trigger"
    />
  );
}

function SelectValueText(props: ComponentProps<typeof SelectPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="select-value-text"
    />
  );
}

function SelectClearTrigger(props: ComponentProps<typeof SelectPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const resolvedChildren = children(() => local.children);
  const triggerClass = clsx(styles.clearTrigger, local.class);

  if (local.asChild) {
    return (
      <SelectPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={triggerClass}
        {...others}
        data-slot="select-clear-trigger"
      >
        {local.children}
      </SelectPrimitive.ClearTrigger>
    );
  }

  return (
    <SelectPrimitive.ClearTrigger
      asChild={(triggerProps) => {
        const resolvedProps = triggerProps();

        return (
          <CloseButton
            {...resolvedProps}
            aria-label={
              local['aria-label'] ??
              (local['aria-labelledby'] == null ? a11yLabels.clearSelection : undefined)
            }
            aria-labelledby={local['aria-labelledby']}
          >
            {resolvedChildren()}
          </CloseButton>
        );
      }}
      class={triggerClass}
      {...others}
      data-slot="select-clear-trigger"
    />
  );
}

function SelectIndicator(props: ComponentProps<typeof SelectPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <SelectPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="select-indicator"
    >
      {resolvedChildren() ?? <ChevronUpDownIcon />}
    </SelectPrimitive.Indicator>
  );
}

function SelectField(props: SelectFieldProps) {
  const [local, others] = splitProps(props, ['clearLabel', 'indicator', 'placeholder']);

  return (
    <SelectControl {...others}>
      <SelectTrigger>
        <SelectValueText placeholder={local.placeholder} />
      </SelectTrigger>
      {local.clearLabel && <SelectClearTrigger aria-label={local.clearLabel} />}
      <SelectIndicator>{local.indicator}</SelectIndicator>
    </SelectControl>
  );
}

function SelectPositioner(props: ComponentProps<typeof SelectPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <SelectPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="select-positioner"
      />
    </OverlayPortal>
  );
}

function SelectContent(props: ComponentProps<typeof SelectPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="select-content"
    />
  );
}

function SelectList(props: ComponentProps<typeof SelectPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.List
      class={clsx(styles.list, local.class)}
      {...others}
      data-slot="select-list"
    />
  );
}

function SelectItemGroup(props: ComponentProps<typeof SelectPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
      {...others}
      data-slot="select-item-group"
    />
  );
}

function SelectItemGroupLabel(props: ComponentProps<typeof SelectPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ItemGroupLabel
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
      data-slot="select-item-group-label"
    />
  );
}

function SelectItem(props: ComponentProps<typeof SelectPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="select-item"
    />
  );
}

function SelectItemText(props: ComponentProps<typeof SelectPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
      {...others}
      data-slot="select-item-text"
    />
  );
}

function SelectItemIndicator(props: ComponentProps<typeof SelectPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <SelectPrimitive.ItemIndicator
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="select-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </SelectPrimitive.ItemIndicator>
  );
}

function SelectItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextContent, local.class)}
      {...others}
      data-slot="select-item-text-content"
    />
  );
}

function SelectItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextIcon, local.class)}
      {...others}
      data-slot="select-item-text-icon"
    />
  );
}

function SelectItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextLabel, local.class)}
      {...others}
      data-slot="select-item-text-label"
    />
  );
}

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
  SelectPositioner,
  SelectRootProvider,
  SelectTrigger,
  SelectValueText,
  useSelect,
  useSelectContext,
  useSelectItemContext,
};