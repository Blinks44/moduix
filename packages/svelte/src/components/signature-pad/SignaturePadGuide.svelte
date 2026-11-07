<script lang="ts">
  import { SignaturePadGuide, type SignaturePadGuideProps } from '@ark-ui/svelte/signature-pad';
  import { clsx } from 'clsx';
  import styles from './SignaturePad.module.css';

  let { class: className, ref = $bindable(null), ...props }: SignaturePadGuideProps = $props();
</script>

<SignaturePadGuide
  {...props}
  bind:ref
  class={clsx(styles.guide, className)}
  data-slot="signature-pad-guide"
/>