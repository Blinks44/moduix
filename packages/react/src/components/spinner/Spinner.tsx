import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Spinner.module.css';

type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
      className={clsx(styles.root, className)}
    >
      {asChild ? (
        children
      ) : (
        <span
          data-scope="spinner"
          data-part="indicator"
          data-slot="spinner-indicator"
          className={styles.indicator}
          aria-hidden="true"
        >
          {children ?? (
            <span
              data-scope="spinner"
              data-part="ring"
              data-slot="spinner-ring"
              className={styles.ring}
            />
          )}
        </span>
      )}
    </ark.span>
  );
});

export { Spinner };
export type { SpinnerRootProps, SpinnerSize };