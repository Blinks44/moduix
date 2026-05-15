import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import { Checkbox, type CheckboxProps } from '../Checkbox';
import styles from './CheckboxGroup.module.css';

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function CheckboxGroupLabel({ className, ...props }: CheckboxGroupLabelProps) {
  return (
    <div data-slot="checkbox-group-label" className={clsx(styles.label, className)} {...props} />
  );
}

function CheckboxGroupList({ className, ...props }: CheckboxGroupListProps) {
  return (
    <div data-slot="checkbox-group-list" className={clsx(styles.list, className)} {...props} />
  );
}

function CheckboxGroupItem({ className, ...props }: CheckboxGroupItemProps) {
  return (
    <label data-slot="checkbox-group-item" className={clsx(styles.item, className)} {...props} />
  );
}

type CheckboxGroupItemControlProps = CheckboxProps;

function CheckboxGroupItemControl(props: CheckboxGroupItemControlProps) {
  return <Checkbox data-slot="checkbox-group-item-control" {...props} />;
}

function CheckboxGroupItemLabel({ className, ...props }: CheckboxGroupItemLabelProps) {
  return (
    <span
      data-slot="checkbox-group-item-label"
      className={clsx(styles.itemLabel, className)}
      {...props}
    />
  );
}

type CheckboxGroupProps = CheckboxGroupPrimitive.Props;
type CheckboxGroupState = CheckboxGroupPrimitive.State;
type CheckboxGroupChangeEventReason = CheckboxGroupPrimitive.ChangeEventReason;
type CheckboxGroupChangeEventDetails = CheckboxGroupPrimitive.ChangeEventDetails;
type CheckboxGroupLabelProps = React.ComponentProps<'div'>;
type CheckboxGroupListProps = React.ComponentProps<'div'>;
type CheckboxGroupItemProps = React.ComponentProps<'label'>;
type CheckboxGroupItemLabelProps = React.ComponentProps<'span'>;

export {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupList,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
};

export type {
  CheckboxGroupProps,
  CheckboxGroupState,
  CheckboxGroupChangeEventReason,
  CheckboxGroupChangeEventDetails,
  CheckboxGroupLabelProps,
  CheckboxGroupListProps,
  CheckboxGroupItemProps,
  CheckboxGroupItemControlProps,
  CheckboxGroupItemLabelProps,
};