import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SwitchClassNames = {
  thumb?: SwitchPrimitive.Thumb.Props['className'];
};

type SwitchProps = Omit<SwitchPrimitive.Root.Props, 'children'> & {
  size?: SwitchSize;
  thumb?: React.ReactNode;
  classNames?: SwitchClassNames;
};

function Switch({ className, size = 'md', thumb, classNames, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      <SwitchThumb className={classNames?.thumb}>{thumb}</SwitchThumb>
    </SwitchPrimitive.Root>
  );
}

function SwitchThumb({ className, ...props }: SwitchPrimitive.Thumb.Props) {
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={mergeClassName(className, styles.thumb)}
      {...props}
    />
  );
}

function SwitchField({ className, ...props }: React.ComponentProps<'label'>) {
  return <label data-slot="switch-field" className={clsx(styles.field, className)} {...props} />;
}

function SwitchLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="switch-label" className={clsx(styles.label, className)} {...props} />;
}

type SwitchFieldProps = React.ComponentProps<'label'>;
type SwitchLabelProps = React.ComponentProps<'span'>;

export { Switch, SwitchField, SwitchLabel };

export type { SwitchSize, SwitchClassNames, SwitchProps, SwitchFieldProps, SwitchLabelProps };