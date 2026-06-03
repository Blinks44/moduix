import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Spinner.module.css';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerProps = ComponentProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

function Spinner({
  className,
  size = 'md',
  decorative = false,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SpinnerProps) {
  const accessibleLabel = decorative
    ? undefined
    : (ariaLabel ?? (ariaLabelledBy ? undefined : 'Loading'));

  return (
    <span
      {...props}
      data-slot="spinner-root"
      data-size={size}
      role={decorative ? 'presentation' : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={accessibleLabel}
      aria-labelledby={decorative ? undefined : ariaLabelledBy}
      className={clsx(styles.root, className)}
    >
      <span data-slot="spinner-indicator" className={styles.indicator} aria-hidden="true">
        {children ?? <span data-slot="spinner-ring" className={styles.ring} />}
      </span>
    </span>
  );
}

export { Spinner };
export type { SpinnerProps, SpinnerSize };