<script lang="ts">
  import { QrCodePattern, type QrCodePatternProps } from '@ark-ui/svelte/qr-code';

  let { ref = $bindable(null), ...props }: QrCodePatternProps = $props();
</script>

<QrCodePattern {...props} bind:ref data-slot="qr-code-pattern" />