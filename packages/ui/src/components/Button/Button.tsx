import { Button as ButtonPrimitive } from '@base-ui/react/button';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Button.module.css';

const Button = React.forwardRef<
  React.ComponentRef<typeof ButtonPrimitive>,
  ButtonPrimitive.Props & {
    variant?:
      | 'default'
      | 'outline'
      | 'secondary'
      | 'destructive'
      | 'destructive-outline'
      | 'ghost'
      | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
  }
>(function Button({ className, variant = 'default', size = 'md', ...props }, ref) {
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