import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

function Badge({
  className,
  variant = 'default',
  ...props
}: ComponentPropsWithoutRef<'span'> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
}) {
  return (
    <span
      data-slot="badge-root"
      data-variant={variant}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function BadgeDot({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
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