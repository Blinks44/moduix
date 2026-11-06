<script lang="ts">
  import { MenuArrowTip, type MenuArrowTipProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuArrowTipProps = $props();
</script>

<MenuArrowTip
  {...props}
  bind:ref
  class={clsx(styles.arrowTip, className)}
  data-slot="menu-arrow-tip"
/>