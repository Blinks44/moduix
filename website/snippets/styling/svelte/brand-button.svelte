<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import type { Snippet } from 'svelte';
  import styles from '@/components/examples/styling/brand-button.module.css';

  let { children }: { children?: Snippet } = $props();
</script>

<Button class={styles.brand}>{@render children?.()}</Button>