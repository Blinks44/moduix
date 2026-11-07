<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';
  let { children, class: className, ...props }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
  aria-hidden="true"
  {...props}
  class={cn('text-muted-foreground select-none', className)}
  data-slot="date-input-separator"
>
  {@render children?.()}
</span>