<script lang="ts">
  import { SignaturePadSegment, type SignaturePadSegmentProps } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadSegmentProps = $props();
</script>

<SignaturePadSegment
  {...props}
  bind:ref
  class={cn('fill-current', className)}
  data-slot="signature-pad-segment"
/>