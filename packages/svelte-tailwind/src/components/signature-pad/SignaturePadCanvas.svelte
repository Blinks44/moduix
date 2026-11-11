<script module lang="ts">
  import type { SignaturePadControlProps } from '@ark-ui/svelte/signature-pad';

  export interface SignaturePadCanvasProps extends Omit<
    SignaturePadControlProps,
    'asChild' | 'children'
  > {}
</script>

<script lang="ts">
  import SignaturePadClearTrigger from './SignaturePadClearTrigger.svelte';
  import SignaturePadControl from './SignaturePadControl.svelte';
  import SignaturePadGuide from './SignaturePadGuide.svelte';
  import SignaturePadSegment from './SignaturePadSegment.svelte';

  let { ref = $bindable(null), ...props }: SignaturePadCanvasProps = $props();
</script>

<SignaturePadControl {...props} bind:ref>
  <SignaturePadSegment />
  <SignaturePadClearTrigger />
  <SignaturePadGuide />
</SignaturePadControl>