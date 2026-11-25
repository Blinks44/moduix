<script lang="ts">
  import { MenuIndicator, type MenuIndicatorProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Menu.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: MenuIndicatorProps = $props();
</script>

<MenuIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="menu-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <UiIcon icon="chevron-down" />
  {/if}
</MenuIndicator>