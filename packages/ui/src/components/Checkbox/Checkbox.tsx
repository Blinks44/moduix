import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { clsx } from 'clsx';
import * as React from 'react';
import { CheckSmallIcon, IndeterminateIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Checkbox.module.css';

const CheckIcon = CheckSmallIcon;

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CheckboxClassNames = {
  indicator?: string;
  indicatorIcon?: string;
  checkedIcon?: string;
  indeterminateIcon?: string;
};

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  size?: CheckboxSize;
  indicator?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  classNames?: CheckboxClassNames;
};

function Checkbox({
  className,
  size = 'md',
  children,
  indicator,
  checkedIcon,
  indeterminateIcon,
  classNames,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <CheckboxIndicator className={classNames?.indicator}>
          {indicator !== undefined ? (
            indicator
          ) : (
            <CheckboxIndicatorIcon
              className={classNames?.indicatorIcon}
              checkedIcon={checkedIcon}
              checkedIconClassName={classNames?.checkedIcon}
              indeterminateIcon={indeterminateIcon}
              indeterminateIconClassName={classNames?.indeterminateIcon}
            />
          )}
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
  return (
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <CheckboxIndicatorIcon
          checkedIcon={checkedIcon}
          checkedIconClassName={checkedIconClassName}
          indeterminateIcon={indeterminateIcon}
          indeterminateIconClassName={indeterminateIconClassName}
        />
      )}
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
        {checkedIcon !== undefined ? checkedIcon : <CheckIcon />}
      </span>
      <span
        data-slot="checkbox-indicator-indeterminate-icon"
        className={clsx(styles.iconIndeterminate, indeterminateIconClassName)}
      >
        {indeterminateIcon !== undefined ? indeterminateIcon : <IndeterminateIcon />}
      </span>
    </span>
  );
}

type CheckboxFieldProps = React.ComponentProps<'label'>;

function CheckboxField({ className, ...props }: CheckboxFieldProps) {
  return <label data-slot="checkbox-field" className={clsx(styles.field, className)} {...props} />;
}

type CheckboxLabelProps = React.ComponentProps<'span'>;

function CheckboxLabel({ className, ...props }: CheckboxLabelProps) {
  return <span data-slot="checkbox-label" className={clsx(styles.label, className)} {...props} />;
}

export { Checkbox, CheckboxIndicator, CheckboxIndicatorIcon, CheckboxField, CheckboxLabel };

export type {
  CheckboxSize,
  CheckboxClassNames,
  CheckboxProps,
  CheckboxIndicatorProps,
  CheckboxIndicatorIconProps,
  CheckboxFieldProps,
  CheckboxLabelProps,
};