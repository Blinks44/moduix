<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';

  const accentItemClass = 'marker:font-semibold marker:text-primary';

  let { children, class: className, ...props }: HTMLLiAttributes = $props();
</script>

<li {...props} class={cn(accentItemClass, className)}>{@render children?.()}</li>