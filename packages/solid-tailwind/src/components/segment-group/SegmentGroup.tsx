import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
  type UseSegmentGroupProps,
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

function useSegmentGroup(props?: SegmentGroupMachineProps) {
  return useSegmentGroupPrimitive(() => {
    const machineProps: UseSegmentGroupProps =
      (typeof props === 'function' ? props() : props) ?? {};
    return { ...machineProps, orientation: machineProps.orientation ?? 'horizontal' };
  });
}

function SegmentGroup(props: ComponentProps<typeof SegmentGroupPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.Root
      orientation="horizontal"
      class={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        local.class,
      )}
      {...others}
      data-slot="segment-group-root"
    />
  );
}

function SegmentGroupRootProvider(
  props: ComponentProps<typeof SegmentGroupPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.RootProvider
      class={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        local.class,
      )}
      {...others}
      data-slot="segment-group-root-provider"
    />
  );
}

function SegmentGroupLabel(props: ComponentProps<typeof SegmentGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.Label
      class={cn('text-sm leading-5 font-semibold', local.class)}
      {...others}
      data-slot="segment-group-label"
    />
  );
}

function SegmentGroupItem(props: ComponentProps<typeof SegmentGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SegmentGroupPrimitive.Item
      class={cn(
        'inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground transition-[color] duration-normal ease-in-out select-none data-disabled:cursor-default group-not-data-disabled/segment-group:data-disabled:opacity-50 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:text-foreground',
        local.class,
      )}
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
      class={cn(
        'pointer-events-none top-[var(--top)] left-[var(--left)] -z-1 h-[var(--height)] w-[var(--width)] rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)]',
        local.class,
      )}
      {...others}
      data-slot="segment-group-indicator"
    />
  );
}

const SegmentGroupContext = SegmentGroupPrimitive.Context;
const SegmentGroupItemContext = SegmentGroupPrimitive.ItemContext;
const SegmentGroupItemHiddenInput = SegmentGroupPrimitive.ItemHiddenInput;

function SegmentGroupItems(props: { items: readonly SegmentGroupOption[] }) {
  return (
    <For each={props.items}>
      {(item) => (
        <SegmentGroupItem value={item.value} disabled={item.disabled}>
          <SegmentGroupItemText>{item.label}</SegmentGroupItemText>
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      )}
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