<script module lang="ts">
  import type { MenuItemProps as ArkMenuItemProps } from '@ark-ui/svelte/menu';

  export type MenuItemTone = 'default' | 'destructive';

  export interface MenuItemProps extends ArkMenuItemProps {
    /** Visual intent of the item. */
    tone?: MenuItemTone;
  }
</script>

<script lang="ts">
  import { MenuItem } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    tone = 'default',
    ...props
  }: MenuItemProps = $props();
</script>

<MenuItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-tone={tone}
  data-slot="menu-item"
/>