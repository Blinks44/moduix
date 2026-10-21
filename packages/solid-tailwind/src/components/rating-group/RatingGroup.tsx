import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/solid/rating-group';
import type { ComponentProps, JSX } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
import { cn } from '@/lib/moduix/cn';
import { RatingStarIcon } from '@/lib/moduix/icons/ui';

type RatingGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RatingGroupRootProps = ComponentProps<typeof RatingGroupPrimitive.Root> & {
  size?: RatingGroupSize;
};

type RatingGroupRootProviderProps = ComponentProps<typeof RatingGroupPrimitive.RootProvider> & {
  size?: RatingGroupSize;
};

type RatingGroupItemIndicatorProps = ComponentProps<'span'>;

function RatingGroup(props: RatingGroupRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <RatingGroupPrimitive.Root
      class={cn('group/rating-group inline-flex flex-col gap-1', local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="rating-group-root"
    />
  );
}

function RatingGroupRootProvider(props: RatingGroupRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <RatingGroupPrimitive.RootProvider
      class={cn('group/rating-group inline-flex flex-col gap-1', local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="rating-group-root-provider"
    />
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
  const [local, others] = splitProps(props, ['class', 'onPointerDown']);

  return (
    <RatingGroupPrimitive.Item
      class={cn(
        'inline-flex cursor-pointer rounded-sm outline-1 -outline-offset-1 outline-transparent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring data-disabled:cursor-default data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      onPointerDown={(event) => {
        callEventHandler(local.onPointerDown, event);

        if (event.button !== 0) return;
        if (event.currentTarget.matches('[data-disabled], [data-readonly]')) return;

        event.currentTarget.focus({ preventScroll: true, focusVisible: false });
      }}
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
        'relative inline-flex size-5 items-center justify-center text-primary group-data-[size=lg]/rating-group:size-6 group-data-[size=sm]/rating-group:size-4 group-data-[size=xl]/rating-group:size-7 group-data-[size=xs]/rating-group:size-3.5 [&>svg]:size-full [&>svg]:flex-none [&>svg]:transition-[color,fill,clip-path] [&>svg]:duration-normal [&>svg]:ease-in-out',
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
            class="absolute inset-0 fill-transparent stroke-current text-muted-foreground"
          />
          <RatingStarIcon
            data-slot="rating-group-item-indicator-fg"
            class={cn(
              'absolute inset-0 fill-current stroke-current [clip-path:inset(0)]',
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

const RatingGroupContext = RatingGroupPrimitive.Context;
const RatingGroupHiddenInput = RatingGroupPrimitive.HiddenInput;
const RatingGroupItemContext = RatingGroupPrimitive.ItemContext;

export {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemContext,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
};
export type {
  RatingGroupItemIndicatorProps,
  RatingGroupRootProps,
  RatingGroupRootProviderProps,
  RatingGroupSize,
};