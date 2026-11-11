<script lang="ts">
  import { QrCodeRootProvider, type QrCodeRootProviderProps } from '@ark-ui/svelte/qr-code';
  import { clsx } from 'clsx';
  import styles from './QrCode.module.css';

  let { class: className, ref = $bindable(null), ...props }: QrCodeRootProviderProps = $props();
</script>

<QrCodeRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="qr-code-root-provider"
/>