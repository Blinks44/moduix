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
  import { clsx } from 'clsx';
  import styles from './ScrollArea.module.css';

  let {
    class: className,
    fade = false,
    ref = $bindable(null),
    variant = 'hover',
    ...props
  }: ScrollAreaRootProps = $props();
</script>

<ScrollAreaRoot
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-fade={fade ? '' : undefined}
  data-variant={variant}
  data-slot="scroll-area-root"
/>