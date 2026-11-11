<script module lang="ts">
  import type { SwapRootProviderProps as ArkSwapRootProviderProps } from '@ark-ui/svelte/swap';
  import type { SwapAnimation } from './Swap.svelte';

  export interface SwapRootProviderProps extends ArkSwapRootProviderProps {
    animation?: SwapAnimation;
  }
</script>

<script lang="ts">
  import { SwapRootProvider } from '@ark-ui/svelte/swap';
  import { cn } from '@/lib/moduix/cn';

  let {
    animation = 'scale',
    class: className,
    ref = $bindable(null),
    ...props
  }: SwapRootProviderProps = $props();

  const rootClass =
    'group/swap place-items-center align-middle data-[animation=flip]:[perspective:24rem]';
</script>

<SwapRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-animation={animation}
  data-slot="swap-root-provider"
/>