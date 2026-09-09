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
} from '@ark-ui/solid/combobox';
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
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

type ComboboxRootProps<T extends CollectionItem> = ArkComboboxRootProps<T> & OverlayPortalProps;
type ComboboxRootProviderProps<T extends CollectionItem> = ArkComboboxRootProviderProps<T> &
  OverlayPortalProps;

const ComboboxRoot = function ComboboxRoot<T extends CollectionItem>(props: ComboboxRootProps<T>) {
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
      <ComboboxPrimitive.Root
        asChild={local.asChild}
        data-slot="combobox-root"
        class={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground',
          local.class,
        )}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </ComboboxPrimitive.Root>
    </OverlayPortalProvider>
  );
} as ArkComboboxRootComponent<OverlayPortalProps>;

const ComboboxRootProvider = function ComboboxRootProvider<T extends CollectionItem>(
  props: ComboboxRootProviderProps<T>,
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
      <ComboboxPrimitive.RootProvider
        asChild={local.asChild}
        data-slot="combobox-root-provider"
        class={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground',
          local.class,
        )}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </ComboboxPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
} as ArkComboboxRootProviderComponent<OverlayPortalProps>;

function ComboboxLabel(props: ComponentProps<typeof ComboboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      class={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    />
  );
}

function ComboboxControl(props: ComponentProps<typeof ComboboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cn(
        'group/combobox-control relative flex w-full min-w-0 items-center rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out data-disabled:opacity-50 data-focus:border-ring data-focus:outline-ring data-invalid:border-destructive data-invalid:outline-destructive data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ComboboxInput(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ComboboxPrimitive.Input
      asChild={local.asChild}
      data-slot="combobox-input"
      class={cn(
        !local.asChild &&
          'm-0 box-border h-control-md w-full min-w-0 rounded-[inherit] border-0 bg-transparent px-3.5 text-inherit outline-0 [font:inherit] group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:pe-[4.375rem] group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-11 group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-[4.375rem] placeholder:text-muted-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function ComboboxClearTrigger(props: ComponentProps<typeof ComboboxPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const resolvedChildren = children(() => local.children);
  const triggerClass = cn(
    'absolute inset-y-0 end-[2.125rem] my-auto size-control-xs transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none [&>svg]:size-4',
    local.class,
  );

  if (local.asChild) {
    return (
      <ComboboxPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        data-slot="combobox-clear-trigger"
        class={triggerClass}
        {...others}
      >
        {local.children}
      </ComboboxPrimitive.ClearTrigger>
    );
  }

  return (
    <ComboboxPrimitive.ClearTrigger
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
      data-slot="combobox-clear-trigger"
      class={triggerClass}
      {...others}
    />
  );
}

function ComboboxTrigger(props: ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      class={cn(
        'absolute end-2 top-1/2 m-0 box-border inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 [line-height:0] text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <ChevronUpDownIcon />}
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxPositioner(props: ComponentProps<typeof ComboboxPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <ComboboxPrimitive.Positioner
        data-slot="combobox-positioner"
        class={cn('z-[var(--z-index)] outline-0', local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function ComboboxContent(props: ComponentProps<typeof ComboboxPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Content
      data-slot="combobox-content"
      class={cn(
        'z-[calc(60+var(--layer-index,0))] box-border flex max-h-[min(24rem,var(--available-height))] max-w-[var(--available-width)] min-w-[var(--reference-width)] origin-[var(--transform-origin)] scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        local.class,
      )}
      {...others}
    />
  );
}

function ComboboxEmpty(props: ComponentProps<typeof ComboboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      class={cn('px-4 py-1 text-sm text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function ComboboxStatus(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="combobox-status"
      class={cn('px-4 py-1 text-sm text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function ComboboxList(props: ComponentProps<typeof ComboboxPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      class={cn('flex min-h-0 flex-col outline-0 data-empty:hidden', local.class)}
      {...others}
    />
  );
}

function ComboboxItemGroup(props: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroup
      data-slot="combobox-item-group"
      class={cn('flex flex-col [&+&]:mt-2', local.class)}
      {...others}
    />
  );
}

function ComboboxItemGroupLabel(props: ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroupLabel
      data-slot="combobox-item-group-label"
      class={cn(
        'sticky -top-1 z-1 bg-popover px-2.5 py-1 text-xs font-normal text-muted-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function ComboboxItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={cn(
        'relative mx-1 box-border flex min-h-control-sm w-[calc(100%-0.5rem)] cursor-default items-center justify-between gap-2 rounded-sm border-0 bg-transparent px-3 py-1 text-sm text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=checked]:text-popover-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function ComboboxItemText(props: ComponentProps<typeof ComboboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemText
      data-slot="combobox-item-text"
      class={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
    />
  );
}

function ComboboxItemIndicator(props: ComponentProps<typeof ComboboxPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      class={cn(
        'inline-flex size-3 shrink-0 items-center justify-center [&>svg]:size-full',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
}

type ComboboxOptionProps = Omit<
  ComponentProps<typeof ComboboxPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: JSX.Element;
  indicator?: JSX.Element | false;
};

function ComboboxOption(props: ComboboxOptionProps) {
  const [local, others] = splitProps(props, ['children', 'indicator']);

  return (
    <ComboboxItem {...others}>
      <ComboboxItemText>{local.children}</ComboboxItemText>
      {local.indicator !== false && (
        <ComboboxItemIndicator>{local.indicator}</ComboboxItemIndicator>
      )}
    </ComboboxItem>
  );
}

type ComboboxComponent = ArkComboboxRootComponent<OverlayPortalProps> & {
  Root: typeof ComboboxRoot;
  RootProvider: typeof ComboboxRootProvider;
  Label: typeof ComboboxLabel;
  Control: typeof ComboboxControl;
  Input: typeof ComboboxInput;
  ClearTrigger: typeof ComboboxClearTrigger;
  Trigger: typeof ComboboxTrigger;
  Positioner: typeof ComboboxPositioner;
  Content: typeof ComboboxContent;
  Empty: typeof ComboboxEmpty;
  Status: typeof ComboboxStatus;
  List: typeof ComboboxList;
  ItemGroup: typeof ComboboxItemGroup;
  ItemGroupLabel: typeof ComboboxItemGroupLabel;
  Item: typeof ComboboxItem;
  ItemText: typeof ComboboxItemText;
  ItemIndicator: typeof ComboboxItemIndicator;
  Option: typeof ComboboxOption;
  Context: typeof ComboboxPrimitive.Context;
  ItemContext: typeof ComboboxPrimitive.ItemContext;
};

const Combobox: ComboboxComponent = Object.assign(ComboboxRoot, {
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
  Status: ComboboxStatus,
  List: ComboboxList,
  ItemGroup: ComboboxItemGroup,
  ItemGroupLabel: ComboboxItemGroupLabel,
  Item: ComboboxItem,
  ItemText: ComboboxItemText,
  ItemIndicator: ComboboxItemIndicator,
  Option: ComboboxOption,
  Context: ComboboxPrimitive.Context,
  ItemContext: ComboboxPrimitive.ItemContext,
});

export { Combobox, useCombobox, useComboboxContext, useComboboxItemContext };