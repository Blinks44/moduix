import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import {
  Switch as SwitchPrimitive,
  SwitchContext,
  useSwitch,
  useSwitchContext,
} from '@ark-ui/react/switch';
import { clsx } from 'clsx';
import { Children, cloneElement, forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & { size?: SwitchSize };
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

const SwitchRoot = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchRootProps>(
  function SwitchRoot({ asChild, children, className, size = 'md', ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        asChild={asChild}
        data-slot="switch-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      >
        {withHiddenInput(children, asChild)}
      </SwitchPrimitive.Root>
    );
  },
);

const SwitchRootProvider = forwardRef<
  ComponentRef<typeof SwitchPrimitive.RootProvider>,
  SwitchRootProviderProps
>(function SwitchRootProvider({ asChild, children, className, size = 'md', ...props }, ref) {
  return (
    <SwitchPrimitive.RootProvider
      ref={ref}
      asChild={asChild}
      data-slot="switch-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </SwitchPrimitive.RootProvider>
  );
});

const SwitchControl = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Control>,
  ComponentProps<typeof SwitchPrimitive.Control>
>(function SwitchControl({ className, children, ...props }, ref) {
  return (
    <SwitchPrimitive.Control
      ref={ref}
      data-slot="switch-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    >
      {children ?? <SwitchThumb />}
    </SwitchPrimitive.Control>
  );
});

const SwitchThumb = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Thumb>,
  ComponentProps<typeof SwitchPrimitive.Thumb>
>(function SwitchThumb({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Thumb
      ref={ref}
      data-slot="switch-thumb"
      className={clsx(styles.thumb, normalizeClassName(className))}
      {...props}
    />
  );
});

const SwitchLabel = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Label>,
  ComponentProps<typeof SwitchPrimitive.Label>
>(function SwitchLabel({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Label
      ref={ref}
      data-slot="switch-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <SwitchPrimitive.HiddenInput data-slot="switch-hidden-input" />;

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

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  Context: SwitchContext,
});

export { Switch, useSwitch, useSwitchContext };
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };