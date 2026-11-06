<script lang="ts">
  import { DrawerTitle, type DrawerTitleProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerTitleProps = $props();
</script>

<DrawerTitle {...props} bind:ref class={clsx(styles.title, className)} data-slot="drawer-title" />