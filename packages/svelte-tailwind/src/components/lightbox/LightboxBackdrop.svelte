<script lang="ts">
  import { DialogBackdrop, type DialogBackdropProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: DialogBackdropProps = $props();
</script>

<OverlayPortal>
  <DialogBackdrop
    {...props}
    bind:ref
    class={cn(
      'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
      className,
    )}
    data-slot="lightbox-backdrop"
  />
</OverlayPortal>