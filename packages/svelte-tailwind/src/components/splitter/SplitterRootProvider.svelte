<script lang="ts">
  import { SplitterRootProvider, type SplitterRootProviderProps } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    style,
    ...props
  }: SplitterRootProviderProps = $props();

  const rootClass =
    'h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm';

  // Ark sets inline width and height of 100%; clear them so consumer sizes and classes apply.
  const rootStyle = $derived(['width:', 'height:', style].filter(Boolean).join(';'));
</script>

<SplitterRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  style={rootStyle}
  data-slot="splitter-root-provider"
/>