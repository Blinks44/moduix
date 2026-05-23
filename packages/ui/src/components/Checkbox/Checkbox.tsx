import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { clsx } from 'clsx';
import * as React from 'react';
import { CheckSmallIcon, IndeterminateIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CheckboxClassNames = {
  indicator?: CheckboxIndicatorProps['className'];
  indicatorIcon?: CheckboxIndicatorIconProps['className'];
  checkedIcon?: string;
  indeterminateIcon?: string;
};

type CheckboxSlotProps = {
  indicator?: Omit<CheckboxIndicatorProps, 'children' | 'className'>;
  indicatorIcon?: Omit<CheckboxIndicatorIconProps, 'checkedIcon' | 'children' | 'className'>;
};

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  size?: CheckboxSize;
  indicator?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  classNames?: CheckboxClassNames;
  slotProps?: CheckboxSlotProps;
};

function Checkbox({
  className,
  size = 'md',
  children,
  indicator,
  checkedIcon,
  indeterminateIcon,
  classNames,
  slotProps,
  ...props
}: CheckboxProps) {
  const indicatorNode = indicator ?? (
    <CheckboxIndicatorIcon
      {...slotProps?.indicatorIcon}
      className={classNames?.indicatorIcon}
      checkedIcon={checkedIcon}
      checkedIconClassName={classNames?.checkedIcon}
      indeterminateIcon={indeterminateIcon}
      indeterminateIconClassName={classNames?.indeterminateIcon}
    />
  );

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children ?? (
        <CheckboxIndicator {...slotProps?.indicator} className={classNames?.indicator}>
          {indicatorNode}
        </CheckboxIndicator>
      )}
    </CheckboxPrimitive.Root>
  );
}

type CheckboxIndicatorProps = CheckboxPrimitive.Indicator.Props & {
  checkedIcon?: React.ReactNode;
  checkedIconClassName?: string;
  indeterminateIcon?: React.ReactNode;
  indeterminateIconClassName?: string;
};

function CheckboxIndicator({
  className,
  children,
  checkedIcon,
  checkedIconClassName,
  indeterminateIcon,
  indeterminateIconClassName,
  ...props
}: CheckboxIndicatorProps) {
  const indicatorIconNode = children ?? (
    <CheckboxIndicatorIcon
      checkedIcon={checkedIcon}
      checkedIconClassName={checkedIconClassName}
      indeterminateIcon={indeterminateIcon}
      indeterminateIconClassName={indeterminateIconClassName}
    />
  );

  return (
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    >
      {indicatorIconNode}
    </CheckboxPrimitive.Indicator>
  );
}

type CheckboxIndicatorIconProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  checkedIcon?: React.ReactNode;
  checkedIconClassName?: string;
  indeterminateIcon?: React.ReactNode;
  indeterminateIconClassName?: string;
};

function CheckboxIndicatorIcon({
  className,
  checkedIcon,
  checkedIconClassName,
  indeterminateIcon,
  indeterminateIconClassName,
  ...props
}: CheckboxIndicatorIconProps) {
  return (
    <span data-slot="checkbox-indicator-icon" className={clsx(styles.icon, className)} {...props}>
      <span
        data-slot="checkbox-indicator-checked-icon"
        className={clsx(styles.iconChecked, checkedIconClassName)}
      >
        {checkedIcon ?? <CheckSmallIcon />}
      </span>
      <span
        data-slot="checkbox-indicator-indeterminate-icon"
        className={clsx(styles.iconIndeterminate, indeterminateIconClassName)}
      >
        {indeterminateIcon ?? <IndeterminateIcon />}
      </span>
    </span>
  );
}

type CheckboxFieldProps = React.ComponentProps<'label'>;

function CheckboxField({ className, ...props }: CheckboxFieldProps) {
  return <label data-slot="checkbox-field" className={clsx(styles.field, className)} {...props} />;
}

type CheckboxLabelProps = React.ComponentProps<'span'>;
type CheckboxState = CheckboxPrimitive.Root.State;
type CheckboxIndicatorState = CheckboxPrimitive.Indicator.State;
type CheckboxChangeEventReason = CheckboxPrimitive.Root.ChangeEventReason;
type CheckboxChangeEventDetails = CheckboxPrimitive.Root.ChangeEventDetails;

function CheckboxLabel({ className, ...props }: CheckboxLabelProps) {
  return <span data-slot="checkbox-label" className={clsx(styles.label, className)} {...props} />;
}

export { Checkbox, CheckboxIndicator, CheckboxIndicatorIcon, CheckboxField, CheckboxLabel };

export type {
  CheckboxSize,
  CheckboxClassNames,
  CheckboxSlotProps,
  CheckboxProps,
  CheckboxIndicatorProps,
  CheckboxIndicatorIconProps,
  CheckboxFieldProps,
  CheckboxLabelProps,
  CheckboxState,
  CheckboxIndicatorState,
  CheckboxChangeEventReason,
  CheckboxChangeEventDetails,
};