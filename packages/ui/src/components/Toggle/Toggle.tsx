import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
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

function Toggle({ className, variant = 'default', size = 'md', ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle-root"
      data-variant={variant}
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

export { Toggle };
export type {
  ToggleProps,
  ToggleState,
  ToggleChangeEventReason,
  ToggleChangeEventDetails,
  ToggleVariant,
  ToggleSize,
};