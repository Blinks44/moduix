<script lang="ts">
  import { DrawerDescription, type DrawerDescriptionProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerDescriptionProps = $props();
</script>

<DrawerDescription
  {...props}
  bind:ref
  class={clsx(styles.description, className)}
  data-slot="drawer-description"
/>