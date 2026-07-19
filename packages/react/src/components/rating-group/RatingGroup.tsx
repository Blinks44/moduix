import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/react/rating-group';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
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
>(function RatingGroupRoot({ asChild, children, className, size = 'md', ...props }, ref) {
  return (
    <RatingGroupPrimitive.Root
      ref={ref}
      asChild={asChild}
      data-slot="rating-group-root"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </RatingGroupPrimitive.Root>
  );
});

const RatingGroupRootProvider = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.RootProvider>,
  RatingGroupRootProviderProps
>(function RatingGroupRootProvider({ asChild, children, className, size = 'md', ...props }, ref) {
  return (
    <RatingGroupPrimitive.RootProvider
      ref={ref}
      asChild={asChild}
      data-slot="rating-group-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </RatingGroupPrimitive.RootProvider>
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

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <RatingGroupPrimitive.HiddenInput data-slot="rating-group-hidden-input" />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
}

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