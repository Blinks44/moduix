<script lang="ts">
  import { SignaturePadSegment, type SignaturePadSegmentProps } from '@ark-ui/svelte/signature-pad';
  import { clsx } from 'clsx';
  import styles from './SignaturePad.module.css';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadSegmentProps = $props();
</script>

<SignaturePadSegment
  {...props}
  bind:ref
  class={clsx(styles.segment, className)}
  data-slot="signature-pad-segment"
/>