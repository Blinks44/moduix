import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/solid/rating-group';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { RatingStarIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './RatingGroup.module.css';

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
      class={clsx(styles.root, local.class)}
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
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
      {...others}
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
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="rating-group-label"
    />
  );
}

function RatingGroupControl(props: ComponentProps<typeof RatingGroupPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RatingGroupPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="rating-group-control"
    />
  );
}

function RatingGroupItem(props: ComponentProps<typeof RatingGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RatingGroupPrimitive.Item
      class={clsx(styles.item, local.class)}
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
      data-half={item().half ? '' : undefined}
      data-highlighted={item().highlighted ? '' : undefined}
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="rating-group-item-indicator"
    >
      {resolvedChildren() ?? (
        <>
          <RatingStarIcon data-slot="rating-group-item-indicator-bg" class={styles.iconBg} />
          <RatingStarIcon data-slot="rating-group-item-indicator-fg" class={styles.iconFg} />
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