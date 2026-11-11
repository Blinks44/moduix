<script lang="ts">
  import { DialogContent, type DialogContentProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DialogContentProps = $props();
</script>

<DialogContent
  {...props}
  bind:ref
  class={cn(
    'group/lightbox relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] grid max-h-[min(80dvh,calc(100dvh-2rem))] w-fit max-w-[min(80vw,calc(100vw-2rem))] gap-3 outline-0 data-[state=closed]:animate-moduix-lightbox-content-out data-[state=open]:animate-moduix-lightbox-content-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="lightbox-content"
/>