import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant;
};
type BadgeDotProps = ComponentPropsWithoutRef<'span'>;

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge-root"
      data-variant={variant}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

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
export type { BadgeVariant, BadgeProps, BadgeDotProps };