import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/solid/swap';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Swap.module.css';

type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

type SwapRootProps = ComponentProps<typeof SwapPrimitive.Root> & {
  animation?: SwapAnimation;
};

type SwapRootProviderProps = ComponentProps<typeof SwapPrimitive.RootProvider> & {
  animation?: SwapAnimation;
};

function SwapRoot(props: SwapRootProps) {
  const [local, others] = splitProps(props, ['animation', 'class']);

  return (
    <SwapPrimitive.Root
      data-animation={local.animation ?? 'scale'}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="swap-root"
    />
  );
}

function SwapRootProvider(props: SwapRootProviderProps) {
  const [local, others] = splitProps(props, ['animation', 'class']);

  return (
    <SwapPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-animation={local.animation ?? 'scale'}
      data-slot="swap-root-provider"
    />
  );
}

function SwapIndicator(props: ComponentProps<typeof SwapPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwapPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="swap-indicator"
    />
  );
}

type SwapComponent = typeof SwapRoot & {
  Root: typeof SwapRoot;
  RootProvider: typeof SwapRootProvider;
  Indicator: typeof SwapIndicator;
  useSwap: typeof useSwap;
};

const Swap: SwapComponent = Object.assign(SwapRoot, {
  Root: SwapRoot,
  RootProvider: SwapRootProvider,
  Indicator: SwapIndicator,
  useSwap,
});

export { Swap, useSwap, useSwapContext, type SwapAnimation };