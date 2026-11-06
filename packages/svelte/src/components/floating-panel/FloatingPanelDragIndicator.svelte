<script lang="ts">
  import { clsx } from 'clsx';
  import type { HTMLAttributes } from 'svelte/elements';
  import { GripIcon } from '@/lib/moduix/icons/ui';
  import styles from './FloatingPanel.module.css';

  let { children, class: className, ...props }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
  aria-hidden="true"
  {...props}
  class={clsx(styles.dragIndicator, className)}
  data-slot="floating-panel-drag-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <GripIcon />
  {/if}
</span>