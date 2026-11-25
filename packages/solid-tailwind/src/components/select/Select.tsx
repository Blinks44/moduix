import {
  Select as SelectPrimitive,
  type CollectionItem,
  type SelectRootProps as ArkSelectRootProps,
  type SelectRootProviderProps as ArkSelectRootProviderProps,
  useSelect,
  useSelectContext,
  useSelectItemContext,
} from '@ark-ui/solid/select';
import type { ComponentProps, JSX } from 'solid-js';
import { children, Show, splitProps } from 'solid-js';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
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
  clearable?: boolean;
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof SelectPrimitive.ClearTrigger>;
  indicator?: JSX.Element;
  placeholder?: ComponentProps<typeof SelectPrimitive.ValueText>['placeholder'];
  triggerProps?: ComponentProps<typeof SelectPrimitive.Trigger>;
  valueTextProps?: ComponentProps<typeof SelectPrimitive.ValueText>;
};
type SelectDropdownProps = ComponentProps<typeof SelectPrimitive.Content>;

function Select<T extends CollectionItem>(props: SelectRootProps<T>) {
  const [local, others] = splitProps(props, [
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <SelectPrimitive.Root
        class={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="select-root"
      />
    </OverlayPortalProvider>
  );
}

function SelectRootProvider<T extends CollectionItem>(props: SelectRootProviderProps<T>) {
  const [local, others] = splitProps(props, [
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <SelectPrimitive.RootProvider
        class={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="select-root-provider"
      />
    </OverlayPortalProvider>
  );
}

function SelectLabel(props: ComponentProps<typeof SelectPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Label
      class={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-disabled',
        local.class,
      )}
      {...others}
      data-slot="select-label"
    />
  );
}

function SelectControl(props: ComponentProps<typeof SelectPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Control
      class={cn(
        'group/select-control relative flex w-full min-w-0 items-center [--select-action-offset:0.5rem] [--select-action-size:var(--moduix-size-xs)] data-disabled:opacity-disabled',
        local.class,
      )}
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
      class={cn(
        !local.asChild && [
          'peer/select-trigger inline-flex h-control-md w-full min-w-0 cursor-pointer items-center rounded-md border border-input bg-background px-3.5 pe-[calc(var(--select-action-offset)+var(--select-action-size)+0.875rem)] text-start text-inherit outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out select-none [font:inherit]',
          'group-has-[>[data-slot=select-clear-trigger]:not([hidden])]/select-control:pe-[calc(var(--select-action-offset)+var(--select-action-size)*2+0.75rem)]',
          'disabled:cursor-default data-placeholder-shown:text-muted-foreground',
          'focus-visible:border-ring focus-visible:outline-ring/50 data-[state=open]:border-ring data-[state=open]:outline-ring/50',
          'group-data-invalid/select-control:border-destructive group-data-invalid/select-control:focus-visible:outline-destructive/20 group-data-invalid/select-control:data-[state=open]:outline-destructive/20',
        ],
        local.class,
      )}
      {...others}
      data-slot="select-trigger"
    />
  );
}

function SelectValueText(props: ComponentProps<typeof SelectPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ValueText
      class={cn(
        'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:me-2 [&>svg]:inline-block [&>svg]:size-4 [&>svg]:align-middle',
        local.class,
      )}
      {...others}
      data-slot="select-value-text"
    />
  );
}

const clearTriggerClassName =
  'absolute inset-y-0 end-[calc(var(--select-action-offset)+var(--select-action-size)+0.125rem)] my-auto size-(--select-action-size)';

function SelectClearTrigger(props: ComponentProps<typeof SelectPrimitive.ClearTrigger>) {
  const labels = useA11yLabels();
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);

  return (
    <Show
      when={local.asChild}
      fallback={
        <SelectPrimitive.ClearTrigger
          asChild={(triggerProps) => {
            const resolvedProps = triggerProps();

            return (
              <CloseButton
                {...resolvedProps}
                aria-label={
                  local['aria-label'] ??
                  (local['aria-labelledby'] == null ? labels().clearSelection : undefined)
                }
                aria-labelledby={local['aria-labelledby']}
              >
                {local.children}
              </CloseButton>
            );
          }}
          class={cn(clearTriggerClassName, local.class)}
          {...others}
          data-slot="select-clear-trigger"
        />
      }
    >
      <SelectPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={cn(clearTriggerClassName, local.class)}
        {...others}
        data-slot="select-clear-trigger"
      >
        {local.children}
      </SelectPrimitive.ClearTrigger>
    </Show>
  );
}

