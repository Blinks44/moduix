'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const spinnerVariants = cva('inline-flex shrink-0 items-center justify-center align-middle', {
  variants: {
    size: {
      inherit: 'size-[1em]',
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-7',
      xl: 'size-control-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SpinnerProps = HTMLArkProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

const SpinnerRoot = forwardRef<HTMLSpanElement, SpinnerProps>(function SpinnerRoot(
  {
    asChild,
    children,
    className,
    decorative = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    size = 'md',
    ...props
  },
  ref,
) {
  const accessibleLabel = decorative
    ? undefined
    : (ariaLabel ?? (ariaLabelledBy ? undefined : 'Loading'));

  return (
    <ark.span
      ref={ref}
      asChild={asChild}
      {...props}
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={size}
      role={decorative && !asChild ? 'presentation' : decorative ? undefined : 'status'}
      aria-hidden={decorative && !asChild ? true : undefined}
      aria-label={accessibleLabel}
      aria-labelledby={decorative ? undefined : ariaLabelledBy}
      className={cn(spinnerVariants({ size }), className)}
    >
      {asChild ? (
        children
      ) : (
        <span
          data-scope="spinner"
          data-part="indicator"
          data-slot="spinner-indicator"
          className="inline-flex size-full animate-[var(--moduix-animation-spin)] items-center justify-center motion-reduce:animate-none [&_svg]:size-full"
          aria-hidden="true"
        >
          {children ?? (
            <span
              data-scope="spinner"
              data-part="ring"
              data-slot="spinner-ring"
              className="box-border block size-full rounded-full border-2 border-solid border-current/[22%] [border-block-start-color:currentColor]"
            />
          )}
        </span>
      )}
    </ark.span>
  );
});

const Spinner = Object.assign(SpinnerRoot, {
  Root: SpinnerRoot,
});

export { Spinner };