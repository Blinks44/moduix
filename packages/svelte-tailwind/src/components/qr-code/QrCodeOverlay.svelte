<script lang="ts">
  import { QrCodeOverlay, type QrCodeOverlayProps } from '@ark-ui/svelte/qr-code';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: QrCodeOverlayProps = $props();
</script>

<QrCodeOverlay
  {...props}
  bind:ref
  class={cn(
    'inline-flex aspect-square w-1/3 items-center justify-center rounded-sm bg-background p-1 text-foreground [grid-area:1/1/2/2] [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:object-contain',
    className,
  )}
  data-slot="qr-code-overlay"
/>