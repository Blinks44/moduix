'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Spinner } from '../spinner';
import styles from './Button.module.css';

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';

type ButtonRootProps = HTMLArkProps<'button'> & {
  loading?: boolean;
  loadingIndicator?: ReactNode | false;
  loadingText?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonRootProps>(function Button(
  {
    asChild,
    children,
    className,
    disabled,
    loading = false,
    loadingIndicator,
    loadingText,
    onClickCapture,
    size = 'md',
    type,
    'data-scope': dataScope = 'button',
    'data-part': dataPart = 'root',
    'data-slot': dataSlot = 'button-root',
    variant = 'default',
    'aria-busy': ariaBusy,
    'aria-disabled': ariaDisabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading || ariaDisabled === true || ariaDisabled === 'true';
  const isIconSize = size === 'icon-sm' || size === 'icon-md' || size === 'icon-lg';
  const indicator =
    loadingIndicator === false || loadingIndicator === null
      ? null
      : (loadingIndicator ?? <Spinner decorative size="sm" />);
  const content =
    loading && !asChild ? (
      <>
        {indicator}
        {loadingText !== undefined ? loadingText : isIconSize ? null : children}
      </>
    ) : (
      children
    );

  return (
    <ark.button
      ref={ref}
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      disabled={asChild ? undefined : isDisabled}
      aria-busy={loading ? true : ariaBusy}
      aria-disabled={isDisabled ? true : ariaDisabled}
      {...props}
      onClickCapture={(event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClickCapture?.(event);
      }}
      data-scope={dataScope}
      data-part={dataPart}
      data-slot={dataSlot}
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
      className={clsx(styles.root, className)}
    >
      {content}
    </ark.button>
  );
});

export { Button };
export type { ButtonRootProps, ButtonSize, ButtonVariant };