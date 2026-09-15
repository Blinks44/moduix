import { useFieldContext } from '@ark-ui/solid/field';
import { useFieldsetContext } from '@ark-ui/solid/fieldset';
import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@ark-ui/solid/segment-group';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { For, splitProps } from 'solid-js';
import styles from './SegmentGroup.module.css';

type SegmentGroupMachineProps = NonNullable<Parameters<typeof useSegmentGroupPrimitive>[0]>;
type SegmentGroupOption = {
  value: string;
  label: JSX.Element;
  disabled?: boolean;
};

function omitUndefined<T extends object>(props: T) {
  return Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)) as T;
}

function useSegmentGroup(props?: SegmentGroupMachineProps) {
  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return useSegmentGroupPrimitive(() => {
    const machineProps = typeof props === 'function' ? props() : props;

    return omitUndefined({
      disabled: field?.()?.disabled ?? fieldset?.()?.disabled,
      invalid: field?.()?.invalid ?? fieldset?.()?.invalid,
      readOnly: field?.()?.readOnly,
      required: field?.()?.required,
      ...omitUndefined(machineProps ?? {}),
    });
  });
}

function SegmentGroupRoot(props: ComponentProps<typeof SegmentGroupPrimitive.Root>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ]);

  const segmentGroup = useSegmentGroup(() =>
    omitUndefined({
      defaultValue: local.defaultValue,
      disabled: local.disabled,
      form: local.form,
      id: local.id,
      ids: local.ids,
      invalid: local.invalid,
      name: local.name,
      onValueChange: local.onValueChange,
      orientation: local.orientation ?? 'horizontal',
      readOnly: local.readOnly,
      required: local.required,
      value: local.value,
    }),
  );

  return (
    <SegmentGroupPrimitive.RootProvider
      asChild={local.asChild}
      value={segmentGroup}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="segment-group-root"
    >
      {local.children}
    </SegmentGroupPrimitive.RootProvider>
  );
}

function SegmentGroupRootProvider(
  props: ComponentProps<typeof SegmentGroupPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <SegmentGroupPrimitive.RootProvider
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="segment-group-root-provider"
    />
  );
}

function SegmentGroupLabel(props: ComponentProps<typeof SegmentGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <SegmentGroupPrimitive.Label
      asChild={local.asChild}
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="segment-group-label"
    />
  );
}

function SegmentGroupItem(props: ComponentProps<typeof SegmentGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <SegmentGroupPrimitive.Item
      asChild={local.asChild}
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="segment-group-item"
    >
      {local.children}
    </SegmentGroupPrimitive.Item>
  );
}

function SegmentGroupItemControl(props: ComponentProps<typeof SegmentGroupPrimitive.ItemControl>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <SegmentGroupPrimitive.ItemControl
      asChild={local.asChild}
      class={clsx(styles.itemControl, local.class)}
      {...others}
      data-slot="segment-group-item-control"
    />
  );
}

function SegmentGroupItemText(props: ComponentProps<typeof SegmentGroupPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <SegmentGroupPrimitive.ItemText
      asChild={local.asChild}
      class={clsx(styles.itemText, local.class)}
      {...others}
      data-slot="segment-group-item-text"
    />
  );
}

function SegmentGroupIndicator(props: ComponentProps<typeof SegmentGroupPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <SegmentGroupPrimitive.Indicator
      asChild={local.asChild}
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="segment-group-indicator"
    />
  );
}

function SegmentGroupItems(props: { items: readonly SegmentGroupOption[] }) {
  return (
    <For each={props.items}>
      {(item) => (
        <SegmentGroupItem value={item.value} disabled={item.disabled}>
          <SegmentGroupItemText>{item.label}</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupPrimitive.ItemHiddenInput />
        </SegmentGroupItem>
      )}
    </For>
  );
}

const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  RootProvider: SegmentGroupRootProvider,
  Context: SegmentGroupPrimitive.Context,
  ItemContext: SegmentGroupPrimitive.ItemContext,
  Label: SegmentGroupLabel,
  Item: SegmentGroupItem,
  ItemHiddenInput: SegmentGroupPrimitive.ItemHiddenInput,
  ItemControl: SegmentGroupItemControl,
  ItemText: SegmentGroupItemText,
  Indicator: SegmentGroupIndicator,
  Items: SegmentGroupItems,
});

export { SegmentGroup, useSegmentGroup, useSegmentGroupContext, useSegmentGroupItemContext };