'use client';

import {
  RatingGroup as RatingGroupPrimitive,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '@ark-ui/react/rating-group';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
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

const RatingGroupRoot = forwardRef<
  ComponentRef<typeof RatingGroupPrimitive.Root>,
  RatingGroupRootProps
>(function RatingGroupRoot({ className, size = 'md', ...props }, ref) {
  return (
    <RatingGroupPrimitive.Root
      ref={ref}
      data-size={size}
      className={cn(
        'group/rating-group inline-flex flex-col gap-1 text-muted-foreground',
        className,
      )}
      {...props}
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
      className={cn(
        'group/rating-group inline-flex flex-col gap-1 text-muted-foreground',
        className,
      )}
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
      className={cn(
        'text-sm leading-5 font-semibold text-foreground select-none data-disabled:opacity-50',
        className,
      )}
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
      className={cn('inline-flex items-center gap-1 data-disabled:opacity-50', className)}
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
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-sm leading-none text-inherit outline-1 -outline-offset-1 outline-transparent transition-[color,opacity] duration-200 ease-in-out data-disabled:pointer-events-none data-disabled:cursor-default data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-readonly:cursor-default',
        className,
      )}
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
        className={cn(
          'relative inline-flex size-5 items-center justify-center text-primary group-data-[size=lg]/rating-group:size-6 group-data-[size=sm]/rating-group:size-4 group-data-[size=xl]/rating-group:size-7 group-data-[size=xs]/rating-group:size-3.5 [&>svg]:size-full [&>svg]:flex-none [&>svg]:transition-[color,fill,stroke,clip-path] [&>svg]:duration-200 [&>svg]:ease-in-out',
          className,
        )}
        {...props}
        data-half={half ? '' : undefined}
        data-highlighted={highlighted ? '' : undefined}
        data-slot="rating-group-item-indicator"
      >
        {children ?? (
          <>
            <RatingStarIcon
              data-slot="rating-group-item-indicator-bg"
              className="absolute inset-0 size-full flex-none fill-transparent stroke-current text-muted-foreground"
            />
            <RatingStarIcon
              data-slot="rating-group-item-indicator-fg"
              className={cn(
                'absolute inset-0 size-full flex-none fill-current stroke-current text-primary [clip-path:inset(0_0_0_0)]',
                half && '[clip-path:inset(0_50%_0_0)] rtl:[clip-path:inset(0_0_0_50%)]',
                !highlighted && '[clip-path:inset(0_100%_0_0)]',
              )}
            />
          </>
        )}
      </span>
    );
  },
);

function RatingGroupItems({ children }: { children?: ReactNode }) {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroupItem key={item} index={item}>
            {children ?? <RatingGroupItemIndicator />}
          </RatingGroupItem>
        ))
      }
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