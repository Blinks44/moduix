import type { ComponentProps, ComponentRef } from 'react';
import { Switch as SwitchPrimitive, useSwitch, useSwitchContext } from '@ark-ui/react/switch';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SwitchRoot = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Root>,
  ComponentProps<typeof SwitchPrimitive.Root> & { size?: SwitchSize }
>(function SwitchRoot({ className, size = 'md', children, ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch-root"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {children ?? (
        <>
          <SwitchControl />
          <SwitchHiddenInput />
        </>
      )}
    </SwitchPrimitive.Root>
  );
});

const SwitchRootProvider = forwardRef<
  ComponentRef<typeof SwitchPrimitive.RootProvider>,
  ComponentProps<typeof SwitchPrimitive.RootProvider> & { size?: SwitchSize }
>(function SwitchRootProvider({ className, size = 'md', children, ...props }, ref) {
  return (
    <SwitchPrimitive.RootProvider
      ref={ref}
      data-slot="switch-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {children ?? (
        <>
          <SwitchControl />
          <SwitchHiddenInput />
        </>
      )}
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

const SwitchHiddenInput = forwardRef<
  ComponentRef<typeof SwitchPrimitive.HiddenInput>,
  ComponentProps<typeof SwitchPrimitive.HiddenInput>
>(function SwitchHiddenInput(props, ref) {
  return <SwitchPrimitive.HiddenInput ref={ref} data-slot="switch-hidden-input" {...props} />;
});

const SwitchContext = SwitchPrimitive.Context;

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  HiddenInput: SwitchHiddenInput,
  Context: SwitchContext,
});

export { Switch, useSwitch, useSwitchContext };
export type {
  SwitchCheckedChangeDetails,
  SwitchContextProps,
  SwitchControlProps,
  SwitchHiddenInputProps,
  SwitchLabelProps,
  SwitchRootProps,
  SwitchRootProviderProps,
  SwitchThumbProps,
  UseSwitchContext,
  UseSwitchProps,
  UseSwitchReturn,
} from '@ark-ui/react/switch';