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
import { a11yLabels } from '@/lib/moduix/a11yLabels';
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

const Combobox = function Combobox<T extends CollectionItem>(props: ComboboxRootProps<T>) {
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
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="combobox-root"
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
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="combobox-root-provider"
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
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="combobox-label"
    />
  );
}

function ComboboxControl(props: ComponentProps<typeof ComboboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="combobox-control"
    />
  );
}

function ComboboxInput(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ComboboxPrimitive.Input
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.input, local.class)}
      {...others}
      data-slot="combobox-input"
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
        class={triggerClass}
        {...others}
        data-slot="combobox-clear-trigger"
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
      data-slot="combobox-clear-trigger"
    />
  );
}

function ComboboxTrigger(props: ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.Trigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="combobox-trigger"
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
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="combobox-positioner"
      />
    </OverlayPortal>
  );
}

function ComboboxContent(props: ComponentProps<typeof ComboboxPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="combobox-content"
    />
  );
}

function ComboboxEmpty(props: ComponentProps<typeof ComboboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Empty
      class={clsx(styles.empty, local.class)}
      {...others}
      data-slot="combobox-empty"
    />
  );
}

function ComboboxStatus(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.status, local.class)} {...others} data-slot="combobox-status" />
  );
}

function ComboboxList(props: ComponentProps<typeof ComboboxPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.List
      class={clsx(styles.list, local.class)}
      {...others}
      data-slot="combobox-list"
    />
  );
}

function ComboboxItemGroup(props: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
      {...others}
      data-slot="combobox-item-group"
    />
  );
}

function ComboboxItemGroupLabel(props: ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroupLabel
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
      data-slot="combobox-item-group-label"
    />
  );
}

function ComboboxItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="combobox-item"
    />
  );
}

function ComboboxItemText(props: ComponentProps<typeof ComboboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
      {...others}
      data-slot="combobox-item-text"
    />
  );
}

function ComboboxItemIndicator(props: ComponentProps<typeof ComboboxPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.ItemIndicator
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="combobox-item-indicator"
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