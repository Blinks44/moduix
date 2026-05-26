import { Button as ButtonPrimitive } from '@base-ui/react/button';
import * as React from 'react';
import { CloseIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './CloseButton.module.css';

const CloseButton = React.forwardRef<
  React.ComponentRef<typeof ButtonPrimitive>,
  ButtonPrimitive.Props
>(function CloseButton({ className, children, 'aria-label': ariaLabel, ...props }, ref) {
  return (
    <ButtonPrimitive
      ref={ref}
      type="button"
      data-slot="close-button"
      className={mergeClassName(className, styles.root)}
      aria-label={ariaLabel ?? (children == null ? 'Close' : undefined)}
      {...props}
    >
      {children ?? <CloseIcon />}
    </ButtonPrimitive>
  );
});

export { CloseButton };