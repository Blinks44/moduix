import { useFieldContext } from '@ark-ui/solid/field';
import { useFieldsetContext } from '@ark-ui/solid/fieldset';
import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
  type UseSegmentGroupProps,
} from '@ark-ui/solid/segment-group';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { For, mergeProps, splitProps } from 'solid-js';
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

    return omitUndefined(
      mergeProps(
        {
          orientation: 'horizontal',
          disabled: field?.()?.disabled ?? fieldset?.()?.disabled,
          invalid: field?.()?.invalid ?? fieldset?.()?.invalid,
          readOnly: field?.()?.readOnly,
          required: field?.()?.required,
        } satisfies UseSegmentGroupProps,
        machineProps ?? {},
      ),
    );
  });
}

function SegmentGroup(props: ComponentProps<typeof SegmentGroupPrimitive.Root>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'disabled',
    'invalid',
    'orientation',
    'readOnly',
    'required',
  ]);

  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return (
    <SegmentGroupPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...omitUndefined({
        ...others,
        orientation: local.orientation ?? 'horizontal',
        disabled: local.disabled ?? field?.()?.disabled ?? fieldset?.()?.disabled,
        invalid: local.invalid ?? field?.()?.invalid ?? fieldset?.()?.invalid,
        readOnly: local.readOnly ?? field?.()?.readOnly,
        required: local.required ?? field?.()?.required,
      })}
      data-slot="segment-group-root"
    >
      {local.children}
    </SegmentGroupPrimitive.Root>
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

const SegmentGroupContext = SegmentGroupPrimitive.Context;
const SegmentGroupItemContext = SegmentGroupPrimitive.ItemContext;
const SegmentGroupItemHiddenInput = SegmentGroupPrimitive.ItemHiddenInput;

export {
  SegmentGroup,
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
};