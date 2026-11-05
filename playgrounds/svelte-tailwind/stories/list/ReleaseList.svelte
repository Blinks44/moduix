<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  let { children, ...props }: HTMLAttributes<HTMLUListElement> = $props();
</script>

<ul {...props}>{@render children?.()}</ul>