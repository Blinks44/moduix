<script lang="ts">
  import { QrCodeDownloadTrigger, type QrCodeDownloadTriggerProps } from '@ark-ui/svelte/qr-code';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: QrCodeDownloadTriggerProps = $props();
</script>

<QrCodeDownloadTrigger
  {...props}
  bind:ref
  class={cn(
    'inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium whitespace-nowrap text-foreground transition-[background-color,opacity] duration-normal ease-in-out select-none focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled)]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent',
    className,
  )}
  data-slot="qr-code-download-trigger"
/>