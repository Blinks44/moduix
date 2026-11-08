<script lang="ts">
  import {
    NavigationMenuContent,
    type NavigationMenuContentProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { clsx } from 'clsx';
  import styles from './NavigationMenu.module.css';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuContentProps = $props();
</script>

<NavigationMenuContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="navigation-menu-content"
/>