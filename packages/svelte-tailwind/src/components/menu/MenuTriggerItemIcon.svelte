<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

  let { children, class: className, ...props }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
  {...props}
  class={cn('inline-flex size-3.5 shrink-0 rtl:-scale-x-100 [&_svg]:size-full', className)}
  data-slot="menu-trigger-item-icon"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRightIcon />
  {/if}
</span>