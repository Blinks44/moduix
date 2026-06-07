import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef, type ForwardedRef } from 'react';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const Checkbox = forwardRef(function Checkbox(
  {
    className,
    size = 'md',
    children,
    ...props
  }: CheckboxPrimitive.Root.Props & { size?: CheckboxSize },
  ref: ForwardedRef<ComponentRef<typeof CheckboxPrimitive.Root>>,
) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children ?? <CheckboxIndicator />}
    </CheckboxPrimitive.Root>
  );
});

function CheckboxIndicator({ className, children, ...props }: CheckboxPrimitive.Indicator.Props) {
  return (
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    >
      {children ?? <CheckboxIndicatorIcon />}
    </CheckboxPrimitive.Indicator>
  );
}

function CheckboxIndicatorIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      data-slot="checkbox-indicator-icon"
      className={clsx(styles.icon, className)}
      {...props}
    >
      {children ?? (
        <>
          <span data-slot="checkbox-indicator-checked-icon" className={styles.iconChecked}>
            <CheckIcon />
          </span>
          <span
            data-slot="checkbox-indicator-indeterminate-icon"
            className={styles.iconIndeterminate}
          >
            <IndeterminateIcon />
          </span>
        </>
      )}
    </span>
  );
}

function CheckboxField({ className, ...props }: ComponentProps<'label'>) {
  return <label data-slot="checkbox-field" className={clsx(styles.field, className)} {...props} />;
}

function CheckboxLabel({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="checkbox-label" className={clsx(styles.label, className)} {...props} />;
}

export { Checkbox, CheckboxIndicator, CheckboxIndicatorIcon, CheckboxField, CheckboxLabel };