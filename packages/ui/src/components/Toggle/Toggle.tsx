import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Toggle.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

const Toggle = forwardRef<
  ComponentRef<typeof TogglePrimitive>,
  TogglePrimitive.Props & {
    variant?: ToggleVariant;
    size?: ToggleSize;
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