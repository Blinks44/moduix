<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export interface PinInputSeparatorProps extends HTMLAttributes<HTMLSpanElement> {}
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

  let { children, class: className, ...props }: PinInputSeparatorProps = $props();
</script>

<span
  aria-hidden="true"
  {...props}
  class={cn('inline-flex size-4 flex-none text-muted-foreground [&>svg]:size-full', className)}
  data-slot="pin-input-separator"
>
  {#if children}
    {@render children()}
  {:else}
    <SeparatorMarkIcon />
  {/if}
</span>