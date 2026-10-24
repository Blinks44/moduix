import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
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

type SpinnerRootProps = HTMLArkProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

const Spinner = forwardRef<HTMLSpanElement, SpinnerRootProps>(function Spinner(
  {
    'aria-label': ariaLabel,
    asChild,
    children,
    className,
    decorative = false,
    size = 'md',
    ...props
  },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      asChild={asChild}
      {...props}
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={size}
      role={decorative ? undefined : 'status'}
      aria-hidden={decorative || undefined}
      aria-label={
        ariaLabel ?? (decorative || props['aria-labelledby'] ? undefined : a11yLabels.loading)
      }
      className={cn(spinnerVariants({ size }), className)}
    >
      {asChild ? (
        children
      ) : (
        <span
          data-scope="spinner"
          data-part="indicator"
          data-slot="spinner-indicator"
          className="inline-flex size-full animate-(--moduix-animation-spin) items-center justify-center [&_svg]:size-full"
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

export { Spinner };
export type { SpinnerRootProps, SpinnerSize };