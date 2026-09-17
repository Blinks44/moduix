import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/solid/rating-group';
import type { ComponentProps, JSX } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { RatingStarIcon } from '@/lib/moduix/icons/ui/Icons';

type RatingGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RatingGroupRootProps = ComponentProps<typeof RatingGroupPrimitive.Root> & {
  size?: RatingGroupSize;
};

type RatingGroupRootProviderProps = ComponentProps<typeof RatingGroupPrimitive.RootProvider> & {
  size?: RatingGroupSize;
};

type RatingGroupItemIndicatorProps = ComponentProps<'span'>;

function RatingGroupRoot(props: RatingGroupRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <RatingGroupPrimitive.Root
      asChild={local.asChild}
      data-size={local.size ?? 'md'}
      class={cn('group/rating-group inline-flex flex-col gap-1 text-muted-foreground', local.class)}
      {...others}
      data-slot="rating-group-root"
    >
      {local.children}
    </RatingGroupPrimitive.Root>
  );
}

function RatingGroupRootProvider(props: RatingGroupRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <RatingGroupPrimitive.RootProvider
      asChild={local.asChild}
      class={cn('group/rating-group inline-flex flex-col gap-1 text-muted-foreground', local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="rating-group-root-provider"
    >
      {local.children}
    </RatingGroupPrimitive.RootProvider>
  );
}

function RatingGroupLabel(props: ComponentProps<typeof RatingGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RatingGroupPrimitive.Label
      class={cn(
        'text-sm leading-5 font-semibold text-foreground select-none data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="rating-group-label"
    />
  );
}

function RatingGroupControl(props: ComponentProps<typeof RatingGroupPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RatingGroupPrimitive.Control
      class={cn('inline-flex items-center gap-1 data-disabled:opacity-50', local.class)}
      {...others}
      data-slot="rating-group-control"
    />
  );
}

function RatingGroupItem(props: ComponentProps<typeof RatingGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RatingGroupPrimitive.Item
      class={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-sm leading-none text-inherit outline-1 -outline-offset-1 outline-transparent transition-[color,opacity] duration-200 ease-in-out data-disabled:pointer-events-none data-disabled:cursor-default data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      data-slot="rating-group-item"
    />
  );
}

function RatingGroupItemIndicator(props: RatingGroupItemIndicatorProps) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);
  const item = useRatingGroupItemContext();

  return (
    <span
      class={cn(
        'relative inline-flex size-5 items-center justify-center text-primary group-data-[size=lg]/rating-group:size-6 group-data-[size=sm]/rating-group:size-4 group-data-[size=xl]/rating-group:size-7 group-data-[size=xs]/rating-group:size-3.5 [&>svg]:size-full [&>svg]:flex-none [&>svg]:transition-[color,fill,stroke,clip-path] [&>svg]:duration-200 [&>svg]:ease-in-out',
        local.class,
      )}
      {...others}
      data-half={item().half ? '' : undefined}
      data-highlighted={item().highlighted ? '' : undefined}
      data-slot="rating-group-item-indicator"
    >
      {resolvedChildren() ?? (
        <>
          <RatingStarIcon
            data-slot="rating-group-item-indicator-bg"
            class="absolute inset-0 size-full flex-none fill-transparent stroke-current text-muted-foreground"
          />
          <RatingStarIcon
            data-slot="rating-group-item-indicator-fg"
            class={cn(
              'absolute inset-0 size-full flex-none fill-current stroke-current text-primary [clip-path:inset(0_0_0_0)]',
              item().half && '[clip-path:inset(0_50%_0_0)] rtl:[clip-path:inset(0_0_0_50%)]',
              !item().highlighted && '[clip-path:inset(0_100%_0_0)]',
            )}
          />
        </>
      )}
    </span>
  );
}

function RatingGroupItems(props: { children?: JSX.Element }) {
  return (
    <RatingGroupPrimitive.Context>
      {(ratingGroup) => (
        <For each={ratingGroup().items}>
          {(item) => (
            <RatingGroupItem index={item}>
              {props.children ?? <RatingGroupItemIndicator />}
            </RatingGroupItem>
          )}
        </For>
      )}
    </RatingGroupPrimitive.Context>
  );
}

const RatingGroup = Object.assign(RatingGroupRoot, {
  Root: RatingGroupRoot,
  RootProvider: RatingGroupRootProvider,
  Context: RatingGroupPrimitive.Context,
  HiddenInput: RatingGroupPrimitive.HiddenInput,
  Label: RatingGroupLabel,
  Control: RatingGroupControl,
  Item: RatingGroupItem,
  ItemContext: RatingGroupPrimitive.ItemContext,
  ItemIndicator: RatingGroupItemIndicator,
  Items: RatingGroupItems,
});

export { RatingGroup, useRatingGroup, useRatingGroupContext, useRatingGroupItemContext };
export type {
  RatingGroupItemIndicatorProps,
  RatingGroupRootProps,
  RatingGroupRootProviderProps,
  RatingGroupSize,
};