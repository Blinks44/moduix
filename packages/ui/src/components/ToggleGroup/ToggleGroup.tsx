import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import { Toggle } from '../Toggle';
import styles from './ToggleGroup.module.css';

type ToggleVariant = React.ComponentProps<typeof Toggle>['variant'];
type ToggleSize = React.ComponentProps<typeof Toggle>['size'];

const ToggleGroupContext = React.createContext<{
  variant: ToggleVariant;
  size: ToggleSize;
}>({
  variant: 'default',
  size: 'md',
});

function ToggleGroup({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ToggleGroupPrimitive.Props & {
  variant?: ToggleVariant;
  size?: ToggleSize;
}) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group-root"
        data-variant={variant}
        data-size={size}
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  const inherited = React.useContext(ToggleGroupContext);

  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={variant ?? inherited.variant}
      size={size ?? inherited.size}
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };