<script lang="ts">
  import { NavigationMenuList, type NavigationMenuListProps } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuListProps = $props();
</script>

<NavigationMenuList
  {...props}
  bind:ref
  class={clsx(styles.list, className)}
  data-slot="navigation-menu-list"
/>