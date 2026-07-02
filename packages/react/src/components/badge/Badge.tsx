import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Badge.module.css';

type BadgeRootProps = ComponentProps<typeof ark.span> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
};

const BadgeRoot = forwardRef<ComponentRef<typeof ark.span>, BadgeRootProps>(function BadgeRoot(
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

const BadgeDot = forwardRef<ComponentRef<typeof ark.span>, ComponentProps<typeof ark.span>>(
  function BadgeDot({ className, ...props }, ref) {
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
  },
);

const Badge = Object.assign(BadgeRoot, {
  Root: BadgeRoot,
  Dot: BadgeDot,
});

export { Badge };