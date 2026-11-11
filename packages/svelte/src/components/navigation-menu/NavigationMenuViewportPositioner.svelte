<script lang="ts">
  import {
    NavigationMenuViewportPositioner,
    type NavigationMenuViewportPositionerProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuViewportPositionerProps = $props();
</script>

<NavigationMenuViewportPositioner
  {...props}
  bind:ref
  class={clsx(styles.viewportPositioner, className)}
  data-slot="navigation-menu-viewport-positioner"
/>