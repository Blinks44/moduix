<script lang="ts">
  import { MenuSeparator, type MenuSeparatorProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuSeparatorProps = $props();
</script>

<MenuSeparator
  {...props}
  bind:ref
  class={clsx(styles.separator, className)}
  data-slot="menu-separator"
/>