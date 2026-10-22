import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Skeleton.module.css';

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
      className={clsx(styles.root, className)}
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