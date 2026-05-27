import type { ComponentRef } from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { forwardRef } from 'react';
import { CloseIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './CloseButton.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close';

const CloseButton = forwardRef<ComponentRef<typeof ButtonPrimitive>, ButtonPrimitive.Props>(
  function CloseButton({ className, children, 'aria-label': ariaLabel, ...props }, ref) {
    return (
      <ButtonPrimitive
        ref={ref}
        type="button"
        data-slot="close-button"
        className={mergeClassName(className, styles.root)}
        aria-label={ariaLabel ?? (children == null ? DEFAULT_CLOSE_BUTTON_LABEL : undefined)}
        {...props}
      >
        {children ?? <CloseIcon />}
      </ButtonPrimitive>
    );
  },
);

export { CloseButton };