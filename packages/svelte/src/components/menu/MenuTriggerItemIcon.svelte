<script lang="ts">
  import { clsx } from 'clsx';
  import type { HTMLAttributes } from 'svelte/elements';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './Menu.module.css';

  let { children, class: className, ...props }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span {...props} class={clsx(styles.triggerItemIcon, className)} data-slot="menu-trigger-item-icon">
  {#if children}
    {@render children()}
  {:else}
    <ChevronRightIcon />
  {/if}
</span>