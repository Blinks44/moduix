import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SkeletonProps = HTMLArkProps<'div'> & {
  loading?: boolean;
  variant?: 'pulse' | 'none';
  width?: number | string;
  height?: number | string;
  boxSize?: number | string;
  borderRadius?: number | string;
};

const toCssValue = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

const Skeleton = forwardRef<ComponentRef<typeof ark.div>, SkeletonProps>(function Skeleton(
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
      {...props}
      ref={ref}
      asChild={asChild}
      data-scope="skeleton"
      data-part="root"
      data-slot="skeleton-root"
      data-state={loading ? 'loading' : 'loaded'}
      data-loading={loading ? '' : undefined}
      data-variant={variant}
      aria-hidden={ariaHidden ?? (loading ? true : undefined)}
      className={cn(
        'block w-full overflow-hidden rounded-md',
        loading &&
          cn(
            'pointer-events-none h-4 bg-muted-foreground/18 text-transparent select-none before:invisible after:invisible [&_*]:invisible',
            variant === 'none'
              ? 'animate-none'
              : 'animate-[moduix-pulse_2.5s_ease-in-out_infinite]',
            'motion-reduce:animate-none',
          ),
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