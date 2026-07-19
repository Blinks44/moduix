import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Spinner.module.css';

type SpinnerProps = HTMLArkProps<'span'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
      role={decorative ? 'presentation' : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={accessibleLabel}
      aria-labelledby={decorative ? undefined : ariaLabelledBy}
      className={clsx(styles.root, normalizeClassName(className))}
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

const Spinner = Object.assign(SpinnerRoot, {
  Root: SpinnerRoot,
});

export { Spinner };