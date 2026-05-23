import { Button as ButtonPrimitive } from '@base-ui/react/button';
import * as React from 'react';
import { CloseIcon } from '@/primitives/Icons';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './CloseButton.module.css';

export type CloseButtonProps = ButtonPrimitive.Props;

const CloseButton = React.forwardRef(function CloseButton(
  { className, children, 'aria-label': ariaLabel = 'Close', ...props }: CloseButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <ButtonPrimitive
      ref={ref}
      type="button"
      data-slot="close-button"
      className={mergeClassName(className, styles.root)}
      aria-label={ariaLabel}
      {...props}
    >
      {children ?? <CloseIcon />}
    </ButtonPrimitive>
  );
});

export { CloseButton };