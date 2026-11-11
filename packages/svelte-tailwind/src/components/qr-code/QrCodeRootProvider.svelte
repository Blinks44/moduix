<script lang="ts">
  import { QrCodeRootProvider, type QrCodeRootProviderProps } from '@ark-ui/svelte/qr-code';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: QrCodeRootProviderProps = $props();
</script>

<QrCodeRootProvider
  {...props}
  bind:ref
  class={cn('inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3', className)}
  data-slot="qr-code-root-provider"
/>