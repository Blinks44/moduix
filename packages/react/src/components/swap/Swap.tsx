import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/react/swap';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Swap.module.css';

const SwapRoot = forwardRef<
  ComponentRef<typeof SwapPrimitive.Root>,
  ComponentProps<typeof SwapPrimitive.Root>
>(function SwapRoot({ className, ...props }, ref) {
  return (
    <SwapPrimitive.Root
      ref={ref}
      data-slot="swap-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SwapRootProvider = forwardRef<
  ComponentRef<typeof SwapPrimitive.RootProvider>,
  ComponentProps<typeof SwapPrimitive.RootProvider>
>(function SwapRootProvider({ className, ...props }, ref) {
  return (
    <SwapPrimitive.RootProvider
      ref={ref}
      data-slot="swap-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SwapIndicator = forwardRef<
  ComponentRef<typeof SwapPrimitive.Indicator>,
  ComponentProps<typeof SwapPrimitive.Indicator>
>(function SwapIndicator({ className, ...props }, ref) {
  return (
    <SwapPrimitive.Indicator
      ref={ref}
      data-slot="swap-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const Swap = Object.assign(SwapRoot, {
  Root: SwapRoot,
  RootProvider: SwapRootProvider,
  Indicator: SwapIndicator,
  useSwap,
});

export { Swap, useSwapContext };