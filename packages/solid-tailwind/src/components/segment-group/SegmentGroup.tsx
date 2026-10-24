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
      class={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-disabled data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]',
        local.class,
      )}
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
      class={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-disabled data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]',
        local.class,
      )}
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
        'inline-flex min-h-[calc(var(--_segment-group-size)-2*var(--moduix-spacing-1)-2*var(--moduix-border-width-sm))] cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-[color] duration-normal ease-in-out select-none group-data-[size=lg]/segment-group:px-4 group-data-[size=lg]/segment-group:text-md group-data-[size=sm]/segment-group:px-3 data-disabled:cursor-default group-not-data-disabled/segment-group:data-disabled:opacity-disabled data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:text-foreground',
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