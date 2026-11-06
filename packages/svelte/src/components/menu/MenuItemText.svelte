<script lang="ts">
  import { MenuItemText, type MenuItemTextProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuItemTextProps = $props();
</script>

<MenuItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="menu-item-text"
/>