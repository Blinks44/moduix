<script lang="ts">
  import { MenuItemGroupLabel, type MenuItemGroupLabelProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuItemGroupLabelProps = $props();
</script>

<MenuItemGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.itemGroupLabel, className)}
  data-slot="menu-item-group-label"
/>