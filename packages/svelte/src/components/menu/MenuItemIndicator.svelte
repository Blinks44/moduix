<script lang="ts">
  import { MenuItemIndicator, type MenuItemIndicatorProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Menu.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: MenuItemIndicatorProps = $props();
</script>

<MenuItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="menu-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</MenuItemIndicator>