<script lang="ts">
  import { QrCodeFrame, type QrCodeFrameProps } from '@ark-ui/svelte/qr-code';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: QrCodeFrameProps = $props();
</script>

<QrCodeFrame
  {...props}
  bind:ref
  class={cn('aspect-square w-full fill-current', className)}
  data-slot="qr-code-frame"
/>