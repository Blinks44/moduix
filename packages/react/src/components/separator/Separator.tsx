import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Separator.module.css';

type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

type SeparatorRootProps = HTMLArkProps<'span'> & {
  orientation?: SeparatorOrientation;
  size?: SeparatorSize;
  variant?: SeparatorVariant;
};

const Separator = forwardRef<HTMLSpanElement, SeparatorRootProps>(function Separator(
  {
    className,
    orientation = 'horizontal',
    role,
    size = 'sm',
    variant = 'solid',
    'aria-orientation': _ariaOrientation,
    ...props
  },
  ref,
) {
  const resolvedRole = role ?? 'separator';

  return (
    <ark.span
      {...props}
      ref={ref}
      role={resolvedRole}
      aria-orientation={resolvedRole === 'separator' ? orientation : undefined}
      data-scope="separator"
      data-part="root"
      data-slot="separator-root"
      data-orientation={orientation}
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, className)}
    />
  );
});

export { Separator };
export type { SeparatorOrientation, SeparatorRootProps, SeparatorSize, SeparatorVariant };