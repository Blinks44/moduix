<script lang="ts">
  import { DrawerIndent, type DrawerIndentProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerIndentProps = $props();
</script>

<DrawerIndent
  {...props}
  bind:ref
  class={clsx(styles.indent, className)}
  data-slot="drawer-indent"
/>