<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupLabelProps
    extends HTMLProps<'h3'>, PolymorphicProps<'h3'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarGroupLabelProps = $props();
</script>

<Ark
  as="h3"
  {...props}
  bind:ref
  class={clsx(styles.groupLabel, className)}
  data-scope="sidebar"
  data-part="group-label"
  data-slot="sidebar-group-label"
/>