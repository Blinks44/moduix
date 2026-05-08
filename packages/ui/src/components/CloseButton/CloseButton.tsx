import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { CloseIcon } from '@/primitives/Icons';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './CloseButton.module.css';

export type CloseButtonProps = ButtonPrimitive.Props;

function CloseButton({ className, children, ...props }: CloseButtonProps) {
  return (
    <ButtonPrimitive
      type="button"
      data-slot="close-button"
      className={mergeClassName(className, styles.root)}
      aria-label="Close"
      {...props}
    >
      {children ?? <CloseIcon />}
    </ButtonPrimitive>
  );
}

export { CloseButton };