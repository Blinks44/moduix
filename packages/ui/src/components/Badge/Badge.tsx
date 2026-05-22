import clsx from 'clsx';
import * as React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeProps = React.ComponentProps<'span'> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant = 'default', size = 'md', children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="badge-root"
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    >
      {children}
    </span>
  );
});

type BadgeDotProps = React.ComponentProps<'span'>;

const BadgeDot = React.forwardRef<HTMLSpanElement, BadgeDotProps>(function BadgeDot(
  { className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="badge-dot"
      aria-hidden="true"
      className={clsx(styles.dot, className)}
      {...props}
    />
  );
});

export { Badge, BadgeDot };
export type { BadgeProps, BadgeDotProps, BadgeVariant, BadgeSize };