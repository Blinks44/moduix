<script lang="ts">
  import { MenuContent, type MenuContentProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuContentProps = $props();
</script>

<MenuContent {...props} bind:ref class={clsx(styles.content, className)} data-slot="menu-content" />