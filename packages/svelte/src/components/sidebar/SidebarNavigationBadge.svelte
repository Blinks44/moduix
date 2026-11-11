<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationBadgeProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarNavigationBadgeProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.menuBadge, className)}
  data-scope="sidebar"
  data-part="navigation-badge"
  data-slot="sidebar-navigation-badge"
/>