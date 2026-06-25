import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
export type ButtonRootProps = HTMLArkProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  'data-slot'?: string;
};

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(function ButtonRoot(
  {
    asChild,
    className,
    disabled,
    size = 'md',
    type,
    'data-slot': dataSlot,
    variant = 'default',
    'aria-disabled': ariaDisabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || ariaDisabled === true || ariaDisabled === 'true';

  return (
    <ark.button
      ref={ref}
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      disabled={disabled}
      aria-disabled={ariaDisabled}
      {...props}
      data-scope="button"
      data-part="root"
      data-slot={dataSlot ?? 'button-root'}
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled ? '' : undefined}
      className={clsx(styles.root, normalizeClassName(className))}
    />
  );
});

const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export { Button };