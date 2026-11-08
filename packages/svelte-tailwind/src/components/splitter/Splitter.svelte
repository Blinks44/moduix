<script lang="ts">
  import { SplitterRoot, type SplitterRootProps } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = $bindable(),
    style,
    ...props
  }: SplitterRootProps = $props();

  const rootClass =
    'h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm';

  // Ark sets inline width and height of 100%; clear them so consumer sizes and classes apply.
  const rootStyle = $derived(['width:', 'height:', style].filter(Boolean).join(';'));
</script>

<SplitterRoot
  {...props}
  bind:ref
  bind:size
  class={cn(rootClass, className)}
  style={rootStyle}
  data-slot="splitter-root"
/>