import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
export type BadgeRootProps = HTMLArkProps<'span'> & {
  variant?: BadgeVariant;
};
export type BadgeDotProps = HTMLArkProps<'span'>;

const BadgeRoot = forwardRef<HTMLSpanElement, BadgeRootProps>(function BadgeRoot(
  { className, variant = 'default', ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      data-scope="badge"
      data-part="root"
      data-slot="badge-root"
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const BadgeDot = forwardRef<HTMLSpanElement, BadgeDotProps>(function BadgeDot(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      data-scope="badge"
      data-part="dot"
      data-slot="badge-dot"
      aria-hidden="true"
      className={clsx(styles.dot, normalizeClassName(className))}
      {...props}
    />
  );
});

const Badge = Object.assign(BadgeRoot, {
  Root: BadgeRoot,
  Dot: BadgeDot,
});

export { Badge };