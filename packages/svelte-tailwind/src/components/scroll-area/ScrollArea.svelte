<script module lang="ts">
  import type { ScrollAreaRootProps as ArkScrollAreaRootProps } from '@ark-ui/svelte/scroll-area';

  export type ScrollAreaVariant = 'hover' | 'always';

  export interface ScrollAreaRootProps extends ArkScrollAreaRootProps {
    fade?: boolean;
    variant?: ScrollAreaVariant;
  }
</script>

<script lang="ts">
  import { ScrollAreaRoot } from '@ark-ui/svelte/scroll-area';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    fade = false,
    ref = $bindable(null),
    variant = 'hover',
    ...props
  }: ScrollAreaRootProps = $props();

  const rootClass = 'group/scroll-area h-full min-h-0 w-full min-w-0';
</script>

<ScrollAreaRoot
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-fade={fade ? '' : undefined}
  data-variant={variant}
  data-slot="scroll-area-root"
/>