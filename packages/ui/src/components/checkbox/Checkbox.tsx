import type { ComponentProps, ComponentRef } from 'react';
import { Checkbox as CheckboxPrimitive } from '@ark-ui/react/checkbox';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CheckboxRootProps = ComponentProps<typeof CheckboxPrimitive.Root> & { size?: CheckboxSize };

const CheckboxRoot = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxRootProps>(
  function CheckboxRoot({ className, size = 'md', ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CheckboxControl = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Control>,
  ComponentProps<typeof CheckboxPrimitive.Control>
>(function CheckboxControl({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Control
      ref={ref}
      data-slot="checkbox-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const CheckboxIndicator = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Indicator>,
  ComponentProps<typeof CheckboxPrimitive.Indicator>
>(function CheckboxIndicator({ className, children, indeterminate, ...props }, ref) {
  const slot = indeterminate
    ? 'checkbox-indicator-indeterminate-icon'
    : 'checkbox-indicator-checked-icon';

  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      data-slot="checkbox-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      indeterminate={indeterminate}
      {...props}
    >
      {children ?? (
        <span aria-hidden="true" data-slot={slot} className={styles.icon}>
          {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </span>
      )}
    </CheckboxPrimitive.Indicator>
  );
});

const CheckboxHiddenInput = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.HiddenInput>,
  ComponentProps<typeof CheckboxPrimitive.HiddenInput>
>(function CheckboxHiddenInput(props, ref) {
  return <CheckboxPrimitive.HiddenInput ref={ref} data-slot="checkbox-hidden-input" {...props} />;
});

const CheckboxLabel = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Label>,
  ComponentProps<typeof CheckboxPrimitive.Label>
>(function CheckboxLabel({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Label
      ref={ref}
      data-slot="checkbox-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const CheckboxGroup = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Group>,
  ComponentProps<typeof CheckboxPrimitive.Group>
>(function CheckboxGroup({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Group
      ref={ref}
      data-slot="checkbox-group"
      className={clsx(styles.group, normalizeClassName(className))}
      {...props}
    />
  );
});

const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  HiddenInput: CheckboxHiddenInput,
  Label: CheckboxLabel,
  Group: CheckboxGroup,
});

export { Checkbox };