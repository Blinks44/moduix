<script lang="ts">
  import { MenuItemGroup, type MenuItemGroupProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuItemGroupProps = $props();
</script>

<MenuItemGroup
  {...props}
  bind:ref
  class={clsx(styles.itemGroup, className)}
  data-slot="menu-item-group"
/>