import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef, type ForwardedRef } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Radio.module.css';

type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const Radio = forwardRef(function Radio(
  { className, size = 'md', children, ...props }: RadioPrimitive.Root.Props & { size?: RadioSize },
  ref: ForwardedRef<ComponentRef<typeof RadioPrimitive.Root>>,
) {
  return (
    <RadioPrimitive.Root
      ref={ref}
      data-slot="radio-root"
      data-size={size}
      className={mergeClassName(className, styles.radio)}
      {...props}
    >
      {children ?? <RadioIndicator />}
    </RadioPrimitive.Root>
  );
});

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

function RadioIndicatorIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      data-slot="radio-indicator-icon"
      className={clsx(styles.icon, className)}
      {...props}
    />
  );
}

function RadioField({ className, ...props }: ComponentProps<'label'>) {
  return <label data-slot="radio-field" className={clsx(styles.field, className)} {...props} />;
}

function RadioLabel({ className, ...props }: ComponentProps<'span'>) {
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

function RadioGroupLabel({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="radio-group-label" className={clsx(styles.groupLabel, className)} {...props} />
  );
}

function RadioGroupList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="radio-group-list" className={clsx(styles.groupList, className)} {...props} />
  );
}

export {
  Radio,
  RadioIndicator,
  RadioIndicatorIcon,
  RadioField,
  RadioLabel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupList,
};