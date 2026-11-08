<script lang="ts">
  import { NavigationMenuRoot, type NavigationMenuRootProps } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: NavigationMenuRootProps = $props();
</script>

<NavigationMenuRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-slot="navigation-menu-root"
/>