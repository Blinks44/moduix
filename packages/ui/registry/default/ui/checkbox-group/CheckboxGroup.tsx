import type { ComponentProps } from 'react';
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import { clsx } from 'clsx';
import { Checkbox, CheckboxField, CheckboxLabel } from '@/components/moduix/checkbox';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
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

function CheckboxGroupLabel({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="checkbox-group-label" className={clsx(styles.label, className)} {...props} />
  );
}

function CheckboxGroupList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="checkbox-group-list" className={clsx(styles.list, className)} {...props} />
  );
}

function CheckboxGroupItem({ className, ...props }: ComponentProps<typeof CheckboxField>) {
  return (
    <CheckboxField
      data-slot="checkbox-group-item"
      className={clsx(styles.item, className)}
      {...props}
    />
  );
}

function CheckboxGroupItemControl(props: ComponentProps<typeof Checkbox>) {
  return <Checkbox data-slot="checkbox-group-item-control" {...props} />;
}

function CheckboxGroupItemLabel({ className, ...props }: ComponentProps<typeof CheckboxLabel>) {
  return (
    <CheckboxLabel
      data-slot="checkbox-group-item-label"
      className={clsx(styles.itemLabel, className)}
      {...props}
    />
  );
}

export {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupList,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
};