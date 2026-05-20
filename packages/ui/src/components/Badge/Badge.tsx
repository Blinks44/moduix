import clsx from 'clsx';
import * as React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeProps = React.ComponentProps<'span'> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge-root"
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    >
      {children}
    </span>
  );
}

type BadgeDotProps = React.ComponentProps<'span'>;

function BadgeDot({ className, ...props }: BadgeDotProps) {
  return (
    <span
      data-slot="badge-dot"
      aria-hidden="true"
      className={clsx(styles.dot, className)}
      {...props}
    />
  );
}

export { Badge, BadgeDot };
export type { BadgeProps, BadgeDotProps, BadgeVariant, BadgeSize };