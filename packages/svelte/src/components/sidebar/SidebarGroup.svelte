<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupProps
    extends HTMLProps<'section'>, PolymorphicProps<'section'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarGroupProps = $props();
</script>

<Ark
  as="section"
  {...props}
  bind:ref
  class={clsx(styles.group, className)}
  data-scope="sidebar"
  data-part="group"
  data-slot="sidebar-group"
/>