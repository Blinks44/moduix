<script lang="ts">
  import { QrCodeRoot, type QrCodeRootProps } from '@ark-ui/svelte/qr-code';
  import { clsx } from 'clsx';
  import styles from './QrCode.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: QrCodeRootProps = $props();
</script>

<QrCodeRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-slot="qr-code-root"
/>