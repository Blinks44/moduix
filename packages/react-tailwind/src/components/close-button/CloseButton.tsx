'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';

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
      className={cn(
        "m-0 box-border inline-flex size-7 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
        className,
      )}
    >
      {children || <CloseIcon />}
    </ark.button>
  );
});

export { CloseButton };
export type { CloseButtonProps };