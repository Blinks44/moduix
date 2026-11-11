<script lang="ts">
  import {
    NavigationMenuTrigger,
    type NavigationMenuTriggerProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuTriggerProps = $props();
</script>

<NavigationMenuTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="navigation-menu-trigger"
/>