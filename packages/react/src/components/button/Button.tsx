import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Button.module.css';

const ButtonRoot = forwardRef<
  HTMLButtonElement,
  HTMLArkProps<'button'> & {
    loading?: boolean;
    variant?:
      | 'default'
      | 'outline'
      | 'secondary'
      | 'destructive'
      | 'destructive-outline'
      | 'ghost'
      | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
    'data-scope'?: string;
    'data-part'?: string;
    'data-slot'?: string;
  }
>(function ButtonRoot(
  {
    asChild,
    className,
    disabled,
    loading = false,
    size = 'md',
    type,
    'data-scope': dataScope = 'button',
    'data-part': dataPart = 'root',
    'data-slot': dataSlot,
    variant = 'default',
    'aria-busy': ariaBusy,
    'aria-disabled': ariaDisabled,
    ...props
  },
  ref,
) {
  const nativeDisabled = asChild ? undefined : loading || disabled;
  const resolvedAriaBusy = loading ? true : ariaBusy;
  const resolvedAriaDisabled = loading ? true : ariaDisabled;
  const isDisabled =
    disabled || loading || resolvedAriaDisabled === true || resolvedAriaDisabled === 'true';

  return (
    <ark.button
      ref={ref}
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      disabled={nativeDisabled}
      aria-busy={resolvedAriaBusy}
      aria-disabled={resolvedAriaDisabled}
      {...props}
      data-scope={dataScope}
      data-part={dataPart}
      data-slot={dataSlot ?? 'button-root'}
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
      className={clsx(styles.root, normalizeClassName(className))}
    />
  );
});

const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export { Button };