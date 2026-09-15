'use client';

import { Swap as SwapPrimitive, useSwap, useSwapContext } from '@ark-ui/react/swap';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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
        className={cn(
          "group/swap inline-grid place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]",
          className,
        )}
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
      className={cn(
        "group/swap inline-grid place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]",
        className,
      )}
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
      className={cn(
        'inline-flex items-center justify-center text-inherit [grid-area:swap] group-data-[animation=flip]/swap:[backface-visibility:hidden] group-data-[animation=fade]/swap:data-[state=closed]:animate-moduix-swap-fade-exit group-data-[animation=flip]/swap:data-[state=closed]:animate-moduix-swap-flip-exit group-data-[animation=rotate]/swap:data-[state=closed]:animate-moduix-swap-rotate-exit group-data-[animation=scale]/swap:data-[state=closed]:animate-moduix-swap-scale-exit group-data-[animation=fade]/swap:data-[state=open]:animate-moduix-swap-fade-enter group-data-[animation=flip]/swap:data-[state=open]:animate-moduix-swap-flip-enter group-data-[animation=rotate]/swap:data-[state=open]:animate-moduix-swap-rotate-enter group-data-[animation=scale]/swap:data-[state=open]:animate-moduix-swap-scale-enter motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )}
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