<script lang="ts">
  import { ClipboardRoot, type ClipboardRootProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';
  const rootClass = 'flex w-full flex-col gap-1.5 text-foreground';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: ClipboardRootProps = $props();
</script>

<ClipboardRoot
  {...props}
  bind:ref
  bind:value
  class={cn(rootClass, className)}
  data-slot="clipboard-root"
/>