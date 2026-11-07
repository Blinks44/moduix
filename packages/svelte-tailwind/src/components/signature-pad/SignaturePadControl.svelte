<script lang="ts">
  import { SignaturePadControl, type SignaturePadControlProps } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadControlProps = $props();
</script>

<SignaturePadControl
  {...props}
  bind:ref
  class={cn(
    'h-40 w-full min-w-0 overflow-hidden rounded-md border border-border bg-background shadow-sm transition-[border-color,box-shadow] duration-normal ease-in-out outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed',
    className,
  )}
  data-slot="signature-pad-control"
/>