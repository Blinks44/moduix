<script module lang="ts">
  import type { DrawerContentProps as ArkDrawerContentProps } from '@ark-ui/svelte/drawer';

  export type DrawerVariant = 'island';
  export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';

  export interface DrawerContentProps extends ArkDrawerContentProps {
    /** Width preset for `start` and `end` drawers: 18rem, 22rem, 28rem, or 36rem. */
    size?: DrawerSize;
    /** `island` insets the surface from the viewport edges and rounds every corner. */
    variant?: DrawerVariant;
  }
</script>

<script lang="ts">
  import { DrawerContent } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    variant,
    ...props
  }: DrawerContentProps = $props();
</script>

<DrawerContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-size={size}
  data-variant={variant}
  data-slot="drawer-content"
/>