import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import { Toggle, type ToggleProps, type ToggleSize, type ToggleVariant } from '../Toggle';
import styles from './ToggleGroup.module.css';

type ToggleGroupContextValue = {
  variant: ToggleVariant;
  size: ToggleSize;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: 'default',
  size: 'md',
});

type ToggleGroupProps<Value extends string = string> = ToggleGroupPrimitive.Props<Value> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};
type ToggleGroupValue<Value extends string = string> = readonly Value[];
type ToggleGroupState = ToggleGroupPrimitive.State;
type ToggleGroupChangeEventReason = ToggleGroupPrimitive.ChangeEventReason;
type ToggleGroupChangeEventDetails = ToggleGroupPrimitive.ChangeEventDetails;

function ToggleGroup<Value extends string = string>({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ToggleGroupProps<Value>) {
  const contextValue = React.useMemo(() => ({ variant, size }), [variant, size]);

  return (
    <ToggleGroupContext.Provider value={contextValue}>
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

type ToggleGroupItemProps<Value extends string = string> = ToggleProps<Value>;

function ToggleGroupItem<Value extends string = string>({
  className,
  variant,
  size,
  ...props
}: ToggleGroupItemProps<Value>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={variant ?? context.variant}
      size={size ?? context.size}
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

type ToggleGroupVariant = ToggleVariant;
type ToggleGroupSize = ToggleSize;

export { ToggleGroup, ToggleGroupItem };

export type {
  ToggleGroupValue,
  ToggleGroupProps,
  ToggleGroupState,
  ToggleGroupChangeEventReason,
  ToggleGroupChangeEventDetails,
  ToggleGroupItemProps,
  ToggleGroupVariant,
  ToggleGroupSize,
};