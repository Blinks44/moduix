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
  const hasStringLabel = typeof label === 'string';
  const shouldRenderHiddenLabel = !decorative && !hasStringLabel;

  return (
    <span
      data-slot="spinner-root"
      data-variant={variant}
      data-size={size}
      data-custom-icon={hasCustomIcon ? '' : undefined}
      data-animated={animated ? '' : undefined}
      role={decorative ? 'presentation' : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative && hasStringLabel ? label : undefined}
      className={clsx(styles.root, className)}
      {...props}
    >
      <span data-slot="spinner-indicator" className={styles.indicator} aria-hidden="true">
        {hasCustomIcon ? icon : <SpinnerGlyph variant={variant} />}
      </span>
      {shouldRenderHiddenLabel ? (
        <span data-slot="spinner-label" className={styles.label}>
          {label}
        </span>
      ) : null}
    </span>
  );
}

function SpinnerGlyph({ variant }: { variant: SpinnerVariant }) {
  if (variant === 'dots') {
    return (
      <React.Fragment>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </React.Fragment>
    );
  }

  if (variant === 'bars') {
    return (
      <React.Fragment>
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </React.Fragment>
    );
  }

  if (variant === 'pulse') {
    return <span className={styles.pulse} />;
  }

  return <span className={styles.ring} />;
}

export { Spinner };
export type { SpinnerProps, SpinnerVariant, SpinnerSize };