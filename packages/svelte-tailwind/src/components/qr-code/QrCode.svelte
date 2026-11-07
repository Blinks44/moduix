<script lang="ts">
  import { QrCodeRoot, type QrCodeRootProps } from '@ark-ui/svelte/qr-code';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: QrCodeRootProps = $props();
</script>

<QrCodeRoot
  {...props}
  bind:ref
  bind:value
  class={cn('inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3', className)}
  data-slot="qr-code-root"
/>