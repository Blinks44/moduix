<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarLabelProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarLabelProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-scope="sidebar"
  data-part="label"
  data-slot="sidebar-label"
/>