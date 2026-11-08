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
  import { clsx } from 'clsx';
  import styles from './ScrollArea.module.css';

  let {
    class: className,
    fade = false,
    ref = $bindable(null),
    variant = 'hover',
    ...props
  }: ScrollAreaRootProviderProps = $props();
</script>

<ScrollAreaRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-fade={fade ? '' : undefined}
  data-variant={variant}
  data-slot="scroll-area-root-provider"
/>