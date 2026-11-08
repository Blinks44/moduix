<script lang="ts">
  import { NavigationMenuItem, type NavigationMenuItemProps } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuItemProps = $props();
</script>

<NavigationMenuItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-slot="navigation-menu-item"
/>