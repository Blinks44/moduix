<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationSubItemProps
    extends HTMLProps<'li'>, PolymorphicProps<'li'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SidebarNavigationSubItemProps = $props();
</script>

<Ark
  as="li"
  {...props}
  bind:ref
  class={clsx(styles.menuSubItem, className)}
  data-scope="sidebar"
  data-part="navigation-sub-item"
  data-slot="sidebar-navigation-sub-item"
/>