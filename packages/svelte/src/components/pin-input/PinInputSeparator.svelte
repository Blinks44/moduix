<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export interface PinInputSeparatorProps extends HTMLAttributes<HTMLSpanElement> {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
  import styles from './PinInput.module.css';

  let { children, class: className, ...props }: PinInputSeparatorProps = $props();
</script>

<span
  aria-hidden="true"
  {...props}
  class={clsx(styles.separator, className)}
  data-slot="pin-input-separator"
>
  {#if children}
    {@render children()}
  {:else}
    <SeparatorMarkIcon />
  {/if}
</span>