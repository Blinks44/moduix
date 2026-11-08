<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationSubButtonProps
    extends HTMLProps<'a'>, PolymorphicProps<'a'>, RefAttribute {
    active?: boolean;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let {
    active = false,
    class: className,
    ref = $bindable(null),
    'aria-current': ariaCurrent,
    ...props
  }: SidebarNavigationSubButtonProps = $props();
</script>

<Ark
  as="a"
  {...props}
  bind:ref
  aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
  class={clsx(styles.menuSubButton, className)}
  data-active={active ? '' : undefined}
  data-scope="sidebar"
  data-part="navigation-sub-button"
  data-slot="sidebar-navigation-sub-button"
/>