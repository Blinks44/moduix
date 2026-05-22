import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Toggle.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

type ToggleProps = TogglePrimitive.Props & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};
type ToggleState = TogglePrimitive.State;
type ToggleChangeEventReason = TogglePrimitive.ChangeEventReason;
type ToggleChangeEventDetails = TogglePrimitive.ChangeEventDetails;

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { className, variant = 'default', size = 'md', ...props },
  ref,
) {
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
export type {
  ToggleProps,
  ToggleState,
  ToggleChangeEventReason,
  ToggleChangeEventDetails,
  ToggleVariant,
  ToggleSize,
};