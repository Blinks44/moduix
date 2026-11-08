<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarFooterProps
    extends HTMLProps<'footer'>, PolymorphicProps<'footer'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarFooterProps = $props();
</script>

<Ark
  as="footer"
  {...props}
  bind:ref
  class={clsx(styles.footer, className)}
  data-scope="sidebar"
  data-part="footer"
  data-slot="sidebar-footer"
/>