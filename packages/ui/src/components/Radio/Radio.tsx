import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { clsx } from 'clsx';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Radio.module.css';

function Radio({
  className,
  size = 'md',
  children,
  ...props
}: RadioPrimitive.Root.Props & { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-root"
      data-size={size}
      className={mergeClassName(className, styles.radio)}
      {...props}
    >
      {children ?? <RadioIndicator />}
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