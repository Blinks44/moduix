import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/solid/swap';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

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
      class={cn(
        "group/swap inline-grid place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]",
        local.class,
      )}
      {...others}
      data-slot="swap-root"
    />
  );
}

function SwapRootProvider(props: SwapRootProviderProps) {
  const [local, others] = splitProps(props, ['animation', 'class']);

  return (
    <SwapPrimitive.RootProvider
      data-animation={local.animation ?? 'scale'}
      class={cn(
        "group/swap inline-grid place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]",
        local.class,
      )}
      {...others}
      data-slot="swap-root-provider"
    />
  );
}

function SwapIndicator(props: ComponentProps<typeof SwapPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwapPrimitive.Indicator
      class={cn(
        'inline-flex items-center justify-center text-inherit [grid-area:swap] group-data-[animation=flip]/swap:[backface-visibility:hidden] group-data-[animation=fade]/swap:data-[state=closed]:animate-moduix-swap-fade-exit group-data-[animation=flip]/swap:data-[state=closed]:animate-moduix-swap-flip-exit group-data-[animation=rotate]/swap:data-[state=closed]:animate-moduix-swap-rotate-exit group-data-[animation=scale]/swap:data-[state=closed]:animate-moduix-swap-scale-exit group-data-[animation=fade]/swap:data-[state=open]:animate-moduix-swap-fade-enter group-data-[animation=flip]/swap:data-[state=open]:animate-moduix-swap-flip-enter group-data-[animation=rotate]/swap:data-[state=open]:animate-moduix-swap-rotate-enter group-data-[animation=scale]/swap:data-[state=open]:animate-moduix-swap-scale-enter motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        local.class,
      )}
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