import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './CloseButton.module.css';

const CloseButtonRoot = forwardRef<HTMLButtonElement, HTMLArkProps<'button'>>(
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
        data-scope="close-button"
        data-part="root"
        data-slot="close-button-root"
        data-disabled={isDisabled ? '' : undefined}
        className={clsx(styles.root, normalizeClassName(className))}
        aria-disabled={ariaDisabled}
        aria-label={ariaLabel ?? (children == null && ariaLabelledBy == null ? 'Close' : undefined)}
        aria-labelledby={ariaLabelledBy}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          onClick?.(event);
        }}
        {...props}
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