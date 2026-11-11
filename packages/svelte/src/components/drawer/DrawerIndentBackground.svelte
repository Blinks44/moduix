<script lang="ts">
  import { DrawerIndentBackground, type DrawerIndentBackgroundProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerIndentBackgroundProps = $props();
</script>

<DrawerIndentBackground
  {...props}
  bind:ref
  class={clsx(styles.indentBackground, className)}
  data-slot="drawer-indent-background"
/>