<script lang="ts">
  import {
    NavigationMenuRootProvider,
    type NavigationMenuRootProviderProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuRootProviderProps = $props();
</script>

<NavigationMenuRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="navigation-menu-root-provider"
/>