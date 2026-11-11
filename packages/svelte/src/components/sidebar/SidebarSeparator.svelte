<script module lang="ts">
  import type { SeparatorRootProps } from '../separator/Separator.svelte';

  export interface SidebarSeparatorProps extends SeparatorRootProps {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import Separator from '../separator/Separator.svelte';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarSeparatorProps = $props();
</script>

<Separator {...props} bind:ref class={clsx(styles.separator, className)} />