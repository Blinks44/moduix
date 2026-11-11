<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupHeaderProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarGroupHeaderProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={clsx(styles.groupHeader, className)}
  data-scope="sidebar"
  data-part="group-header"
  data-slot="sidebar-group-header"
/>