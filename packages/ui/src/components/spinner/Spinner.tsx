import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Spinner.module.css';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerRootProps = HTMLArkProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

const SpinnerRoot = forwardRef<HTMLSpanElement, SpinnerRootProps>(function SpinnerRoot(
  {
    asChild,
    className,
    size = 'md',
    decorative = false,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
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
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={size}
      role={decorative ? 'presentation' : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={accessibleLabel}
      aria-labelledby={decorative ? undefined : ariaLabelledBy}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
export type { SpinnerRootProps, SpinnerSize };