<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';
  import { GripIcon } from '@/lib/moduix/icons/ui';

  let { children, class: className, ...props }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
  aria-hidden="true"
  {...props}
  class={cn('inline-flex flex-none text-muted-foreground [&>svg]:size-4', className)}
  data-slot="floating-panel-drag-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <GripIcon />
  {/if}
</span>