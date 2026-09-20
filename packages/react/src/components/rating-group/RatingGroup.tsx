'use client';

import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/react/rating-group';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { RatingStarIcon } from '@/lib/moduix/icons/ui';
import styles from './RatingGroup.module.css';

type RatingGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RatingGroupRootProps = ComponentProps<typeof RatingGroupPrimitive.Root> & {
  size?: RatingGroupSize;
};

type RatingGroupRootProviderProps = ComponentProps<typeof RatingGroupPrimitive.RootProvider> & {
  size?: RatingGroupSize;
};

type RatingGroupItemIndicatorProps = ComponentProps<'span'>;

const RatingGroupRoot = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.Root>,
  RatingGroupRootProps
>(function RatingGroupRoot({ className, size = 'md', ...props }, ref) {
  return (
    <RatingGroupPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-size={size}
      data-slot="rating-group-root"
    />
  );
});

const RatingGroupRootProvider = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.RootProvider>,
  RatingGroupRootProviderProps
>(function RatingGroupRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <RatingGroupPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-size={size}
      data-slot="rating-group-root-provider"
    />
  );
});

const RatingGroupLabel = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.Label>,
  ComponentProps<typeof RatingGroupPrimitive.Label>
>(function RatingGroupLabel({ className, ...props }, ref) {
  return (
    <RatingGroupPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="rating-group-label"
    />
  );
});

const RatingGroupControl = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.Control>,
  ComponentProps<typeof RatingGroupPrimitive.Control>
>(function RatingGroupControl({ className, ...props }, ref) {
  return (
    <RatingGroupPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="rating-group-control"
    />
  );
});

const RatingGroupItem = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.Item>,
  ComponentProps<typeof RatingGroupPrimitive.Item>
>(function RatingGroupItem({ className, ...props }, ref) {
  return (
    <RatingGroupPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
      data-slot="rating-group-item"
    />
  );
});

const RatingGroupItemIndicator = forwardRef<HTMLSpanElement, RatingGroupItemIndicatorProps>(
  function RatingGroupItemIndicator({ className, children, ...props }, ref) {
    const { half, highlighted } = useRatingGroupItemContext();

    return (
      <span
        ref={ref}
        className={clsx(styles.itemIndicator, className)}
        {...props}
        data-half={half ? '' : undefined}
        data-highlighted={highlighted ? '' : undefined}
        data-slot="rating-group-item-indicator"
      >
        {children ?? (
          <>
            <RatingStarIcon data-slot="rating-group-item-indicator-bg" className={styles.iconBg} />
            <RatingStarIcon data-slot="rating-group-item-indicator-fg" className={styles.iconFg} />
          </>
        )}
      </span>
    );
  },
);

function RatingGroupItems({ children }: { children?: ReactNode }) {
  return (
    <>
      <RatingGroupPrimitive.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroupItem key={item} index={item}>
              {children ?? <RatingGroupItemIndicator />}
            </RatingGroupItem>
          ))
        }
      </RatingGroupPrimitive.Context>
    </>
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