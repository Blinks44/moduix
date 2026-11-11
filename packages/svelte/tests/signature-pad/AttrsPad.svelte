<script lang="ts">
  import {
    SignaturePad,
    SignaturePadClearTrigger,
    SignaturePadLabel,
  } from '@/components/signature-pad';

  let { label, probe }: { label: string; probe: string } = $props();

  let triggerRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ triggerRef });
</script>

<SignaturePad defaultPaths={['M1,1 L2,2']}>
  <SignaturePadLabel>Signature</SignaturePadLabel>
  <SignaturePadClearTrigger
    bind:ref={triggerRef}
    aria-label={label}
    data-probe={probe}
    class="consumer-trigger"
  >
    {#snippet asChild(props)}
      <button {...props()} type="button">Clear</button>
    {/snippet}
  </SignaturePadClearTrigger>
</SignaturePad>