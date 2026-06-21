import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Skeleton.module.css';

function toCssValue(value: number | string | undefined) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
}

export type SkeletonVariant = 'pulse' | 'none';

export type SkeletonRootProps = HTMLArkProps<'div'> & {
  loading?: boolean;
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  boxSize?: number | string;
  borderRadius?: number | string;
};

const SkeletonRoot = forwardRef<HTMLDivElement, SkeletonRootProps>(function SkeletonRoot(
  {
    'aria-hidden': ariaHidden,
    asChild,
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
      ref={ref}
      asChild={asChild}
      data-scope="skeleton"
      data-part="root"
      data-slot="skeleton-root"
      data-state={loading ? 'loading' : 'loaded'}
      data-loading={loading ? '' : undefined}
      data-variant={variant}
      aria-hidden={ariaHidden ?? (loading ? true : undefined)}
      className={clsx(styles.root, normalizeClassName(className))}
      style={{
        width: toCssValue(width ?? boxSize),
        height: toCssValue(height ?? boxSize),
        borderRadius: toCssValue(borderRadius),
        ...style,
      }}
      {...props}
    />
  );
});

const Skeleton = Object.assign(SkeletonRoot, {
  Root: SkeletonRoot,
});

export { Skeleton };