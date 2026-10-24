'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import styles from './CloseButton.module.css';

type CloseButtonProps = HTMLArkProps<'button'> & {
  'data-disabled'?: string;
  'data-part'?: string;
  'data-scope'?: string;
  'data-slot'?: string;
};

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  {
    asChild,
    className,
    children,
    disabled,
    onClickCapture,
    type,
    'aria-disabled': ariaDisabled,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'data-disabled': dataDisabled,
    'data-part': dataPart = 'root',
    'data-scope': dataScope = 'close-button',
    'data-slot': dataSlot = 'close-button-root',
    ...props
  },
  ref,
) {
  // A parent Ark part that composes CloseButton through asChild passes its own data-disabled.
  const isDisabled =
    disabled || ariaDisabled === true || ariaDisabled === 'true' || dataDisabled !== undefined;

  return (
    <ark.button
      ref={ref}
      asChild={asChild}
      {...props}
      type={asChild ? type : (type ?? 'button')}
      disabled={asChild ? undefined : disabled}
      aria-disabled={asChild && disabled ? true : ariaDisabled}
      aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.close : undefined)}
      aria-labelledby={ariaLabelledBy}
      onClickCapture={(event) => {
        // Stopping capture also skips every bubble onClick, including the composed child.
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
      data-disabled={isDisabled ? (dataDisabled ?? '') : undefined}
      className={clsx(styles.root, className)}
    >
      {children || <CloseIcon />}
    </ark.button>
  );
});

export { CloseButton };
export type { CloseButtonProps };