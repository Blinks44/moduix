import clsx from 'clsx';
import * as React from 'react';
import styles from './Spinner.module.css';

function Spinner({
  className,
  size = 'md',
  decorative = false,
  children,
  ...props
}: React.ComponentProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
}) {
  const ariaLabel = decorative ? undefined : (props['aria-label'] ?? 'Loading');

  return (
    <span
      {...props}
      data-slot="spinner-root"
      data-size={size}
      role={decorative ? 'presentation' : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={ariaLabel}
      className={clsx(styles.root, className)}
    >
      <span data-slot="spinner-indicator" className={styles.indicator} aria-hidden="true">
        {children ?? <span className={styles.ring} />}
      </span>
    </span>
  );
}

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export { Spinner };