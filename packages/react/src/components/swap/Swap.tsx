'use client';

import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/react/swap';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Swap.module.css';

type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

type SwapRootProps = ComponentProps<typeof SwapPrimitive.Root> & {
  animation?: SwapAnimation;
};

type SwapRootProviderProps = ComponentProps<typeof SwapPrimitive.RootProvider> & {
  animation?: SwapAnimation;
};

const SwapRoot = forwardRef<ComponentRef<typeof SwapPrimitive.Root>, SwapRootProps>(
  function SwapRoot({ animation = 'scale', className, ...props }, ref) {
    return (
      <SwapPrimitive.Root
        ref={ref}
        data-animation={animation}
        className={clsx(styles.root, className)}
        {...props}
        data-slot="swap-root"
      />
    );
  },
);

const SwapRootProvider = forwardRef<
  ComponentRef<typeof SwapPrimitive.RootProvider>,
  SwapRootProviderProps
>(function SwapRootProvider({ animation = 'scale', className, ...props }, ref) {
  return (
    <SwapPrimitive.RootProvider
      ref={ref}
      data-animation={animation}
      className={clsx(styles.root, className)}
      {...props}
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

const Swap = Object.assign(SwapRoot, {
  Root: SwapRoot,
  RootProvider: SwapRootProvider,
  Indicator: SwapIndicator,
  useSwap,
});

export { Swap, useSwap, useSwapContext, type SwapAnimation };