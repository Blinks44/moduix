<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type SidebarNavigationButtonSize = 'sm' | 'md' | 'lg';

  export interface SidebarNavigationButtonProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {
    active?: boolean;
    size?: SidebarNavigationButtonSize;
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
    size = 'md',
    type = 'button',
    'aria-current': ariaCurrent,
    ...props
  }: SidebarNavigationButtonProps = $props();
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {type}
  aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
  class={clsx(styles.menuButton, className)}
  data-active={active ? '' : undefined}
  data-size={size}
  data-scope="sidebar"
  data-part="navigation-button"
  data-slot="sidebar-navigation-button"
/>