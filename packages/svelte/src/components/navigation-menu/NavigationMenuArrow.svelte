<script lang="ts">
  import {
    NavigationMenuArrow,
    type NavigationMenuArrowProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuArrowProps = $props();
</script>

<NavigationMenuArrow
  {...props}
  bind:ref
  class={clsx(styles.arrow, className)}
  data-slot="navigation-menu-arrow"
/>