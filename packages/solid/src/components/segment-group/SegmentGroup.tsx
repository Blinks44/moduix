import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
  type UseSegmentGroupProps,
} from '@ark-ui/solid/segment-group';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { For, splitProps } from 'solid-js';
import styles from './SegmentGroup.module.css';

type SegmentGroupMachineProps = NonNullable<Parameters<typeof useSegmentGroupPrimitive>[0]>;
type SegmentGroupSize = 'sm' | 'md' | 'lg';
type SegmentGroupRootProps = ComponentProps<typeof SegmentGroupPrimitive.Root> & {
  size?: SegmentGroupSize;
};
type SegmentGroupRootProviderProps = ComponentProps<typeof SegmentGroupPrimitive.RootProvider> & {
  size?: SegmentGroupSize;
};
type SegmentGroupItemOption = { value: string; label: JSX.Element; disabled?: boolean };
type SegmentGroupItemsProps = { items: readonly (string | SegmentGroupItemOption)[] };

function useSegmentGroup(props?: SegmentGroupMachineProps) {
  return useSegmentGroupPrimitive(() => {
    const machineProps: UseSegmentGroupProps =
      (typeof props === 'function' ? props() : props) ?? {};
    return { ...machineProps, orientation: machineProps.orientation ?? 'horizontal' };
  });
}

function SegmentGroup(props: SegmentGroupRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <SegmentGroupPrimitive.Root
      orientation="horizontal"
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="segment-group-root"
    />
  );
}

function SegmentGroupRootProvider(props: SegmentGroupRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <SegmentGroupPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="segment-group-root-provider"
    />
  );
}

function SegmentGroupLabel(props: ComponentProps<typeof SegmentGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="segment-group-label"
    />
  );
}

function SegmentGroupItem(props: ComponentProps<typeof SegmentGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="segment-group-item"
    />
  );
}

function SegmentGroupItemText(props: ComponentProps<typeof SegmentGroupPrimitive.ItemText>) {
  return <SegmentGroupPrimitive.ItemText {...props} data-slot="segment-group-item-text" />;
}

function SegmentGroupIndicator(props: ComponentProps<typeof SegmentGroupPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="segment-group-indicator"
    />
  );
}

const SegmentGroupContext = SegmentGroupPrimitive.Context;
const SegmentGroupItemContext = SegmentGroupPrimitive.ItemContext;
const SegmentGroupItemHiddenInput = SegmentGroupPrimitive.ItemHiddenInput;

function SegmentGroupItems(props: SegmentGroupItemsProps) {
  return (
    <For each={props.items}>
      {(item) => {
        const option: SegmentGroupItemOption =
          typeof item === 'string' ? { value: item, label: item } : item;
        return (
          <SegmentGroupItem value={option.value} disabled={option.disabled}>
            <SegmentGroupItemText>{option.label}</SegmentGroupItemText>
            <SegmentGroupItemHiddenInput />
          </SegmentGroupItem>
        );
      }}
    </For>
  );
}

export {
  SegmentGroup,
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
};
export type {
  SegmentGroupItemOption,
  SegmentGroupItemsProps,
  SegmentGroupRootProps,
  SegmentGroupRootProviderProps,
  SegmentGroupSize,
};