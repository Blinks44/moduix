import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Radio.module.css';

type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RadioClassNames = {
  indicator?: RadioIndicatorProps['className'];
  indicatorIcon?: RadioIndicatorIconProps['className'];
};

type RadioProps = RadioPrimitive.Root.Props & {
  size?: RadioSize;
  indicator?: React.ReactNode;
  classNames?: RadioClassNames;
};

function Radio({ className, size = 'md', children, indicator, classNames, ...props }: RadioProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-root"
      data-size={size}
      className={mergeClassName(className, styles.radio)}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <RadioIndicator className={classNames?.indicator}>
          {indicator !== undefined ? (
            indicator
          ) : (
            <RadioIndicatorIcon className={classNames?.indicatorIcon} />
          )}
        </RadioIndicator>
      )}
    </RadioPrimitive.Root>
  );
}

function RadioIndicator({ className, children, ...props }: RadioPrimitive.Indicator.Props) {
  return (
    <RadioPrimitive.Indicator
      data-slot="radio-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    >
      {children ?? <RadioIndicatorIcon />}
    </RadioPrimitive.Indicator>
  );
}

function RadioIndicatorIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="radio-indicator-icon" className={clsx(styles.icon, className)} {...props} />
  );
}

function RadioField({ className, ...props }: React.ComponentProps<'label'>) {
  return <label data-slot="radio-field" className={clsx(styles.field, className)} {...props} />;
}

function RadioLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="radio-label" className={clsx(styles.label, className)} {...props} />;
}

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group-root"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function RadioGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="radio-group-label" className={clsx(styles.groupLabel, className)} {...props} />
  );
}

function RadioGroupList({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="radio-group-list" className={clsx(styles.groupList, className)} {...props} />
  );
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label data-slot="radio-group-item" className={clsx(styles.groupItem, className)} {...props} />
  );
}

type RadioGroupItemControlProps = Omit<RadioProps, 'children'>;

function RadioGroupItemControl(props: RadioGroupItemControlProps) {
  return <Radio data-slot="radio-group-item-control" {...props} />;
}

function RadioGroupItemLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="radio-group-item-label"
      className={clsx(styles.groupItemLabel, className)}
      {...props}
    />
  );
}

type RadioFieldProps = React.ComponentProps<'label'>;
type RadioLabelProps = React.ComponentProps<'span'>;
type RadioIndicatorProps = RadioPrimitive.Indicator.Props;
type RadioIndicatorIconProps = React.ComponentProps<'span'>;
type RadioGroupProps = RadioGroupPrimitive.Props;
type RadioGroupLabelProps = React.ComponentProps<'div'>;
type RadioGroupListProps = React.ComponentProps<'div'>;
type RadioGroupItemProps = React.ComponentProps<'label'>;
type RadioGroupItemLabelProps = React.ComponentProps<'span'>;

export {
  Radio,
  RadioField,
  RadioLabel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupList,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
};

export type {
  RadioSize,
  RadioClassNames,
  RadioProps,
  RadioFieldProps,
  RadioLabelProps,
  RadioGroupProps,
  RadioGroupLabelProps,
  RadioGroupListProps,
  RadioGroupItemProps,
  RadioGroupItemControlProps,
  RadioGroupItemLabelProps,
};