import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = Omit<SwitchPrimitive.Root.Props, 'children'>;
type SwitchThumbProps = SwitchPrimitive.Thumb.Props;
type SwitchFieldProps = React.ComponentPropsWithoutRef<'label'>;
type SwitchLabelProps = React.ComponentPropsWithoutRef<'span'>;

type SwitchClassNames = {
  thumb?: SwitchThumbProps['className'];
};

type SwitchProps = SwitchRootProps & {
  size?: SwitchSize;
  thumb?: React.ReactNode;
  classNames?: SwitchClassNames;
};

function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={mergeClassName(className, styles.thumb)}
      {...props}
    />
  );
}

const Switch = React.forwardRef(function Switch(
  { className, size = 'md', thumb, classNames, ...props }: SwitchProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      <SwitchThumb className={classNames?.thumb}>{thumb}</SwitchThumb>
    </SwitchPrimitive.Root>
  );
});

function SwitchField({ className, ...props }: SwitchFieldProps) {
  return <label data-slot="switch-field" className={clsx(styles.field, className)} {...props} />;
}

function SwitchLabel({ className, ...props }: SwitchLabelProps) {
  return <span data-slot="switch-label" className={clsx(styles.label, className)} {...props} />;
}

export { Switch, SwitchField, SwitchLabel };

export type { SwitchSize, SwitchClassNames, SwitchProps, SwitchFieldProps, SwitchLabelProps };