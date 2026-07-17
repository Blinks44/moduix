import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './CloseButton.module.css';

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
        disabled={disabled}
        data-scope={dataScope ?? 'close-button'}
        data-part={dataPart ?? 'root'}
        data-slot={dataSlot ?? 'close-button-root'}
        data-disabled={dataDisabled ?? (isDisabled ? '' : undefined)}
        className={clsx(styles.root, normalizeClassName(className))}
        aria-disabled={ariaDisabled}
        aria-label={ariaLabel ?? (children == null && ariaLabelledBy == null ? 'Close' : undefined)}
        aria-labelledby={ariaLabelledBy}
        onClick={handleClick}
      >
        {children ?? <CloseIcon />}
      </ark.button>
    );
  },
);

const CloseButton = Object.assign(CloseButtonRoot, {
  Root: CloseButtonRoot,
});

export { CloseButton };