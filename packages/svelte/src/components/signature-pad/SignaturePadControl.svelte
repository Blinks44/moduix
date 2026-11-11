<script lang="ts">
  import { SignaturePadControl, type SignaturePadControlProps } from '@ark-ui/svelte/signature-pad';
  import { clsx } from 'clsx';
  import styles from './SignaturePad.module.css';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadControlProps = $props();
</script>

<SignaturePadControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="signature-pad-control"
/>