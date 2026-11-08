<script module lang="ts">
  import type { ScrollAreaRootProviderProps as ArkScrollAreaRootProviderProps } from '@ark-ui/svelte/scroll-area';
  import type { ScrollAreaVariant } from './ScrollArea.svelte';

  export interface ScrollAreaRootProviderProps extends ArkScrollAreaRootProviderProps {
    fade?: boolean;
    variant?: ScrollAreaVariant;
  }
</script>

<script lang="ts">
  import { ScrollAreaRootProvider } from '@ark-ui/svelte/scroll-area';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    fade = false,
    ref = $bindable(null),
    variant = 'hover',
    ...props
  }: ScrollAreaRootProviderProps = $props();

  const rootClass = 'group/scroll-area h-full min-h-0 w-full min-w-0';
</script>

<ScrollAreaRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-fade={fade ? '' : undefined}
  data-variant={variant}
  data-slot="scroll-area-root-provider"
/>