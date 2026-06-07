import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { forwardRef, type ComponentRef } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './CloseButton.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close';

const CloseButton = forwardRef<ComponentRef<typeof ButtonPrimitive>, ButtonPrimitive.Props>(
  function CloseButton(
    { className, children, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
    ref,
  ) {
    return (
      <ButtonPrimitive
        ref={ref}
        type="button"
        data-slot="close-button"
        className={mergeClassName(className, styles.root)}
        aria-label={
          ariaLabel ??
          (children == null && ariaLabelledBy == null ? DEFAULT_CLOSE_BUTTON_LABEL : undefined)
        }
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children ?? <CloseIcon />}
      </ButtonPrimitive>
    );
  },
);

export { CloseButton };