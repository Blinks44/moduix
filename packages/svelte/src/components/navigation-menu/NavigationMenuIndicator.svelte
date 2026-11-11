<script lang="ts">
  import {
    NavigationMenuIndicator,
    type NavigationMenuIndicatorProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuIndicatorProps = $props();
</script>

<NavigationMenuIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="navigation-menu-indicator"
/>