function SelectIndicator(props: ComponentProps<typeof SelectPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <SelectPrimitive.Indicator
      class={cn(
        'pointer-events-none absolute end-(--select-action-offset) top-1/2 inline-flex size-(--select-action-size) -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out peer-enabled/select-trigger:peer-hover/select-trigger:bg-muted peer-enabled/select-trigger:peer-hover/select-trigger:text-foreground [&>svg]:size-4',
        local.class,
      )}
      {...others}
      data-slot="select-indicator"
    >
      {resolvedChildren() ?? <ChevronUpDownIcon />}
    </SelectPrimitive.Indicator>
  );
}

function SelectField(props: SelectFieldProps) {
  const [local, others] = splitProps(props, [
    'clearable',
    'clearLabel',
    'clearTriggerProps',
    'indicator',
    'placeholder',
    'triggerProps',
    'valueTextProps',
  ]);
  const showClearTrigger = () =>
    local.clearable ?? (local.clearLabel != null || local.clearTriggerProps != null);

  return (
    <SelectControl {...others}>
      <SelectTrigger {...local.triggerProps}>
        <SelectValueText placeholder={local.placeholder} {...local.valueTextProps} />
      </SelectTrigger>
      {showClearTrigger() && (
        <SelectClearTrigger aria-label={local.clearLabel} {...local.clearTriggerProps} />
      )}
      <SelectIndicator>{local.indicator}</SelectIndicator>
    </SelectControl>
  );
}

function SelectPositioner(props: ComponentProps<typeof SelectPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <SelectPrimitive.Positioner
        class={cn('z-(--z-index)', local.class)}
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
      class={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(24rem,var(--available-height))] max-w-(--available-width) min-w-(--reference-width) origin-(--transform-origin) scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="select-content"
    />
  );
}

function SelectDropdown(props: SelectDropdownProps) {
  return (
    <SelectPositioner>
      <SelectContent {...props} />
    </SelectPositioner>
  );
}

function SelectList(props: ComponentProps<typeof SelectPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.List
      class={cn(
        'flex min-h-0 scroll-py-1 flex-col overflow-y-auto overscroll-contain outline-0',
        local.class,
      )}
      {...others}
      data-slot="select-list"
    />
  );
}

function SelectItemGroup(props: ComponentProps<typeof SelectPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ItemGroup
      class={cn('flex flex-col [&+&]:mt-2', local.class)}
      {...others}
      data-slot="select-item-group"
    />
  );
}

function SelectItemGroupLabel(props: ComponentProps<typeof SelectPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ItemGroupLabel
      class={cn('px-2.5 py-1 text-xs font-normal text-muted-foreground', local.class)}
      {...others}
      data-slot="select-item-group-label"
    />
  );
}

function SelectItem(props: ComponentProps<typeof SelectPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Item
      class={cn(
        'relative mx-1 flex min-h-control-sm cursor-default items-center justify-between gap-2 rounded-sm px-3 py-1 text-sm outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        local.class,
      )}
      {...others}
      data-slot="select-item"
    />
  );
}

function SelectItemText(props: ComponentProps<typeof SelectPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.ItemText
      class={cn(
        'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:me-2 [&>svg]:inline-block [&>svg]:size-4 [&>svg]:align-middle',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3',
        local.class,
      )}
      {...others}
      data-slot="select-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </SelectPrimitive.ItemIndicator>
  );
}

type SelectOptionProps = Omit<
  ComponentProps<typeof SelectPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: JSX.Element;
  indicator?: JSX.Element | false;
};

function SelectOption(props: SelectOptionProps) {
  const [local, others] = splitProps(props, ['children', 'indicator']);

  return (
    <SelectItem {...others}>
      <SelectItemText>{local.children}</SelectItemText>
      {local.indicator !== false && <SelectItemIndicator>{local.indicator}</SelectItemIndicator>}
    </SelectItem>
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
  SelectDropdown,
  SelectField,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemContext,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
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

export type {
  SelectDropdownProps,
  SelectFieldProps,
  SelectOptionProps,
  SelectRootProps,
  SelectRootProviderProps,
};

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
} from '@ark-ui/solid/select';

export { createListCollection, useListCollection } from '@ark-ui/solid/collection';
export type {
  CollectionItem,
  CollectionOptions,
  ListCollection,
  UseListCollectionProps,
  UseListCollectionReturn,
} from '@ark-ui/solid/collection';
export { useFilter } from '@ark-ui/solid/locale';
export type { UseFilterProps, UseFilterReturn } from '@ark-ui/solid/locale';
export type {
  SelectFocusOutsideEvent,
  SelectInteractOutsideEvent,
  SelectIntlTranslations,
  SelectPointerDownOutsideEvent,
  SelectPositioningOptions,
  SelectScrollToIndexDetails,
  SelectSelectionDetails,
} from '@ark-ui/solid/select';