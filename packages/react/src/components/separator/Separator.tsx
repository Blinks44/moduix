import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Separator.module.css';

type SeparatorProps = HTMLArkProps<'span'> & {
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'dashed' | 'dotted';
};

const SeparatorRoot = forwardRef<HTMLSpanElement, SeparatorProps>(function SeparatorRoot(
  {
    asChild,
    className,
    orientation = 'horizontal',
    role,
    size = 'sm',
    variant = 'solid',
    'aria-orientation': ariaOrientation,
    ...props
  },
  ref,
) {
  const resolvedRole = role ?? 'separator';

  return (
    <ark.span
      ref={ref}
      asChild={asChild}
      role={resolvedRole}
      aria-orientation={ariaOrientation ?? (resolvedRole === 'separator' ? orientation : undefined)}
      data-scope="separator"
      data-part="root"
      data-slot="separator-root"
      data-orientation={orientation}
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const Separator = Object.assign(SeparatorRoot, {
  Root: SeparatorRoot,
});

export { Separator };