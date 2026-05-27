import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Toggle.module.css';

const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive>,
  TogglePrimitive.Props & {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';
  }
>(function Toggle({ className, variant = 'default', size = 'md', ...props }, ref) {
  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle-root"
      data-variant={variant}
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

export { Toggle };