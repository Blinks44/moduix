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
import type { ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui/Icons';
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
  indicator?: JSX.Element;
  placeholder?: ComponentProps<typeof SelectPrimitive.ValueText>['placeholder'];
};

const SelectRoot = function SelectRoot<T extends CollectionItem>(props: SelectRootProps<T>) {
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
        class={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="select-root"
      >
        {local.children}
      </SelectPrimitive.Root>
    </OverlayPortalProvider>
  );
} as ArkSelectRootComponent<OverlayPortalProps>;

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
        class={cn('flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground', local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="select-root-provider"
      >
        {local.children}
      </SelectPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
} as ArkSelectRootProviderComponent<OverlayPortalProps>;

function SelectLabel(props: ComponentProps<typeof SelectPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SelectPrimitive.Label
      class={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-50',
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
        'group/select-control relative flex w-full min-w-0 items-center text-foreground data-disabled:opacity-50',
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
        !local.asChild &&
          'peer/select-trigger relative inline-flex h-control-md w-full min-w-0 cursor-pointer items-center justify-start rounded-md border border-border bg-background px-3.5 pe-[2.875rem] text-start text-inherit outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out select-none [font:inherit] group-has-[>[data-slot=select-clear-trigger]:not([hidden])]/select-control:pe-[4.25rem] group-data-invalid/select-control:border-destructive group-data-invalid/select-control:outline-destructive focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
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
      class={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
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

  if (local.asChild) {
    return (
      <SelectPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={cn(
          'pointer-events-auto absolute inset-y-0 end-[2.125rem] my-auto size-control-xs transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none [&>svg]:size-4',
          local.class,
        )}
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
          <CloseButton.Root
            {...resolvedProps}
            aria-label={
              local['aria-label'] ??
              (local['aria-labelledby'] == null ? 'Clear selection' : undefined)
            }
            aria-labelledby={local['aria-labelledby']}
          >
            {resolvedChildren()}
          </CloseButton.Root>
        );
      }}
      class={cn(
        'pointer-events-auto absolute inset-y-0 end-[2.125rem] my-auto size-control-xs transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none [&>svg]:size-4',
        local.class,
      )}
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
      class={cn(
        'pointer-events-none inline-flex size-control-xs shrink-0 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-[:not([disabled]):not([data-disabled]):hover]/select-trigger:bg-muted peer-[:not([disabled]):not([data-disabled]):hover]/select-trigger:text-foreground motion-reduce:transition-none [&>svg]:block [&>svg]:size-4',
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
  const [local, others] = splitProps(props, ['clearLabel', 'indicator', 'placeholder']);

  return (
    <SelectControl {...others}>
      <SelectTrigger>
        <SelectValueText placeholder={local.placeholder} />
      </SelectTrigger>
      {local.clearLabel && <SelectClearTrigger aria-label={local.clearLabel} />}
      <SelectIndicator class="absolute end-2 top-1/2 -translate-y-1/2">
        {local.indicator}
      </SelectIndicator>
    </SelectControl>
  );
}

function SelectPositioner(props: ComponentProps<typeof SelectPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <SelectPrimitive.Positioner
        class={cn('z-[var(--z-index)] outline-0', local.class)}
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
        'z-[calc(60+var(--layer-index,0))] flex max-h-[min(24rem,var(--available-height))] max-w-[var(--available-width)] min-w-[var(--reference-width)] origin-[var(--transform-origin)] scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
        local.class,
      )}
      {...others}
      data-slot="select-content"
    />
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
        'relative mx-1 flex min-h-control-sm w-[calc(100%-0.5rem)] cursor-default items-center justify-between gap-2 rounded-sm bg-transparent px-3 py-1 text-sm text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
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
      class={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
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

function SelectItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', local.class)}
      {...others}
      data-slot="select-item-text-content"
    />
  );
}

function SelectItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn('inline-flex size-4 shrink-0 items-center justify-center', local.class)}
      {...others}
      data-slot="select-item-text-icon"
    />
  );
}

function SelectItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
      data-slot="select-item-text-label"
    />
  );
}

type SelectComponent = ArkSelectRootComponent<OverlayPortalProps> & {
  Root: ArkSelectRootComponent<OverlayPortalProps>;
  RootProvider: ArkSelectRootProviderComponent<OverlayPortalProps>;
  Context: typeof SelectPrimitive.Context;
  HiddenSelect: typeof SelectPrimitive.HiddenSelect;
  ItemContext: typeof SelectPrimitive.ItemContext;
  useSelect: typeof useSelect;
  useSelectContext: typeof useSelectContext;
  useSelectItemContext: typeof useSelectItemContext;
  Label: typeof SelectLabel;
  Control: typeof SelectControl;
  Field: typeof SelectField;
  Trigger: typeof SelectTrigger;
  ValueText: typeof SelectValueText;
  ClearTrigger: typeof SelectClearTrigger;
  Indicator: typeof SelectIndicator;
  Positioner: typeof SelectPositioner;
  Content: typeof SelectContent;
  List: typeof SelectList;
  ItemGroup: typeof SelectItemGroup;
  ItemGroupLabel: typeof SelectItemGroupLabel;
  Item: typeof SelectItem;
  ItemText: typeof SelectItemText;
  ItemIndicator: typeof SelectItemIndicator;
  ItemTextContent: typeof SelectItemTextContent;
  ItemTextIcon: typeof SelectItemTextIcon;
  ItemTextLabel: typeof SelectItemTextLabel;
};

const Select: SelectComponent = Object.assign(SelectRoot, {
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