import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import styles from './Badge.module.css';

type BadgeRootProps = HTMLArkProps<'span'> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
};

const BadgeLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function BadgeLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        {...props}
        data-scope="badge"
        data-part="label"
        data-slot="badge-label"
        className={clsx(styles.label, className)}
      />
    );
  },
);

const BadgeRoot = forwardRef<ComponentRef<typeof ark.span>, BadgeRootProps>(function BadgeRoot(
  { className, variant = 'default', ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="badge"
      data-part="root"
      data-slot="badge-root"
      data-variant={variant}
      className={clsx(styles.root, className)}
    />
  );
});

const BadgeDot = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(function BadgeDot(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="badge"
      data-part="dot"
      data-slot="badge-dot"
      aria-hidden="true"
      className={clsx(styles.dot, className)}
    />
  );
});

const Badge = Object.assign(BadgeRoot, {
  Root: BadgeRoot,
  Label: BadgeLabel,
  Dot: BadgeDot,
});

export { Badge };