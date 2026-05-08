import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: SwitchSize;
};

function Switch({ className, size = 'md', children, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children ?? <SwitchThumb />}
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

type SwitchThumbProps = SwitchPrimitive.Thumb.Props;
type SwitchFieldProps = React.ComponentProps<'label'>;
type SwitchLabelProps = React.ComponentProps<'span'>;

export { Switch, SwitchThumb, SwitchField, SwitchLabel };

export type { SwitchSize, SwitchProps, SwitchThumbProps, SwitchFieldProps, SwitchLabelProps };