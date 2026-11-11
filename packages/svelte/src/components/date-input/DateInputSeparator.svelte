<script lang="ts">
  import { clsx } from 'clsx';
  import type { HTMLAttributes } from 'svelte/elements';
  import styles from './DateInput.module.css';
  let { children, class: className, ...props }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
  aria-hidden="true"
  {...props}
  class={clsx(styles.separator, className)}
  data-slot="date-input-separator"
>
  {@render children?.()}
</span>