<script lang="ts">
  import { ClipboardRootProvider, type ClipboardRootProviderProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';
  const rootClass = 'flex w-full flex-col gap-1.5 text-foreground';

  let { class: className, ref = $bindable(null), ...props }: ClipboardRootProviderProps = $props();
</script>

<ClipboardRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="clipboard-root-provider"
/>