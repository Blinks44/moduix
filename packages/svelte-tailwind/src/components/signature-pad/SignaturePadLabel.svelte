<script lang="ts">
  import { SignaturePadLabel, type SignaturePadLabelProps } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadLabelProps = $props();
</script>

<SignaturePadLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium select-none', className)}
  data-slot="signature-pad-label"
/>