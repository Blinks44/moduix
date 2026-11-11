<script module lang="ts">
  import type { SwapRootProps as ArkSwapRootProps } from '@ark-ui/svelte/swap';

  export type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

  export interface SwapRootProps extends ArkSwapRootProps {
    animation?: SwapAnimation;
  }
</script>

<script lang="ts">
  import { SwapRoot } from '@ark-ui/svelte/swap';
  import { cn } from '@/lib/moduix/cn';

  let {
    animation = 'scale',
    class: className,
    ref = $bindable(null),
    ...props
  }: SwapRootProps = $props();

  const rootClass =
    'group/swap place-items-center align-middle data-[animation=flip]:[perspective:24rem]';
</script>

<SwapRoot
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-animation={animation}
  data-slot="swap-root"
/>