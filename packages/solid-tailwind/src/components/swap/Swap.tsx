import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/solid/swap';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

type SwapProps = ComponentProps<typeof SwapPrimitive.Root> & {
  animation?: SwapAnimation;
};

type SwapRootProviderProps = ComponentProps<typeof SwapPrimitive.RootProvider> & {
  animation?: SwapAnimation;
};

function Swap(props: SwapProps) {
  const [local, others] = splitProps(props, ['animation', 'class']);

  return (
    <SwapPrimitive.Root
      class={cn(
        "group/swap place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]",
        local.class,
      )}
      {...others}
      data-animation={local.animation ?? 'scale'}
      data-slot="swap-root"
    />
  );
}

function SwapRootProvider(props: SwapRootProviderProps) {
  const [local, others] = splitProps(props, ['animation', 'class']);

  return (
    <SwapPrimitive.RootProvider
      class={cn(
        "group/swap place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]",
        local.class,
      )}
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
      class={cn(
        'items-center justify-center text-inherit group-data-[animation=flip]/swap:[backface-visibility:hidden] group-data-[animation=fade]/swap:data-[state=closed]:animate-moduix-swap-fade-exit group-data-[animation=flip]/swap:data-[state=closed]:animate-moduix-swap-flip-exit group-data-[animation=rotate]/swap:data-[state=closed]:animate-moduix-swap-rotate-exit group-data-[animation=scale]/swap:data-[state=closed]:animate-moduix-swap-scale-exit group-data-[animation=fade]/swap:data-[state=open]:animate-moduix-swap-fade-enter group-data-[animation=flip]/swap:data-[state=open]:animate-moduix-swap-flip-enter group-data-[animation=rotate]/swap:data-[state=open]:animate-moduix-swap-rotate-enter group-data-[animation=scale]/swap:data-[state=open]:animate-moduix-swap-scale-enter motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        local.class,
      )}
      {...others}
      data-slot="swap-indicator"
    />
  );
}

export { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext, type SwapAnimation };