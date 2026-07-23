import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/react/checkbox';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RootProps = ComponentProps<typeof CheckboxPrimitive.Root> & { size?: CheckboxSize };
type RootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

const CheckboxRoot = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, RootProps>(
  function CheckboxRoot({ asChild, children, className, size = 'md', ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        asChild={asChild}
        data-slot="checkbox-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      >
        {withHiddenInput(children, asChild)}
      </CheckboxPrimitive.Root>
    );
  },
);

const CheckboxRootProvider = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.RootProvider>,
  RootProviderProps
>(function CheckboxRootProvider({ asChild, children, className, size = 'md', ...props }, ref) {
  return (
    <CheckboxPrimitive.RootProvider
      ref={ref}
      asChild={asChild}
      data-slot="checkbox-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </CheckboxPrimitive.RootProvider>
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

const CheckboxControl = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Control>,
  ComponentProps<typeof CheckboxPrimitive.Control>
>(function CheckboxControl({ children, className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Control
      ref={ref}
      data-slot="checkbox-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    >
      {children ?? (
        <>
          <CheckboxIndicator />
          <CheckboxIndicator indeterminate />
        </>
      )}
    </CheckboxPrimitive.Control>
  );
});

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <CheckboxPrimitive.HiddenInput data-slot="checkbox-hidden-input" />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
}

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
  RootProvider: CheckboxRootProvider,
  Context: CheckboxPrimitive.Context,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  Group: CheckboxGroup,
});

export { Checkbox, useCheckbox, useCheckboxContext, useCheckboxGroup, useCheckboxGroupContext };