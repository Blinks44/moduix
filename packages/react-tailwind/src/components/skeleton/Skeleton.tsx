import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SkeletonVariant = 'pulse' | 'none';

type SkeletonRootProps = HTMLArkProps<'div'> & {
  loading?: boolean;
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  boxSize?: number | string;
  borderRadius?: number | string;
};

const toCssValue = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

const Skeleton = forwardRef<HTMLDivElement, SkeletonRootProps>(function Skeleton(
  {
    'aria-hidden': ariaHidden,
    borderRadius,
    boxSize,
    className,
    height,
    loading = true,
    style,
    variant = 'pulse',
    width,
    ...props
  },
  ref,
) {
  return (
    <ark.div
      {...props}
      ref={ref}
      data-scope="skeleton"
      data-part="root"
      data-slot="skeleton-root"
      data-state={loading ? 'loading' : 'loaded'}
      data-loading={loading ? '' : undefined}
      data-variant={variant}
      aria-hidden={ariaHidden ?? (loading ? true : undefined)}
      className={cn(
        'block w-full rounded-md',
        loading &&
          'pointer-events-none h-4 overflow-hidden bg-[color-mix(in_oklab,var(--color-muted-foreground)_18%,var(--color-background))] text-transparent select-none before:invisible after:invisible [&_*]:invisible',
        loading && variant === 'pulse' && 'animate-(--moduix-animation-pulse)',
        className,
      )}
      style={{
        width: toCssValue(width ?? boxSize),
        height: toCssValue(height ?? boxSize),
        borderRadius: toCssValue(borderRadius),
        ...style,
      }}
    />
  );
});

export { Skeleton };
export type { SkeletonRootProps, SkeletonVariant };