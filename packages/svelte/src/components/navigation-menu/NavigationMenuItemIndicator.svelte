<script lang="ts">
  import {
    NavigationMenuItemIndicator,
    type NavigationMenuItemIndicatorProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuItemIndicatorProps = $props();
</script>

<NavigationMenuItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="navigation-menu-item-indicator"
/>