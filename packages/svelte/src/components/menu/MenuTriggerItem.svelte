<script lang="ts">
  import { MenuTriggerItem, type MenuTriggerItemProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuTriggerItemProps = $props();
</script>

<MenuTriggerItem
  {...props}
  bind:ref
  class={clsx(styles.triggerItem, className)}
  data-slot="menu-trigger-item"
/>