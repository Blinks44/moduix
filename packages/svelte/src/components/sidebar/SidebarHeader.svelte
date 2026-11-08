<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarHeaderProps
    extends HTMLProps<'header'>, PolymorphicProps<'header'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarHeaderProps = $props();
</script>

<Ark
  as="header"
  {...props}
  bind:ref
  class={clsx(styles.header, className)}
  data-scope="sidebar"
  data-part="header"
  data-slot="sidebar-header"
/>