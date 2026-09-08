import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { forwardRef, type ComponentRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';

type CloseButtonRootProps = HTMLArkProps<'button'> & {
  'data-disabled'?: string;
  'data-part'?: string;
  'data-scope'?: string;
  'data-slot'?: string;
};

const CloseButtonRoot = forwardRef<ComponentRef<typeof ark.button>, CloseButtonRootProps>(
  function CloseButtonRoot(
    {
      asChild,
      className,
      children,
      disabled,
      onClick,
      onClickCapture,
      type,
      'aria-disabled': ariaDisabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-disabled': dataDisabled,
      'data-part': dataPart,
      'data-scope': dataScope,
      'data-slot': dataSlot,
      ...props
    },
    ref,
  ) {
    const isDisabled =
      disabled || ariaDisabled === true || ariaDisabled === 'true' || dataDisabled !== undefined;
    const nativeDisabled = asChild ? undefined : disabled;
    const resolvedAriaDisabled = asChild && disabled ? true : ariaDisabled;
    const handleClickCapture: CloseButtonRootProps['onClickCapture'] = (event) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClickCapture?.(event);
    };
    const handleClick: CloseButtonRootProps['onClick'] = (event) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    return (
      <ark.button
        ref={ref}
        asChild={asChild}
        {...props}
        type={asChild ? type : (type ?? 'button')}
        disabled={nativeDisabled}
        data-scope={dataScope ?? 'close-button'}
        data-part={dataPart ?? 'root'}
        data-slot={dataSlot ?? 'close-button-root'}
        data-disabled={dataDisabled ?? (isDisabled ? '' : undefined)}
        className={cn(
          "m-0 box-border inline-flex size-7 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity,translate,scale] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&:active:not([data-disabled])]:opacity-[0.94] motion-safe:[&:active:not([data-disabled])]:translate-y-px motion-safe:[&:active:not([data-disabled])]:scale-[0.985] [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
          className,
        )}
        aria-disabled={resolvedAriaDisabled}
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Close' : undefined)}
        aria-labelledby={ariaLabelledBy}
        onClickCapture={handleClickCapture}
        onClick={handleClick}
      >
        {children || <CloseIcon className="size-3 shrink-0" />}
      </ark.button>
    );
  },
);

const CloseButton = Object.assign(CloseButtonRoot, {
  Root: CloseButtonRoot,
});

export { CloseButton };