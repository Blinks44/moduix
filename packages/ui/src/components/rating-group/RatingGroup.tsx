import type { ComponentProps, ComponentRef } from 'react';
import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/react/rating-group';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { RatingStarIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
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
      data-slot="rating-group-root"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="rating-group-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="rating-group-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="rating-group-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="rating-group-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const RatingGroupItemIndicator = forwardRef<HTMLSpanElement, RatingGroupItemIndicatorProps>(
  function RatingGroupItemIndicator({ className, children, ...props }, ref) {
    const { half, highlighted } = useRatingGroupItemContext();

    return (
      <span
        ref={ref}
        data-slot="rating-group-item-indicator"
        data-half={half ? '' : undefined}
        data-highlighted={highlighted ? '' : undefined}
        className={clsx(styles.itemIndicator, normalizeClassName(className))}
        {...props}
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

const RatingGroupHiddenInput = RatingGroupPrimitive.HiddenInput;
const RatingGroupContext = RatingGroupPrimitive.Context;
const RatingGroupItemContext = RatingGroupPrimitive.ItemContext;

const RatingGroup = Object.assign(RatingGroupRoot, {
  Root: RatingGroupRoot,
  RootProvider: RatingGroupRootProvider,
  Label: RatingGroupLabel,
  Control: RatingGroupControl,
  Item: RatingGroupItem,
  ItemIndicator: RatingGroupItemIndicator,
  HiddenInput: RatingGroupHiddenInput,
  Context: RatingGroupContext,
  ItemContext: RatingGroupItemContext,
});

export { RatingGroup, useRatingGroup, useRatingGroupContext, useRatingGroupItemContext };
export type { RatingGroupItemIndicatorProps, RatingGroupRootProps, RatingGroupRootProviderProps };
export type {
  RatingGroupContextProps,
  RatingGroupControlBaseProps,
  RatingGroupControlProps,
  RatingGroupHiddenInputBaseProps,
  RatingGroupHiddenInputProps,
  RatingGroupHoverChangeDetails,
  RatingGroupItemBaseProps,
  RatingGroupItemContextProps,
  RatingGroupItemProps,
  RatingGroupLabelBaseProps,
  RatingGroupLabelProps,
  RatingGroupRootBaseProps,
  RatingGroupValueChangeDetails,
  UseRatingGroupContext,
  UseRatingGroupItemContext,
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from '@ark-ui/react/rating-group';