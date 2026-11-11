<script lang="ts">
  import { SignaturePadLabel, type SignaturePadLabelProps } from '@ark-ui/svelte/signature-pad';
  import { clsx } from 'clsx';
  import styles from './SignaturePad.module.css';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadLabelProps = $props();
</script>

<SignaturePadLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="signature-pad-label"
/>