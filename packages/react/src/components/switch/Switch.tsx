import type { ComponentProps, ComponentRef } from 'react';
import { Switch as SwitchPrimitive } from '@ark-ui/react/switch';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & { size?: SwitchSize };
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

const SwitchRoot = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchRootProps>(
  function SwitchRoot({ className, size = 'md', ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SwitchRootProvider = forwardRef<
  ComponentRef<typeof SwitchPrimitive.RootProvider>,
  SwitchRootProviderProps
>(function SwitchRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <SwitchPrimitive.RootProvider
      ref={ref}
      data-slot="switch-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
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

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  HiddenInput: SwitchHiddenInput,
});

export { Switch };
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };