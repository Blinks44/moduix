import clsx from 'clsx';
import * as React from 'react';
import styles from './Spinner.module.css';

type SpinnerVariant = 'ring' | 'dots' | 'bars' | 'pulse';
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpinnerProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  decorative?: boolean;
  animated?: boolean;
};

function Spinner({
  className,
  variant = 'ring',
  size = 'md',
  icon,
  label = 'Loading',
  decorative = false,
  animated = true,
  ...props
}: SpinnerProps) {
  const hasCustomIcon = icon !== undefined;
  const isStringLabel = typeof label === 'string';
  const ariaLabel = !decorative && isStringLabel ? label : undefined;
  const hiddenLabel = !decorative && !isStringLabel ? label : null;

  return (
    <span
      data-slot="spinner-root"
      data-variant={variant}
      data-size={size}
      data-custom-icon={hasCustomIcon ? '' : undefined}
      data-animated={animated ? '' : undefined}
      role={decorative ? 'presentation' : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={ariaLabel}
      className={clsx(styles.root, className)}
      {...props}
    >
      <span data-slot="spinner-indicator" className={styles.indicator} aria-hidden="true">
        {hasCustomIcon ? icon : <SpinnerGlyph variant={variant} />}
      </span>
      {hiddenLabel !== null ? (
        <span data-slot="spinner-label" className={styles.label}>
          {hiddenLabel}
        </span>
      ) : null}
    </span>
  );
}

function SpinnerGlyph({ variant }: { variant: SpinnerVariant }) {
  switch (variant) {
    case 'dots':
      return (
        <>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </>
      );
    case 'bars':
      return (
        <>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </>
      );
    case 'pulse':
      return <span className={styles.pulse} />;
    default:
      return <span className={styles.ring} />;
  }
}

export { Spinner };
export type { SpinnerProps, SpinnerVariant, SpinnerSize };