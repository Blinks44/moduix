<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';
  import styles from './List.stories.module.css';

  let { children, class: className, ...props }: HTMLLiAttributes = $props();
</script>

<li {...props} class={[styles.accentItem, className]}>{@render children?.()}</li>