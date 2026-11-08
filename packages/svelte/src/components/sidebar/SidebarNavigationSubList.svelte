<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationSubListProps
    extends HTMLProps<'ul'>, PolymorphicProps<'ul'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SidebarNavigationSubListProps = $props();
</script>

<Ark
  as="ul"
  {...props}
  bind:ref
  class={clsx(styles.menuSub, className)}
  data-scope="sidebar"
  data-part="navigation-sub-list"
  data-slot="sidebar-navigation-sub-list"
/>