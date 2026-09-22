import { useFieldContext } from '@ark-ui/solid/field';
import { useFieldsetContext } from '@ark-ui/solid/fieldset';
import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@ark-ui/solid/segment-group';
import type { ComponentProps, JSX } from 'solid-js';
import { For, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

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
      orientation: 'horizontal',
      disabled: field?.()?.disabled ?? fieldset?.()?.disabled,
      invalid: field?.()?.invalid ?? fieldset?.()?.invalid,
      readOnly: field?.()?.readOnly,
      required: field?.()?.required,
      ...omitUndefined(machineProps ?? {}),
    });
  });
}

function SegmentGroup(props: ComponentProps<typeof SegmentGroupPrimitive.Root>) {
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
      class={cn(
        'group/segment-group relative isolate box-border inline-flex max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        local.class,
      )}
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
      class={cn(
        'group/segment-group relative isolate box-border inline-flex max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        local.class,
      )}
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
      class={cn(
        'relative z-1 text-sm leading-5 font-semibold text-inherit select-none',
        local.class,
      )}
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
      class={cn(
        'relative z-1 box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground outline-0 transition-[color,opacity] duration-200 ease-in-out select-none group-data-disabled/segment-group:!opacity-100 data-disabled:cursor-default data-disabled:opacity-50 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&:not([data-readonly]):not([data-disabled]):hover]:text-foreground',
        local.class,
      )}
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
      class={cn('hidden', local.class)}
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
      class={cn('relative z-1', local.class)}
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
      class={cn(
        'pointer-events-none absolute top-[var(--top)] left-[var(--left)] z-0 h-[var(--height)] w-[var(--width)] rounded-md bg-background shadow-sm !duration-200 !ease-in-out',
        local.class,
      )}
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
