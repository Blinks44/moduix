'use client';

import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/react/swap';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Swap.module.css';

type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

type SwapProps = ComponentProps<typeof SwapPrimitive.Root> & {
  animation?: SwapAnimation;
};

type SwapRootProviderProps = ComponentProps<typeof SwapPrimitive.RootProvider> & {
  animation?: SwapAnimation;
};

const Swap = forwardRef<ComponentRef<typeof SwapPrimitive.Root>, SwapProps>(function Swap(
  { animation = 'scale', className, ...props },
  ref,
) {
  return (
    <SwapPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-animation={animation}
      data-slot="swap-root"
    />
  );
});

const SwapRootProvider = forwardRef<
  ComponentRef<typeof SwapPrimitive.RootProvider>,
  SwapRootProviderProps
>(function SwapRootProvider({ animation = 'scale', className, ...props }, ref) {
  return (
    <SwapPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-animation={animation}
      data-slot="swap-root-provider"
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
      className={clsx(styles.indicator, className)}
      {...props}
      data-slot="swap-indicator"
    />
  );
});

export { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext, type SwapAnimation };