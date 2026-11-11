<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationListProps
    extends HTMLProps<'ul'>, PolymorphicProps<'ul'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarNavigationListProps = $props();
</script>

<Ark
  as="ul"
  {...props}
  bind:ref
  class={clsx(styles.menu, className)}
  data-scope="sidebar"
  data-part="navigation-list"
  data-slot="sidebar-navigation-list"
/>