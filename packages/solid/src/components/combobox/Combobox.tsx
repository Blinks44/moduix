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
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui/Icons';
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
        class={clsx(styles.root, local.class)}
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
        class={clsx(styles.root, local.class)}
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
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function ComboboxControl(props: ComponentProps<typeof ComboboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={clsx(styles.control, local.class)}
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
      class={clsx(!local.asChild && styles.input, local.class)}
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
  const triggerClass = clsx(styles.clearTrigger, local.class);

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
      class={clsx(styles.trigger, local.class)}
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function ComboboxEmpty(props: ComponentProps<typeof ComboboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      class={clsx(styles.empty, local.class)}
      {...others}
    />
  );
}

function ComboboxStatus(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="combobox-status" class={clsx(styles.status, local.class)} {...others} />
  );
}

function ComboboxList(props: ComponentProps<typeof ComboboxPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      class={clsx(styles.list, local.class)}
      {...others}
    />
  );
}

function ComboboxItemGroup(props: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroup
      data-slot="combobox-item-group"
      class={clsx(styles.itemGroup, local.class)}
      {...others}
    />
  );
}

function ComboboxItemGroupLabel(props: ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroupLabel
      data-slot="combobox-item-group-label"
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
    />
  );
}

function ComboboxItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function ComboboxItemText(props: ComponentProps<typeof ComboboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemText
      data-slot="combobox-item-text"
      class={clsx(styles.itemText, local.class)}
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
      class={clsx(styles.itemIndicator, local.class)}
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