import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
export type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = forwardRef<ComponentRef<typeof ButtonPrimitive>, ButtonProps>(function Button(
  { className, size = 'md', variant = 'default', ...props },
  ref,
) {
  return (
    <ButtonPrimitive
      ref={ref}
      data-slot="button-root"
      data-variant={variant}
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

export { Button };