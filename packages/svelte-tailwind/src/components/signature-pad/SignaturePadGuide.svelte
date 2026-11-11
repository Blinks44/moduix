<script lang="ts">
  import { SignaturePadGuide, type SignaturePadGuideProps } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadGuideProps = $props();
</script>

<SignaturePadGuide
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none absolute inset-x-6 bottom-8 border-b border-dashed border-border',
    className,
  )}
  data-slot="signature-pad-guide"
/>