<script module lang="ts">
  import type { HighlightProps } from '@ark-ui/svelte/highlight';

  export type HighlightRootProps = HighlightProps;
</script>

<script lang="ts">
  import { Highlight as ArkHighlight } from '@ark-ui/svelte/highlight';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ...props }: HighlightRootProps = $props();
</script>

<ArkHighlight
  {...props}
  class={cn(
    'rounded-xs bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))] box-decoration-clone px-1 py-px font-medium text-foreground',
    className,
  )}
  data-scope="highlight"
  data-part="root"
  data-slot="highlight-root"
/>